import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';
import { sign } from 'hono/jwt';
import { z } from 'zod';

import { db } from '../../../db/database.js';
import { treeAdopterSchema } from '../../../db/schema/schema.js';
import env from '../../../lib/env.js';
import { logger } from '../../../lib/logger.js';
import authMiddleware from '../../../middleware/jwt.js';

// JWT secret key
const JWT_SECRET = env.JWT_SECRET;
const RECAPTCHA_SECRET_KEY = env.RECAPTCHA_SECRET_KEY;

const userSchemaZod = z.object({
  id: z.number().int().positive(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  name: z.string().min(3),
  email: z.string().email().min(3),
  password: z.string().min(6),
});

const loginSchema = userSchemaZod.omit({ name: true, id: true, phone: true, avatar: true });
const loginWithRecaptchaSchema = loginSchema.extend({
  recaptchaToken: z.string().min(1, 'Recaptcha token is required'),
});
const registerSchema = userSchemaZod.omit({ id: true, phone: true, avatar: true }).extend({
  recaptchaToken: z.string().min(1, 'Recaptcha token is required'),
});

export type User = z.infer<typeof userSchemaZod>;

export const authRoute = new Hono()
  .post('login', zValidator('json', loginWithRecaptchaSchema), async (c) => {
    const { email, password, recaptchaToken } = c.req.valid('json');

    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    });

    const verifyResult = await verify.json();

    if (!verifyResult.success) {
      logger.error('Recaptcha verification failed:', verifyResult);
      return c.json(
        {
          message: 'Recaptcha verification failed.',
          status: verifyResult,
        },
        400
      );
    }

    try {
      // Find user by email
      const user = await db
        .select()
        .from(treeAdopterSchema)
        .where(eq(treeAdopterSchema.email, email));

      if (user.length === 0) {
        return c.json({ message: 'Invalid email or password.' }, 401);
      }

      // Verify password
      const hashedPassword = await bcrypt.hash(password, env.HASH_SALT ?? 'salt');
      if (hashedPassword !== user[0].password) {
        return c.json({ message: 'Invalid email or password.' }, 401);
      }

      // Calculate token expiration (e.g., 24 hours from now)
      const tokenExpiredAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours in seconds

      // Generate JWT with expiration
      const token = await sign(
        {
          userId: user[0].id,
          email: user[0].email,
          exp: tokenExpiredAt, // Add expiration to JWT payload
        },
        JWT_SECRET
      );

      const userData = await db
        .select()
        .from(treeAdopterSchema)
        .where(eq(treeAdopterSchema.id, user[0].id));

      // Format tokenExpiredAt as 'YYYY-MM-DD HH:mm:ss'
      const tokenExpiredAtFormatted = new Date(tokenExpiredAt * 1000).toISOString();

      return c.json({
        data: {
          token,
          tokenExpiredAt: tokenExpiredAtFormatted,
          user: userData[0],
        },
      });
    } catch (error) {
      logger.error('Error during sign-in:', error);
      return c.json({ message: 'Internal server error.' }, 500);
    }
  })
  .post('register', zValidator('json', registerSchema), async (c) => {
    const { email, name, password, recaptchaToken } = c.req.valid('json');

    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    });

    const verifyResult = await verify.json();

    if (!verifyResult.success) {
      logger.error('Recaptcha verification failed:', verifyResult);
      return c.json(
        {
          message: 'Recaptcha verification failed.',
          status: verifyResult,
        },
        400
      );
    }

    try {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(treeAdopterSchema)
        .where(eq(treeAdopterSchema.email, email));

      if (existingUser.length > 0) {
        return c.json({ message: 'User already exists.' }, 400);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, env.HASH_SALT ?? 'salt');

      // Insert new user
      await db.insert(treeAdopterSchema).values({
        name,
        email,
        password: hashedPassword,
      });

      return c.json({ message: 'User created successfully.' }, 201);
    } catch (error) {
      logger.error('Error during sign-up:', error);
      return c.json({ message: 'Internal server error.' }, 500);
    }
  })
  .get('/profile', authMiddleware, async (c) => {
    const payload = c.get('jwtPayload');
    try {
      const user = await db
        .select()
        .from(treeAdopterSchema)
        .where(eq(treeAdopterSchema.id, payload.userId));

      if (user.length === 0) {
        return c.json({ message: 'User not found.' }, 404);
      }

      return c.json({ data: user[0] });
    } catch (error) {
      logger.error('Error fetching profile:', error);
      return c.json({ message: 'Internal server error.' }, 500);
    }
  })
  .post('/logout', authMiddleware, async (c) => {
    deleteCookie(c, 'auth_token');
    return c.json({ message: 'Logout successful.' });
  });

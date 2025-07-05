import { zValidator } from '@hono/zod-validator';
import { and, eq, inArray } from 'drizzle-orm';
import { createFactory } from 'hono/factory';
import { z } from 'zod';

import { db } from '../../db/database.js';
import { treeAdopterSchema, treeSchema, wishtreeSchema } from '../../db/schema/schema.js';
import { getPaginationData } from '../../lib/pagination.js';
import type { RelationsType } from '../../lib/relation.js';

const factory = createFactory();

// === ZOD SCHEMAS ===
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wishtreeSchemaZod = z.object({
  id: z.number().int().positive(),
  adopterId: z.number().int().positive(),
  treeId: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional(),
});

const addWishtreeSchema = z.object({
  treeId: z.number().int().positive(),
});

const deleteWishtreeSchema = z.object({
  treeIds: z.array(z.number().int().positive()),
});

export type Wishtree = z.infer<typeof wishtreeSchemaZod>;

// === RELATIONS ===
const relations: RelationsType = {
  adopterId: {
    type: 'one-to-one',
    table: treeAdopterSchema,
    on: 'id',
  },
  treeId: {
    type: 'one-to-one',
    table: treeSchema,
    on: 'id',
  },
};

const getWishtreeUsers = factory.createHandlers(async (c) => {
  const payload = c.get('jwtPayload');
  const userId = payload?.userId;
  if (!userId) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  const adopter = await db.select().from(treeAdopterSchema).where(eq(treeAdopterSchema.id, userId));

  if (adopter.length === 0) {
    return c.json({ message: 'Adopter not found' }, 404);
  }

  return await getPaginationData<Wishtree>({
    c,
    table: wishtreeSchema,
    searchBy: 'id',
    relations,
    filter: `adopterId:${adopter[0].id}`,
  });
});

const addToWishtreeMiddleware = zValidator('json', addWishtreeSchema);

const addToWishtree = async (treeId: number, adopterId?: number) => {
  if (!adopterId) {
    return { success: false, message: 'Unauthorized' };
  }
  const existingWishtree = await db
    .select()
    .from(wishtreeSchema)
    .where(and(eq(wishtreeSchema.adopterId, adopterId), eq(wishtreeSchema.treeId, treeId)));

  if (existingWishtree.length > 0) {
    return { success: false, message: 'Tree already in wish list' };
  }

  await db.insert(wishtreeSchema).values({
    adopterId,
    treeId,
  });

  return {
    success: true,
    message: 'Tree added to wish list',
  };
};

const deleteWishtreeMiddleware = zValidator('json', deleteWishtreeSchema);

const deleteWishtree = async (treeIds: number[], adopterId?: number) => {
  if (!adopterId) {
    return { message: 'Unauthorized' };
  }
  const existingWishtree = await db
    .select()
    .from(wishtreeSchema)
    .where(and(eq(wishtreeSchema.adopterId, adopterId), inArray(wishtreeSchema.treeId, treeIds)));

  if (existingWishtree.length === 0) {
    return { message: 'Tree not found in wish list' };
  }

  await db
    .delete(wishtreeSchema)
    .where(and(eq(wishtreeSchema.adopterId, adopterId), inArray(wishtreeSchema.treeId, treeIds)));

  return { message: 'Tree removed from wish list' };
};

export const wishtreeHandler = {
  getWishtreeUsers,
  addToWishtreeMiddleware,
  addToWishtree,
  deleteWishtreeMiddleware,
  deleteWishtree,
};

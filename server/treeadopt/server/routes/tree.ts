import { Hono } from 'hono';
import { z } from 'zod';

import { treeHandler } from '../../../app/handlers/treeHandler.js';
import { db } from '../../../db/database.js';
import { adoptHistorySchema, treeSchema } from '../../../db/schema/schema.js';
import authMiddleware from '../../../middleware/jwt.js';

const handler = treeHandler;

// === ROUTES ===
export const treeRoute = new Hono()
  .use(authMiddleware)

  .get('/', ...handler.getTrees)

  .post('/', handler.createTreeMiddleware, async (c) => {
    const tree = c.req.valid('json');
    await db.insert(treeSchema).values(tree);
    return c.json({ message: 'Tree created' }, 201);
  })

  .get('/:id{[0-9]+}', ...handler.getTreeById)
  // adopt tree
  .post('/:id{[0-9]+}/adopt', handler.adoptTreeMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const adoptDataReq = c.req.valid('json');

    const adoptData: z.infer<typeof handler.adoptTreeJsonSchema> & {
      treeId: number;
    } = {
      ...adoptDataReq,
      treeId: id,
    };

    try {
      await db.insert(adoptHistorySchema).values(adoptData);
      return c.json({ message: 'Tree adopted' });
    } catch (error) {
      console.error('Error adopting tree:', error);
      return c.json({ error: 'Failed to adopt tree' }, 500);
    }
  });

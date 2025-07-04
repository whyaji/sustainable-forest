import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { createFactory } from 'hono/factory';
import { z } from 'zod';

import { db } from '../../db/database.js';
import { adoptHistorySchema } from '../../db/schema/schema.js';
import { getDataBy } from '../../lib/dataBy.js';
import { getPaginationData } from '../../lib/pagination.js';
import type { RelationsType } from '../../lib/relation.js';

const factory = createFactory();

// === ZOD SCHEMAS ===
const adoptHistorySchemaZod = z.object({
  id: z.number().int().positive(),
  treeId: z.number().int().positive(),
  adopterId: z.number().int().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

const createAdoptHistorySchema = adoptHistorySchemaZod.omit({ id: true });
export type AdoptHistory = z.infer<typeof adoptHistorySchemaZod>;

// === RELATIONS ===
const relations: RelationsType = {
  treeId: {
    type: 'one-to-one',
    table: adoptHistorySchema,
    on: 'id',
  },
  adopterId: {
    type: 'one-to-one',
    table: adoptHistorySchema,
    on: 'id',
  },
};

// === FACTORY ===
const getAdoptHistory = factory.createHandlers(async (c) => {
  return await getPaginationData({
    c,
    table: adoptHistorySchema,
    searchBy: 'treeId',
    relations,
  });
});

const createAdoptHistoryMiddleware = zValidator('json', createAdoptHistorySchema);

const createAdoptHistory = async (adoptHistory: z.infer<typeof createAdoptHistorySchema>) => {
  await db.insert(adoptHistorySchema).values(adoptHistory);
};

const getAdoptHistoryById = factory.createHandlers(async (c) => {
  return await getDataBy({ c, table: adoptHistorySchema, relations });
});

const updateAdoptHistoryMiddleware = zValidator('json', adoptHistorySchemaZod);

const updateAdoptHistory = async (
  id: number,
  adoptHistory: z.infer<typeof adoptHistorySchemaZod>
) => {
  const updated = await db
    .update(adoptHistorySchema)
    .set(adoptHistory)
    .where(eq(adoptHistorySchema.id, id));
  if (!updated) {
    throw new Error('Not Found');
  }
};

const deleteAdoptHistory = factory.createHandlers(async (c) => {
  const idString = c.req.param('id');
  if (!idString || isNaN(parseInt(idString))) {
    return c.json({ error: 'Invalid ID' }, 400);
  }
  const id = parseInt(idString);
  const deleted = await db.delete(adoptHistorySchema).where(eq(adoptHistorySchema.id, id));
  if (!deleted) {
    return c.notFound();
  }
  return c.json({ message: 'Tree deleted' });
});

export const adoptHistoryHandler = {
  getAdoptHistory,
  createAdoptHistoryMiddleware,
  createAdoptHistory,
  getAdoptHistoryById,
  updateAdoptHistoryMiddleware,
  updateAdoptHistory,
  deleteAdoptHistory,
};

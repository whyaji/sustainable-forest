import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { createFactory } from 'hono/factory';
import { z } from 'zod';

import { db } from '../../db/database.js';
import { masterLocalTreeSchema, masterTreeSchema } from '../../db/schema/schema.js';
import { getDataBy } from '../../lib/dataBy.js';
import { getPaginationData, getPaginationDataObject } from '../../lib/pagination.js';
import type { RelationsType } from '../../lib/relation.js';

const factory = createFactory();

// === ZOD SCHEMAS ===
const masterTreeSchemaZod = z.object({
  id: z.number().int().positive(),
  latinName: z.string().min(1),
});

const masterLocalTreeSchemaZod = z.object({
  id: z.number().int().positive(),
  masterTreeId: z.number().int().positive(),
  localName: z.string().min(1),
});

const createMasterTreeSchema = masterTreeSchemaZod.omit({ id: true });
const createMasterLocalTreeSchema = masterLocalTreeSchemaZod.omit({ id: true });
const updateMasterTreeLocalSchema = z.array(
  z.object({
    id: z.number().int().positive().optional(),
    localName: z.string().min(1),
    status: z.enum(['create', 'update', 'delete']),
  })
);
export type MasterTree = z.infer<typeof masterTreeSchemaZod>;
export type MasterLocalTree = z.infer<typeof masterLocalTreeSchemaZod>;

// === RELATIONS ===
const relations: RelationsType = {
  masterLocalTree: {
    type: 'one-to-many',
    table: masterLocalTreeSchema,
    on: 'masterTreeId',
  },
};

const relationsLocal: RelationsType = {
  masterTreeId: {
    type: 'one-to-one',
    table: masterTreeSchema,
    on: 'id',
  },
};

// === FACTORY ===
const getMasterTree = factory.createHandlers(async (c) => {
  const sortBy = c.req.query('sortBy') ?? 'createdAt';
  const order = c.req.query('order') ?? 'desc';

  if (!(sortBy in masterLocalTreeSchema)) {
    return c.json({ error: 'Invalid sortBy column' }, 400);
  }

  if (order !== 'asc' && order !== 'desc') {
    return c.json({ error: 'Invalid order' }, 400);
  }

  const returnData = await getPaginationDataObject<
    MasterLocalTree & { masterTree?: MasterTree | null }
  >({
    c,
    table: masterLocalTreeSchema,
    searchBy: 'latinName',
    relations: relationsLocal,
    withData: 'masterTreeId',
  });

  const data = returnData.data.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { masterTree, ...rest } = item;
    return {
      ...rest,
      latinName: item.masterTree?.latinName ?? '',
    };
  });

  const returnDataWithLatinName = {
    ...returnData,
    data,
  };

  return c.json(returnDataWithLatinName);
});

const getMasterTreeActual = factory.createHandlers(async (c) => {
  return await getPaginationData({
    c,
    table: masterTreeSchema,
    searchBy: 'latinName',
    relations,
  });
});

const getMasterTreeById = factory.createHandlers(async (c) => {
  return await getDataBy({ c, table: masterTreeSchema, relations });
});

const createMasterTreeMiddleware = zValidator('json', createMasterTreeSchema);

const updateMasterTreeMiddleware = zValidator('json', masterTreeSchemaZod);

const deleteMasterTree = factory.createHandlers(async (c) => {
  const idString = c.req.param('id');
  if (!idString || isNaN(parseInt(idString))) {
    return c.json({ error: 'Invalid ID' }, 400);
  }
  const id = parseInt(idString);
  const deleted = await db.delete(masterTreeSchema).where(eq(masterTreeSchema.id, id));
  if (!deleted) {
    return c.notFound();
  }
  return c.json({ message: 'Tree deleted' });
});

const updateMasterTreeLocalMiddleware = zValidator('json', updateMasterTreeLocalSchema);

const getMasterLocalTree = factory.createHandlers(async (c) => {
  return await getPaginationData({
    c,
    table: masterLocalTreeSchema,
    searchBy: 'localName',
    relations: relationsLocal,
  });
});

const createMasterLocalTreeMiddleware = zValidator('json', createMasterLocalTreeSchema);

const getMasterLocalTreeById = factory.createHandlers(async (c) => {
  return await getDataBy({
    c,
    table: masterLocalTreeSchema,
    relations: relationsLocal,
  });
});

const updateMasterLocalTreeMiddleware = zValidator('json', masterLocalTreeSchemaZod);

const deleteMasterLocalTree = factory.createHandlers(async (c) => {
  const idString = c.req.param('id');
  if (!idString || isNaN(parseInt(idString))) {
    return c.json({ error: 'Invalid ID' }, 400);
  }
  const id = parseInt(idString);
  const deleted = await db.delete(masterLocalTreeSchema).where(eq(masterLocalTreeSchema.id, id));
  if (!deleted) {
    return c.notFound();
  }
  return c.json({ message: 'Local tree deleted' });
});

export const masterTreeHandler = {
  getMasterTree,
  getMasterTreeActual,
  getMasterTreeById,
  createMasterTreeMiddleware,
  updateMasterTreeMiddleware,
  deleteMasterTree,
  updateMasterTreeLocalMiddleware,
  getMasterLocalTree,
  createMasterLocalTreeMiddleware,
  getMasterLocalTreeById,
  updateMasterLocalTreeMiddleware,
  deleteMasterLocalTree,
};

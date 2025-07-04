import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';
import { z } from 'zod';

import { db } from '../../db/database.js';
import {
  adoptHistorySchema,
  kelompokKomunitasSchema,
  masterLocalTreeSchema,
  masterTreeSchema,
  surveyHistorySchema,
  treeAdopterSchema,
  treeSchema,
  userSchema,
} from '../../db/schema/schema.js';
import { getDataBy } from '../../lib/dataBy.js';
import { getPaginationData } from '../../lib/pagination.js';
import type { RelationsType } from '../../lib/relation.js';

const factory = createFactory();

// === ZOD SCHEMAS ===
const treeSchemaZod = z.object({
  id: z.number().int().positive(),
  code: z.string().min(1),
  masterTreeId: z.number().int().positive().optional(),
  localTreeName: z.string().min(1),
  kelompokKomunitasId: z.number().int().positive(),
  surveyorId: z.number().int().positive(),
  status: z.number().int().default(1), // 0 = inactive, 1 = active
  elevation: z.number(),
  landCover: z.number().int(),
  latitude: z.number(),
  longitude: z.number(),
});

const createTreeSchema = treeSchemaZod.omit({
  id: true,
  masterTreeId: true,
  status: true,
});

export type Tree = z.infer<typeof treeSchemaZod>;

const adoptTreeJsonSchema = z.object({
  adopterId: z.number().int().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

// === RELATIONS ===
const relations: RelationsType = {
  surveyorId: {
    type: 'one-to-one',
    table: userSchema,
    on: 'id',
  },
  kelompokKomunitasId: {
    type: 'one-to-one',
    table: kelompokKomunitasSchema,
    on: 'id',
  },
  masterTreeId: {
    type: 'one-to-one',
    table: masterTreeSchema,
    on: 'id',
  },
  masterLocalTree: {
    type: 'one-to-many',
    table: masterLocalTreeSchema,
    on: 'masterTreeId',
    from: 'masterTreeId',
  },
  surveyHistory: {
    type: 'one-to-many',
    table: surveyHistorySchema,
    on: 'treeId',
    child: {
      'surveyHistory.userId': {
        type: 'one-to-one',
        table: userSchema,
        on: 'id',
        from: 'userId',
        alias: 'user',
      },
    },
  },
  survey: {
    type: 'latest-inserted',
    table: surveyHistorySchema,
    on: 'treeId',
    child: {
      'survey.userId': {
        type: 'one-to-one',
        table: userSchema,
        on: 'id',
        from: 'userId',
        alias: 'user',
      },
    },
  },
  adoptHistory: {
    type: 'one-to-many',
    table: adoptHistorySchema,
    on: 'treeId',
    child: {
      'adoptHistory.adopterId': {
        type: 'one-to-one',
        table: treeAdopterSchema,
        on: 'id',
        from: 'adopterId',
        alias: 'user',
      },
    },
  },
  adopter: {
    type: 'latest-inserted',
    table: adoptHistorySchema,
    on: 'treeId',
    child: {
      'adopter.adopterId': {
        type: 'one-to-one',
        table: treeAdopterSchema,
        on: 'id',
        from: 'adopterId',
        alias: 'user',
      },
    },
  },
};

const getTrees = factory.createHandlers(async (c) => {
  return await getPaginationData({
    c,
    table: treeSchema,
    searchBy: 'code,kelompokKomunitasId,localTreeName',
    relations,
  });
});

const createTreeMiddleware = zValidator('json', createTreeSchema);

const createTree = async (tree: Tree) => {
  await db.insert(treeSchema).values(tree);
};

const getTreeById = factory.createHandlers(async (c) => {
  return await getDataBy({ c, table: treeSchema, relations });
});

const updateTreeMiddleware = zValidator('json', treeSchemaZod);

const updateLocalNameMiddleware = zValidator(
  'json',
  z.object({
    localTreeName: z.string().min(1),
  })
);

const adoptTreeMiddleware = zValidator('json', adoptTreeJsonSchema);

export const treeHandler = {
  getTrees,
  createTree,
  createTreeMiddleware,
  getTreeById,
  updateTreeMiddleware,
  updateLocalNameMiddleware,
  adoptTreeMiddleware,
  adoptTreeJsonSchema,
};

import { and, eq, inArray, isNull } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { treeHandler } from '../app/handlers/treeHandler.js';
import { db } from '../db/database.js';
import { adoptHistorySchema, masterLocalTreeSchema, treeSchema } from '../db/schema/schema.js';
import { fixCaseLocalTreeName } from '../lib/utils.js';
import authMiddleware from '../middleware/jwt.js';

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

  .put('/:id{[0-9]+}', handler.updateTreeMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const tree = c.req.valid('json');
    const updated = await db.update(treeSchema).set(tree).where(eq(treeSchema.id, id));
    if (!updated) {
      return c.notFound();
    }
    return c.json({ message: 'Tree updated' });
  })

  .put('/:id{[0-9]+}/update-local-name', handler.updateLocalNameMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const { localTreeName } = c.req.valid('json');

    const updated = await db.update(treeSchema).set({ localTreeName }).where(eq(treeSchema.id, id));

    if (!updated) {
      return c.notFound();
    }
    return c.json({ message: 'Local name updated' });
  })

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
  })

  .delete('/:id{[0-9]+}', async (c) => {
    const id = parseInt(c.req.param('id'));
    const deleted = await db.delete(treeSchema).where(eq(treeSchema.id, id));
    if (!deleted) {
      return c.notFound();
    }
    return c.json({ message: 'Tree deleted' });
  })

  .put('/mass-assign-master-tree', async (c) => {
    // check params for kelompokKomunitasId
    const { kelompokKomunitasId } = c.req.query();

    const whereClause = isNull(treeSchema.masterTreeId);
    const treeQuery = db
      .select({
        id: treeSchema.id,
        code: treeSchema.code,
        localTreeName: treeSchema.localTreeName,
        kelompokKomunitasId: treeSchema.kelompokKomunitasId,
        masterTreeId: treeSchema.masterTreeId,
      })
      .from(treeSchema)
      .where(
        kelompokKomunitasId
          ? and(whereClause, eq(treeSchema.kelompokKomunitasId, Number(kelompokKomunitasId)))
          : whereClause
      );

    const trees = await treeQuery;

    const treeLocalNameList = trees.map((tree) => tree.localTreeName);

    const masterTreesSelected = await db
      .select({
        id: masterLocalTreeSchema.id,
        masterTreeId: masterLocalTreeSchema.masterTreeId,
        localName: masterLocalTreeSchema.localName,
      })
      .from(masterLocalTreeSchema)
      .where(inArray(masterLocalTreeSchema.localName, treeLocalNameList));

    if (masterTreesSelected.length === 0) {
      return c.json({
        message: 'No master trees found for the given local tree names',
        data: [],
        kelompokKomunitasId: kelompokKomunitasId ? Number(kelompokKomunitasId) : null,
      });
    }

    const treesToUpdate = trees.map((tree) => {
      const masterTree = masterTreesSelected.find((mt) => mt.localName === tree.localTreeName);
      return {
        id: tree.id,
        code: tree.code,
        localTreeName: tree.localTreeName,
        masterTreeId: masterTree ? masterTree.masterTreeId : null,
      };
    });

    const treesWithMasterTreeId = treesToUpdate.filter((tree) => tree.masterTreeId !== null);

    const updatePromises = treesWithMasterTreeId.map((tree) => {
      return db
        .update(treeSchema)
        .set({ masterTreeId: tree.masterTreeId })
        .where(eq(treeSchema.id, tree.id));
    });
    await Promise.all(updatePromises);

    return c.json({
      message: 'Master trees assigned successfully',
      data: treesWithMasterTreeId,
      kelompokKomunitasId: kelompokKomunitasId ? Number(kelompokKomunitasId) : null,
    });
  })

  .put('/capitalize-local-tree', async (c) => {
    const trees = await db
      .select({ id: treeSchema.id, localTreeName: treeSchema.localTreeName })
      .from(treeSchema);

    const filteredTrees = trees.filter((tree) => {
      return tree.localTreeName && tree.localTreeName !== fixCaseLocalTreeName(tree.localTreeName);
    });

    if (filteredTrees.length === 0) {
      return c.json({ message: 'No local tree names to capitalize' });
    }

    const updatedTrees = filteredTrees.map((tree) => {
      const capitalizedLocalName = fixCaseLocalTreeName(tree.localTreeName);
      return db
        .update(treeSchema)
        .set({ localTreeName: capitalizedLocalName })
        .where(eq(treeSchema.id, tree.id));
    });
    await Promise.all(updatedTrees);
    return c.json({ message: 'Local tree names capitalized' });
  });

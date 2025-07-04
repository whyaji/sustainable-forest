import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

import { masterTreeHandler } from '../app/handlers/masterTreeHandler.js';
import { db } from '../db/database.js';
import { masterLocalTreeSchema, masterTreeSchema } from '../db/schema/schema.js';
import authMiddleware from '../middleware/jwt.js';

const handler = masterTreeHandler;

// === ROUTES ===
export const masterTreeRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getMasterTree)
  .get('/actual', ...handler.getMasterTreeActual)
  .get('/:id{[0-9]+}', ...handler.getMasterTreeById)
  .get('local', ...handler.getMasterLocalTree)
  .get('local/:id{[0-9]+}', ...handler.getMasterLocalTreeById)

  .post('/', handler.createMasterTreeMiddleware, async (c) => {
    const tree = c.req.valid('json');
    const created = await db.insert(masterTreeSchema).values(tree);
    return c.json({ message: 'Tree created', masterTreeId: created[0].insertId }, 201);
  })

  .put('/:id{[0-9]+}', handler.updateMasterTreeMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const masterTree = c.req.valid('json');
    const updated = await db
      .update(masterTreeSchema)
      .set(masterTree)
      .where(eq(masterTreeSchema.id, id));
    if (!updated) {
      return c.notFound();
    }
    return c.json({ message: 'Tree updated', masterTreeId: id });
  })

  .delete('/:id{[0-9]+}', ...handler.deleteMasterTree)

  .post('/:id{[0-9]+}/update-local', handler.updateMasterTreeLocalMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));

    // body is an array of local trees with status 1: create, 2: update, 3: delete
    const localTrees = c.req.valid('json');

    // process each local tree based on status
    for (const localTree of localTrees) {
      if (localTree.status === 'create') {
        // create
        await db.insert(masterLocalTreeSchema).values({
          localName: localTree.localName,
          masterTreeId: id,
        });
      } else if (localTree.status === 'update' && localTree.id) {
        // update
        await db
          .update(masterLocalTreeSchema)
          .set({ localName: localTree.localName })
          .where(eq(masterLocalTreeSchema.id, localTree.id));
      } else if (localTree.status === 'delete' && localTree.id) {
        // delete
        await db.delete(masterLocalTreeSchema).where(eq(masterLocalTreeSchema.id, localTree.id));
      }
    }
    return c.json({ message: 'Local trees updated successfully' });
  })

  .post('local', handler.createMasterLocalTreeMiddleware, async (c) => {
    const localTree = c.req.valid('json');
    const created = await db.insert(masterLocalTreeSchema).values(localTree);
    return c.json({ message: 'Local tree created', localTreeId: created[0].insertId }, 201);
  })

  .put('local/:id{[0-9]+}', handler.updateMasterLocalTreeMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const localTree = c.req.valid('json');
    const updated = await db
      .update(masterLocalTreeSchema)
      .set(localTree)
      .where(eq(masterLocalTreeSchema.id, id));
    if (!updated) {
      return c.notFound();
    }
    return c.json({ message: 'Local tree updated', localTreeId: id });
  })

  .delete('local/:id{[0-9]+}', ...handler.deleteMasterLocalTree);

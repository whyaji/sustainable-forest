import { Hono } from 'hono';

import { wishtreeHandler } from '../../../app/handlers/wishtreeHandler.js';
import authMiddleware from '../../../middleware/jwt.js';

const handler = wishtreeHandler;

// === ROUTES ===
export const wishtreeRoute = new Hono()
  .use(authMiddleware)
  .get('/me', ...handler.getWishtreeUsers)
  .post('/me', handler.addToWishtreeMiddleware, async (c) => {
    const { treeId } = c.req.valid('json');
    const payload = c.get('jwtPayload');
    const adopterId = payload?.userId;
    const newWishtree = await handler.addToWishtree(treeId, adopterId);
    return c.json(newWishtree, newWishtree.success ? 201 : 400);
  })
  .delete('/me/multiple', handler.deleteWishtreeMiddleware, async (c) => {
    const { treeIds } = c.req.valid('json');
    const payload = c.get('jwtPayload');
    const adopterId = payload?.userId;
    const result = await handler.deleteWishtree(treeIds, adopterId);
    return c.json(result);
  });

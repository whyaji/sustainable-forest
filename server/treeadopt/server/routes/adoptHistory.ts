import { Hono } from 'hono';

import { adoptHistoryHandler } from '../../../app/handlers/adoptHistoryHandler.js';
import authMiddleware from '../../../middleware/jwt.js';

const handler = adoptHistoryHandler;

// === ROUTES ===
export const adoptHistoryRoute = new Hono()
  .use(authMiddleware)

  .get('/', ...handler.getAdoptHistory)

  .post('/', handler.createAdoptHistoryMiddleware, async (c) => {
    const adoptHistory = c.req.valid('json');
    handler.createAdoptHistory(adoptHistory);
    return c.json({ message: 'Tree created' }, 201);
  })

  .get('/:id{[0-9]+}', ...handler.getAdoptHistoryById)

  .put('/:id{[0-9]+}', handler.updateAdoptHistoryMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'));
    const adoptHistory = c.req.valid('json');
    handler.updateAdoptHistory(id, adoptHistory);
    return c.json({ message: 'Tree updated' });
  })

  .delete('/:id{[0-9]+}', ...handler.deleteAdoptHistory);

import { Hono } from 'hono';

import { masterTreeHandler } from '../../../app/handlers/masterTreeHandler.js';
import authMiddleware from '../../../middleware/jwt.js';

const handler = masterTreeHandler;

// === ROUTES ===
export const masterTreeRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getMasterTree)
  .get('/actual', ...handler.getMasterTreeActual)
  .get('/:id{[0-9]+}', ...handler.getMasterTreeById)
  .get('local', ...handler.getMasterLocalTree)
  .get('local/:id{[0-9]+}', ...handler.getMasterLocalTreeById);

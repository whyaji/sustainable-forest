import { Hono } from 'hono';

import { groupActivityHandler } from '../app/handlers/groupActivityHandler.js';
import authMiddleware from '../middleware/jwt.js';

const handler = groupActivityHandler;

// === ROUTES ===
export const groupActivityRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getGroupActivities)
  .get('/images', ...handler.getImages)
  .get('/:id{[0-9]+}', ...handler.getGroupActivityById)
  .post('/', ...handler.createGroupActivity)
  .put('/:id{[0-9]+}', ...handler.updateGroupActivity)
  .delete('/:id{[0-9]+}', ...handler.deleteGroupActivity);

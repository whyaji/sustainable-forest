import { Hono } from 'hono';

import { surveyHistoryHandler } from '../../../app/handlers/surveyHistoryHandler.js';
import authMiddleware from '../../../middleware/jwt.js';

const handler = surveyHistoryHandler;

// === ROUTES ===
export const surveyHistoryRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getSurveyHistory)
  .get('/:id{[0-9]+}', ...handler.getSurveyHistoryById);

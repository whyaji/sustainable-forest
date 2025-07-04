import { Hono } from 'hono';

import { surveyHistoryHandler } from '../app/handlers/surveyHistoryHandler.js';
import authMiddleware from '../middleware/jwt.js';

const handler = surveyHistoryHandler;

// === ROUTES ===
export const surveyHistoryRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getSurveyHistory)
  .post('/', ...handler.createSurveyHistory)
  .post('/survey-by-code', ...handler.createSurveyHistoryByCode)
  .get('/:id{[0-9]+}', ...handler.getSurveyHistoryById)
  .put('/:id{[0-9]+}', ...handler.updateSurveyHistory)
  .delete('/:id{[0-9]+}', ...handler.deleteSurveyHistory);

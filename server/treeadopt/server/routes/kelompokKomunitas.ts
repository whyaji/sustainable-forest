import { Hono } from 'hono';

import { kelompokKomunitasHandler } from '../../../app/handlers/kelompokKomunitasHandler.js';
import authMiddleware from '../../../middleware/jwt.js';

const handler = kelompokKomunitasHandler;

// === ROUTES ===
export const kelompokKomunitasRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getKelompokKomunitas)
  .get('/by-name/:name', ...handler.getKelompokKomunitasByName)
  .get('/total', ...handler.getKelompokKomunitasTotal)
  .get('/:id{[0-9]+}', ...handler.getKelompokKomunitasById);

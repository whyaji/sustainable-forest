import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { kelompokKomunitasHandler } from '../app/handlers/kelompokKomunitasHandler.js';
import authMiddleware from '../middleware/jwt.js';

const handler = kelompokKomunitasHandler;

// === ROUTES ===
export const kelompokKomunitasRoute = new Hono()
  .use(authMiddleware)
  .get('/', ...handler.getKelompokKomunitas)
  .get('/by-name/:name', ...handler.getKelompokKomunitasByName)
  .get('/total', ...handler.getKelompokKomunitasTotal)
  .get('/:id{[0-9]+}', ...handler.getKelompokKomunitasById)
  .post('/', ...handler.createKelompokKomunitas)
  .put('/:id{[0-9]+}', ...handler.updateKelompokKomunitas)
  .delete('/:id{[0-9]+}', ...handler.deleteKelompokKomunitas)

  .post(
    '/:id{[0-9]+}/update-group-coordinate-area',
    zValidator('json', handler.updateGroupCoordinateAreaSchema),
    async (c) => {
      const id = parseInt(c.req.param('id'));

      // body is an array of local trees with status 1: create, 2: update, 3: delete
      const groupCoordinatesAreas = c.req.valid('json');

      handler.updateGroupCoordinateArea(groupCoordinatesAreas, id);

      return c.json({ message: 'Group coordinate updated successfully' });
    }
  );

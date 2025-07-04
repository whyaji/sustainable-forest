import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { adoptHistoryRoute } from './routes/adoptHistory.js';
import { authRoute } from './routes/auth.js';
import { groupActivityRoute } from './routes/groupActivity.js';
import { kelompokKomunitasRoute } from './routes/kelompokKomunitas.js';
import { masterTreeRoute } from './routes/masterTree.js';
import { surveyHistoryRoute } from './routes/surveyHistory.js';
import { treeRoute } from './routes/tree.js';

const app = new Hono();

app.use('*', logger());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app
  .basePath('/api/v1')
  .route('/', authRoute)
  .route('/kelompok-komunitas', kelompokKomunitasRoute)
  .route('/tree', treeRoute)
  .route('/survey-history', surveyHistoryRoute)
  .route('/adopt-history', adoptHistoryRoute)
  .route('/master-tree', masterTreeRoute)
  .route('/group-activity', groupActivityRoute);

// Serve files from public directory
app.get('/uploads/*', serveStatic({ root: '../public' }));
app.get('/thumbnails/uploads/*', serveStatic({ root: '../public' }));

// Serve static files from the built frontend
app.get('*', serveStatic({ root: './frontend/dist' }));

// Fallback to index.html for client-side routing
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
export type ApiRoutes = typeof apiRoutes;

import { serve } from '@hono/node-server';

import env from '../../lib/env.js';
import app from './app.js';

serve(
  {
    fetch: app.fetch,
    port: env.PORT ? Number.parseInt(env.PORT) : 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

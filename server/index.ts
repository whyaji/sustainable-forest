import { serve } from '@hono/node-server';

import app from './app.js';
import env from './lib/env.js';

serve(
  {
    fetch: app.fetch,
    port: env.PORT ? Number.parseInt(env.PORT) : 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

import('./seed_events.mjs').catch(err => {
  console.error(err);
  process.exit(1);
});

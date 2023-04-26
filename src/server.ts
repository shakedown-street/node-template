import express from 'express';

import { middleware } from './middleware';
import { router } from './router';
import { SERVER_PORT } from './settings';

const app = express();

middleware(app);
router(app);

app.listen(SERVER_PORT, () => {
  console.log('Express listening on http://localhost:3000');
});

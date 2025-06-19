import 'dotenv/config';
import 'express-async-errors';
import http from 'http';

import app from './app';
import logger from './logger';

import { errorHandler } from './errors';
import { loadRoutes } from './routes';

import { Environment } from './config/Environment';

const port = Environment.getPort();

async function start() {
  const server = http.createServer(app);
  await loadRoutes(app);

  app.use(errorHandler);

  server.listen(port, () => logger.info(`Servidor no ar ${port}`));
}

start();

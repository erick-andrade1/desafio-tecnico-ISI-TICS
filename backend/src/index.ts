import 'dotenv/config';
import 'express-async-errors';
import http from 'http';

import app from './app';
import logger from './logger';

import { Environment } from './config/Environment';

const port = Environment.getPort();

async function start() {
  const server = http.createServer(app);

  server.listen(port, () => logger.info(`Servidor no ar ${port}`));
}

start();

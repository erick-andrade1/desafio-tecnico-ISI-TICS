import winston from 'winston';
import path from 'path';

import { Environment } from './config/Environment';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({
      stack: true,
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.resolve(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '..', 'logs', 'info.log'),
      level: 'info',
    }),
  ],
});

if (!Environment.isProduction()) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;

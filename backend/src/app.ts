import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import logRouter from './middlewares/logRouter';

const app = express();

app.use(cors());
app.use(logRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;

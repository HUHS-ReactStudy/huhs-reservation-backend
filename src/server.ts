import dotenv from 'dotenv';
dotenv.config();
import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import rootRouter from './api';
import './db';

const app = new Koa();

app.use(helmet()).use(logger()).use(bodyParser());

app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

app.listen(process.env.SERVER_PORT, () => {
  console.log('✅ Listening on Port 3000');
});

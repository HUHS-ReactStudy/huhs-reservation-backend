import dotenv from 'dotenv';
dotenv.config();
import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import rootRouter from './api';
import './db';
import swaggerRouter from './swagger';

const app = new Koa();

app.use(helmet()).use(cors()).use(logger()).use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set('Content-Security-Policy', 'self unsafe-inline');
  await next();
});

app.use(swaggerRouter.routes());

app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

app.listen(process.env.SERVER_PORT, () => {
  console.log('✅ Listening on Port 3000');
});

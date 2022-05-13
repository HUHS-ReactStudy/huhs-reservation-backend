import Router from '@koa/router';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import reservationRouter from './reservation';

const rootRouter = new Router({ prefix: '/api/v1' });

rootRouter.use('/reservation', reservationRouter.routes());

rootRouter.use(helmet()).use(logger()).use(bodyParser());

export default rootRouter;

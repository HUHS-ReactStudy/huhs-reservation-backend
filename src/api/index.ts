import Router from '@koa/router';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

const rootRouter = new Router();

rootRouter.use(helmet()).use(logger()).use(bodyParser());

export default rootRouter;

import Router from '@koa/router';
import * as reservationController from './controller';

const reservationRouter = new Router();

reservationRouter.post('/', reservationController.addReservation);

export default reservationRouter;

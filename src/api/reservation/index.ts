import Router from '@koa/router';
import * as reservationController from './controller';

const reservationRouter = new Router();

reservationRouter.post('/', reservationController.addReservation);
reservationRouter.get('/monthly', reservationController.getMonthlyReservations);
reservationRouter.get('/daily', reservationController.getDailyReservations);

export default reservationRouter;

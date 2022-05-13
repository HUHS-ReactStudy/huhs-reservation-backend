import Router from '@koa/router';
import * as reservationController from './controller';

const reservationRouter = new Router();

reservationRouter.get('/monthly', reservationController.getMonthlyReservations);
reservationRouter.get('/daily', reservationController.getDailyReservations);
reservationRouter.post('/', reservationController.addReservation);

export default reservationRouter;

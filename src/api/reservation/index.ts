import Router from '@koa/router';
import { jwtMiddleware } from '../../utils/jwt';
import * as reservationController from './controller';

const reservationRouter = new Router();

reservationRouter.post('/', reservationController.addReservation);
reservationRouter.get('/monthly', reservationController.getMonthlyReservations);
reservationRouter.get('/daily', reservationController.getDailyReservations);
reservationRouter.post('/auth', reservationController.checkReservationOwner);
reservationRouter.put('/:reservationId', jwtMiddleware, reservationController.patchReservation);
reservationRouter.delete('/:reservationId', jwtMiddleware, reservationController.deleteReservation);

export default reservationRouter;

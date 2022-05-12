import Koa from 'koa';
import rootRouter from './api';

const app = new Koa();

app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

app.listen(process.env.SERVER_PORT, () => {
  console.log('Listening on Port 3000');
});

import Router from '@koa/router';
import { koaSwagger } from 'koa2-swagger-ui';
import YAML from 'yamljs';
import path from 'path';

const swaggerRouter = new Router();

const spec = YAML.load(path.join(__dirname, '../swagger.yaml'));

swaggerRouter.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

export default swaggerRouter;

import { Router } from 'express';
import { all, create, detail } from "../actions/tags";

const routes = Router();

routes.get('', all);
routes.post('', create);
routes.get('/:id', detail);

export default routes;
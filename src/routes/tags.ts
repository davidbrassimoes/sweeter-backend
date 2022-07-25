import { Router } from 'express';
import { all, detail } from "../actions/tags";

const routes = Router();

routes.get('', all);
routes.get('/:id', detail);

export default routes;
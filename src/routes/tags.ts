import { Router } from 'express';
import { all, create, detail, remove, update } from "../actions/tags";

const routes = Router();

routes.get('', all);
routes.post('', create);
routes.get('/:id', detail);
routes.delete('/:id', remove);
routes.put('/:id', update);

export default routes;
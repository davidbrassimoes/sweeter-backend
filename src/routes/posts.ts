import { Router } from 'express';
import { create, detail, remove } from "../actions/posts";

const routes = Router();

routes.post('', create);
routes.get('/:id', detail);
routes.delete('/:id', remove);

export default routes;
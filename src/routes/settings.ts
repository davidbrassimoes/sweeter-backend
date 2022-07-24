import { Router } from 'express';
import { getSettings } from "../actions/settings";

const routes = Router();

routes.get('/', getSettings);

export default routes;
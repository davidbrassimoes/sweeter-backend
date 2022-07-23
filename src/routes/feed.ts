import { Router } from 'express';
import { userFeed, worldFeed, byTagFeed, byUserFeed, atMeFeed } from "../actions/feed";

const routes = Router();

routes.get('/user', userFeed);
routes.get('/world', worldFeed);
routes.get('/by-tag/:id', byTagFeed);
routes.get('/by-user/:id', byUserFeed);
routes.get('/at-me', atMeFeed);

export default routes;
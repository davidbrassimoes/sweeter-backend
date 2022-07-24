import { Router } from 'express';
import { followUser, followTag, removeFollowUser, removeFollowTag } from "../actions/follow";

const routes = Router();

routes.put('/user/:id', followUser);
routes.put('/tag/:id', followTag);
routes.delete('/user/:id', removeFollowUser);
routes.delete('/tag/:id', removeFollowTag);

export default routes;
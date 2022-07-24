import { Router } from 'express';
import { likePost, likeRepost, removeLikePost, removeLikeRepost } from "../actions/like";

const routes = Router();

routes.put('/post/:id', likePost);
routes.put('/repost/:id', likeRepost);
routes.delete('/post/:id', removeLikePost);
routes.delete('/repost/:id', removeLikeRepost);

export default routes;
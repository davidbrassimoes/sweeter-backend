import { Router } from "express";
import postRoutes from './posts';
import repostRoutes from './reposts';
import tagRoutes from './tags';
import userRoutes from './users';
import feedRoutes from './feed'
import likeRoutes from './like'
import followRoutes from './follow'
import settingsRoutes from './settings'


const routes = Router();
routes.use('/posts', postRoutes);
routes.use('/reposts', repostRoutes);
routes.use('/tags', tagRoutes);
routes.use('/users', userRoutes);
routes.use('/feed', feedRoutes)
routes.use('/like', likeRoutes)
routes.use('/follow', followRoutes)
routes.use('/settings', settingsRoutes)

export default routes
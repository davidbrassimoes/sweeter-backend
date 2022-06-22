import { Router } from "express";
import messageRoutes from './messages';
import postRoutes from './posts';
import repostRoutes from './reposts';
import roomRoutes from './rooms';
import tagRoutes from './tags';
import userRoutes from './users';

const routes = Router();
routes.use('/messages', messageRoutes);
routes.use('/posts', postRoutes);
routes.use('/reposts', repostRoutes);
routes.use('/rooms', roomRoutes);
routes.use('/tags', tagRoutes);
routes.use('/users', userRoutes);

export default routes
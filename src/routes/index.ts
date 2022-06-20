import { Router } from "express";
import chatMessageRoutes from './chat-messages';
import chatRoomRoutes from './chat-rooms';
import postRoutes from './posts';
import repostRoutes from './reposts';
import tagRoutes from './tags';
import userRoutes from './users';

const routes = Router();
routes.use('/chat-messages', chatMessageRoutes);
routes.use('/chat-rooms', chatRoomRoutes);
routes.use('/posts', postRoutes);
routes.use('/reposts', repostRoutes);
routes.use('/tags', tagRoutes);
routes.use('/users', userRoutes);

export default routes
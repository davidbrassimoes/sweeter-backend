import express from 'express';
import routes from './routes';
import cors from 'cors';
import { verifyToken } from './services/security/token.service'

const app = express();
app.use(cors())
app.use(express.json());
app.use(verifyToken)
app.use(routes)

export default app;

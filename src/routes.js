import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
const upload = multer(multerConfig);
// declarando ele abaixo dessas rotas somente a que estiverem abaixo do use
// utilizaram esse midleware
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;

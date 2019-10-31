import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
// agenda do prestador de servico
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationConroller';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
const upload = multer(multerConfig);
// declarando ele abaixo dessas rotas somente a que estiverem abaixo do use
// utilizaram esse midleware
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);

export default routes;

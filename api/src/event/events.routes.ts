import { Router } from 'express';
import { EventsController } from './event.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const controller = new EventsController();

router.get('', authMiddleware, (req, res) => controller.listEvents(req, res));

export default router;

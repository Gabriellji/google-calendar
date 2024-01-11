import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from './auth.middleware';

const router = Router();
const controller = new AuthController();

router.get('/login', (req, res) => controller.login(req, res));
router.get('/check-session', authMiddleware,  (req, res) => controller.checkSession(req, res));
router.post('/logout', authMiddleware, (req, res) => controller.logout(req, res));
router.get('/google/callback', (req, res) => controller.callback(req, res));

export default router;

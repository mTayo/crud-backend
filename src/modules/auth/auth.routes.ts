import { Router } from 'express';
import { register, login, profile } from './auth.controller';
import { authenticate } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, profile);


export default router;

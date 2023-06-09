import { Router } from 'express';;
import { Register, Login, Logout } from '../controllers/auth';
import authUser from '../middleware/authUser';

const router = Router();
router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', authUser, Logout);

export default router;

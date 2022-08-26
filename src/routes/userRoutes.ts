import { Router } from 'express';
import { createUser, loginUser, getUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);

export default router;

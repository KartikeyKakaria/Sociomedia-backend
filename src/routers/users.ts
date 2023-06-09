import { Router } from 'express';
import { acceptRequest, addFollowing, editPassword, editUser, friendReq, getUser, getUserById } from '../controllers/user';
import authUser from '../middleware/authUser';

const userRouter = Router();

userRouter.get('/', authUser, getUser);
userRouter.get('/find/:id', getUserById);
userRouter.put('/', authUser, editUser);
userRouter.put('/password', authUser, editPassword);
userRouter.put('/follow', authUser, addFollowing);
userRouter.put('/friend', authUser, friendReq);
userRouter.put('/accept', authUser, acceptRequest);

export default userRouter;

import { Router } from 'express';
const addRouter = Router();
import userAuth from '../middleware/authUser';
import addFollowing from '../controllers/add/follow';
import friendReq from '../controllers/add/friendRequest';

addRouter.post('/follow', userAuth, addFollowing);
addRouter.post('/friend', userAuth, friendReq)
export default addRouter;

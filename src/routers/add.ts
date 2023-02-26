import { Router } from 'express';
const addRouter = Router();
import userAuth from '../middleware/authUser';
import addFollowing from '../controllers/add/follow';

addRouter.post('/follow', userAuth, addFollowing);

export default addRouter;

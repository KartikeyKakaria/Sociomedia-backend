import { Router } from 'express';
import authUser from '../middleware/authUser';
import { getUser, getUserById } from '../controllers/get/getUser';
import checkIfUserAlreadyFollows from '../lib/userFollows';
const getRouter = Router();

getRouter.get('/', authUser, getUser);
getRouter.get('/:id', getUserById);
getRouter.get('/follows/:followingId', authUser, async (req, res) => {
   try {
      const { followingId, user } = req.params;
      const { _id } = JSON.parse(user);
      const followsUser = await checkIfUserAlreadyFollows(_id, followingId);
      return res.status(200).json({
         status: true,
         response: followsUser
      });
   } catch (error) {
      return res.status(500).json({
         status: false,
         response: `${error}`
      });
   }
});

export default getRouter;

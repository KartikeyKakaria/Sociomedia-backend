import { Request, Response, RequestHandler } from 'express';
import { msgResponse } from '../../lib/Classes';
import USER from '../../models/User';
import checkIfUserAlreadyFollows from '../../lib/userFollows';
const addFollowing: RequestHandler = async (req: Request, res: Response) => {
   const { followingId } = req.body;
   const rep = new msgResponse(false, 'Followed successfully');
   if (!followingId) {
      rep.changeMessage('Please enter out all the fields');
      return res.status(401).send(rep);
   }
   const { _id } = JSON.parse(req.params.user);
   try {
      /** Checking if the user already follows them or not **/
      const followingFollower = await checkIfUserAlreadyFollows(_id, followingId);
      if (followingFollower) {
         rep.changeMessage('You already follow them!');
         return res.status(402).send(rep);
      }

      /** If not add them as a follower **/
      const result1 = await USER.updateOne(
         { _id },
         {
            $push: {
               following: followingId
            }
         }
      );
      const result2 = await USER.updateOne(
         { _id: followingId },
         {
            $push: {
               followers: _id
            }
         }
      );
      if (result1 && result2) {
         rep.changeStats(true);
         return res.status(201).json(rep);
      }
   } catch (error) {
      rep.changeMessage(`${error}`);
      return res.status(500).json(rep);
   }
};

export default addFollowing;

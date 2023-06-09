import { Request, Response, RequestHandler } from 'express';
import { compare, hash } from 'bcryptjs';
import pendingReqs from '../models/friendReq';
import pendingRequests from '../lib/getFriendRequests';
import USER from '../models/User';
import { jsonResponse, msgResponse } from '../lib/Classes';
import { dbUser } from '../lib/types';
import checkIfUserAlreadyFollows from '../lib/userFollows';

interface reqBody {
   prevPassword: string;
   newPassword: string;
}

export const getUser: RequestHandler = async (req: Request, res: Response) => {
   const { user } = req.params;
   res.status(200).json(JSON.parse(user));
};

export const getUserById = async (req: Request, res: Response) => {
   const { id } = req.params;
   const rep = new jsonResponse(true, {
      error: "User doesn't exist"
   });
   try {
      const user = await USER.find({ _id: id });
      if (user.length > 0) {
         const { name, email, age, number, gender, DOB, date, _id, friends, followers, following, badges } = user[0];
         rep.changeData({
            name,
            email,
            age,
            number,
            gender,
            DOB,
            date,
            _id,
            friends,
            followers,
            following,
            badges
         });
         return res.status(200).json(rep);
      } else {
         rep.changeStats(false);
         return res.status(402).json(rep);
      }
   } catch (error) {
      const resp = new msgResponse(false, `${error}`);
      return res.status(500).json(resp);
   }
};

export const editUser: RequestHandler = async (req: Request, res: Response) => {
   const { _id, name, email, age, DOB, gender, number } = JSON.parse(req.params.user);
   const { newName, newAge, newEmail, newDOB, newGender, newNumber } = req.body;
   console.log(newName);
   const resp = new msgResponse(false, 'Data updated successfully');
   if (!newName && !newAge && !newEmail && !newDOB && !newGender && !newNumber) {
      resp.changeMessage('No change');
      return res.status(402).json(resp);
   }
   try {
      await USER.updateOne(
         { _id },
         {
            $set: {
               name: newName || name,
               age: newAge || age,
               email: newEmail || email,
               DOB: newDOB || DOB,
               gender: newGender || gender,
               number: newNumber || number
            }
         }
      );
      resp.changeStats(true);
      return res.status(201).json(resp);
   } catch (error) {
      resp.changeMessage(`${error}`);
      return res.status(500).json(resp);
   }
};

export const editPassword: RequestHandler = async (req: Request, res: Response) => {
   const { _id, password } = JSON.parse(req.params.user) as dbUser;
   const { prevPassword, newPassword } = req.body as reqBody;
   const rep = new msgResponse(false, 'password updated successfully');
   try {
      const isPasswordValid = await compare(prevPassword, password);
      if (isPasswordValid) {
         const dbPassword = await hash(newPassword, 4);
         await USER.updateOne(
            { _id },
            {
               $set: {
                  password: dbPassword
               }
            }
         );
         rep.changeStats(true);
         return res.status(201).json(rep);
      }
      rep.changeMessage('Invalid password');
      return res.status(402).json(rep);
   } catch (err) {
      rep.changeMessage(`${err}`);
      return res.status(500).json(rep);
   }
};

export const friendReq: RequestHandler = async (req: Request, res: Response) => {
   const rep = new msgResponse(false, 'request sent successfully');
   const { friendId } = req.body;
   const { _id, friends } = JSON.parse(req.params.user);
   if (!friendId) {
      rep.changeMessage('please enter out all fields');
      return res.status(402).json(rep);
   }
   const sentFriendRequests = await pendingRequests(_id);
   if (!sentFriendRequests) {
      rep.changeMessage('Internal server error');
      return res.status(500).json(rep);
   }
   if ((sentFriendRequests as string[]).includes(friendId) || friends.includes(friendId)) {
      rep.changeMessage('You already sent them a friend request');
      return res.status(402).json(rep);
   }
   try {
      const pendingReq = new pendingReqs({
         from: _id,
         to: friendId
      });
      const result = await pendingReq.save();
      if (result) {
         rep.changeStats(true);
         return res.status(201).json(rep);
      }
   } catch (error) {
      console.log(error);
      rep.changeMessage(`${error} Error`);
      return res.status(500).json(rep);
   }
};

export const addFollowing: RequestHandler = async (req: Request, res: Response) => {
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

export const acceptRequest: RequestHandler = async (req: Request, res: Response) => {
   const rep = new msgResponse(false, 'accepted successfully');
   const { _id } = JSON.parse(req.params.user);
   const { requestId } = req.body;
   const requests = await pendingRequests(requestId);
   if (!requests) {
      rep.changeMessage('Server error');
      return res.status(500).json(rep);
   }
   if (!(requests as string[]).includes(_id)) {
      rep.changeMessage('No pending friend request from the user');
      return res.status(402).json(rep);
   }

   try {
      await pendingReqs.deleteOne({ from: requestId, to: _id });
      await USER.updateOne(
         { _id: _id },
         {
            $push: {
               friends: requestId
            }
         }
      );
      await USER.updateOne(
         { _id: requestId },
         {
            $push: {
               friends: _id
            }
         }
      );
      rep.changeStats(true);
      return res.status(201).json(rep);
   } catch (error) {
      rep.changeMessage(`${error}`);
      return res.status(500).json(rep);
   }
};
import USER from '../models/User';
async function checkIfUserAlreadyFollows(userID: string, followingId: string): Promise<boolean> {
   const alreadyFollowing = await USER.find({ followers: userID });
   const followingFollower = alreadyFollowing.some((user) => {
      return user._id.toString() === followingId;
   });
   return followingFollower;
}
export default checkIfUserAlreadyFollows;

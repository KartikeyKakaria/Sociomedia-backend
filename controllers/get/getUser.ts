import { Request, Response, RequestHandler } from "express";
import USER from "../../models/User";
import { jsonResponse, msgResponse } from "../../lib/Classes";
const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { user } = req.params;
  res.status(200).json(JSON.parse(user));
};
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rep = new jsonResponse(true, {
    error: "User does'nt exist",
  });
  try {
    const user = await USER.find({ _id: id });
    if (user.length > 0) {
      const {
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
        badges,
      } = user[0];
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
        badges,
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
export { getUser };
export { getUserById };

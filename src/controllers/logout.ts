import { Request, Response, RequestHandler } from "express";
import USER from "../models/User";
import { msgResponse } from "../lib/Classes";
import { Token } from "../lib/types";
const Logout: RequestHandler = async (req: Request, res: Response) => {
  const rep = new msgResponse(false, "Logged out successfully");
  const { user, token } = req.params; // fetching the user and the tokens
  const { _id, tokens } = JSON.parse(user); // taking the og tokens and userId
  //removing the logged in token from user db and clearing its cookie
  const newTokens = tokens.filter(
    (tokenObj: Token) => tokenObj.token !== token
  );
  try {
    const result = await USER.updateOne(
      { _id },
      {
        $set: {
          tokens: newTokens,
        },
      }
    );
    if (result) {
      res.clearCookie("jwt");
      rep.changeStats(true);
      res.status(201).json(rep);
    }
  } catch (error) {
    rep.changeMessage(`${error}`);
    return res.status(500).json(rep);
  }
};
export default Logout;

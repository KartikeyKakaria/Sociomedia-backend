import { Request, Response, RequestHandler} from "express";
import USER from "../models/User";
import { msgResponse } from "./lib/Classes";
import { request } from "./lib/types";
const Logout:RequestHandler = async (req: Request, res: Response) => {
  const { user, token } = req.params;
  res.json({user, token});
};
export default Logout;


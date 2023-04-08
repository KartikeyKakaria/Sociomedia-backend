import { Router } from "express";
import authUser from "../middleware/authUser";

const editRouter = Router();

editRouter.post('/me', authUser);


export default editRouter;
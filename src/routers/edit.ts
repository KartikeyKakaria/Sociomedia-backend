import { Router } from "express";
import authUser from "../middleware/authUser";
import editUser from "../controllers/edit/user";
const editRouter = Router();

editRouter.post('/me', authUser, editUser);


export default editRouter;
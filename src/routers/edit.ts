import { Router } from "express";
import authUser from "../middleware/authUser";
import editUser from "../controllers/edit/user";
import editPassword from "../controllers/edit/password";
const editRouter = Router();

editRouter.post('/me', authUser, editUser);
editRouter.post('/password', authUser, editPassword);


export default editRouter;
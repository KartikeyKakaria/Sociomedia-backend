import { Router } from "express";
import authUser from "../middleware/authUser";
import { getUser, getUserById } from "../controllers/get/getUser"
const getRouter = Router();
getRouter.get("/", authUser, getUser)
getRouter.get("/:id", getUserById)
export default getRouter;

import { Router } from "express";
import Register from "../controllers/register";
import Login from "../controllers/login";
import authUser from "../middleware/authUser";
import Logout from "../controllers/logout";
const router = Router();
router.get("/", (req, res) => {
    res.send("Hello world from ts router")
})
router.post("/register", Register)
router.post("/login", Login)
router.get("/logout", authUser, Logout)
export default router;
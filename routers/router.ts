import {Router} from "express";
import Register from "../controllers/register";
import Login from "../controllers/login";
const router = Router();

router.get("/",(req,res)=>{
    res.send("Hello world from ts router")
})
router.post("/register",Register)
router.post("/login",Login)
export default router;
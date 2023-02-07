import {Router} from "express";
import Register from "../controllers/register";
const router = Router();

router.get("/",(req,res)=>{
    res.send("Hello world from ts router")
})
router.get("/register",Register)
export default router;
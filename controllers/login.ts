import { Request, Response } from "express";
import USER from "../models/User";
import bcrypt from "bcryptjs";
import { msgResponse } from "../lib/Classes";
import { cookieOps } from "../lib/types";
const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const rep = new msgResponse(false, "Loginned successfully")
    if (!email || !password) {
        rep.changeMessage("Please enter out all the fields")
        return res.status(402).json(rep)
    }
    const user = await USER.find({ email });
    if (!user) {
        rep.changeMessage("Invalid email or password")
        return res.status(402).json(rep);
    }
    const passwordsMatch = await bcrypt.compare(password, user[0].password)
    if (!passwordsMatch) {
        rep.changeMessage("Invalid email or password")
        return res.status(402).json(rep);
    }
    const token = await user[0].generateAuthToken();
    const cookieOptions: cookieOps = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === "prudction") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions)
    rep.changeStats(true)
    return res.status(200).json(rep);

}
export default Login;
import {Request, Response } from "express";
import USER from "../models/User";
import bcrypt from "bcryptjs";
import { msgResponse } from "./lib/Classes";
const Login = async(req:Request, res:Response)=>{
    const {email, password} = req.body;
    const rep = new msgResponse(false, "Loginned successfully")
    if(!email || !password){
        rep.changeMessage("Please enter out all the fields")
        return res.status(422).json(rep)
    }
    const user = await USER.find({email});
    if(!user){
        rep.changeMessage("Invalid email or password")
        return res.status(422).json(rep);
    }
    const passwordsMatch = await bcrypt.compare(password, user[0].password)
    if(!passwordsMatch){
        rep.changeMessage("Invalid email or password")
        return res.status(422).json(rep);
    }
    rep.changeStats(true)
    return res.status(200).json(rep);

}
export default Login;
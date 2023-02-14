import {Request, Response } from "express";
import USER from "../models/User";
import bcrypt from "bcryptjs";
const Login = async(req:Request, res:Response)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please enter out all the fields"})
    }
    const user = await USER.find({email});
    if(!user){
        return res.status(422).json({error:"Invalid email or password"});
    }
    const passwordsMatch = await bcrypt.compare(password, user[0].password)
    if(!passwordsMatch){
        return res.status(422).json({error:"Invalid email or password"});
    }
    return res.status(200).json({message:"Logged in successfully"});

}
export default Login;
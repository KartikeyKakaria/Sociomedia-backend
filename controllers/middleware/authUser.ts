import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import USER from "../../models/User";
import { msgResponse } from "../lib/Classes";
const authUser:RequestHandler = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies.jwt;
        const userId = jwt.verify(token,process.env.SECRET_KEY||"yoursecretkey");
        const user = await USER.findById(userId);
        req.params.user = JSON.stringify(user)
        req.params.token = token;
        next();
    }catch(error){
        let rep = new msgResponse(false,`${error}`)
        return res.status(500).json(rep)
    }
}
export default authUser;

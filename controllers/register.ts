import { Request, Response } from "express";
import USER from "../models/User";
const Register = async (req: Request, res: Response) => {
  const {name, email, age, number, password, cpassword, DOB, gender} = req.body;
  if(password !== cpassword){
    return res.status(500).json({error:"Passwords don't match"})
  }
  if(!number || !name || !age || !email || !password || !cpassword || !DOB || !gender ){
    return res.status(500).json({error:"Invalid credentials"})
  }
  const user = new USER({
    name,
    email,
    age,
    number,
    gender:gender.toLowerCase(),
    DOB,
    friends:[],
    followers:[],
    following:[],
    badges:[],
    password,
  })
  const result = await user.save();
  res.status(200).json(result)
};

export default Register;

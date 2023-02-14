import { Request, Response } from "express";
import USER from "../models/User";
const Register = async (req: Request, res: Response) => {
  const {name, email, age, number, password, cpassword, DOB, gender} = req.body;
  if(password !== cpassword){
    return res.status(500).json({error:"Passwords don't match"})
  }
  if(!number || !name ){
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
  console.log(result)
  res.status(200).send(result)
};

export default Register;

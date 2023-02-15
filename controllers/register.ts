import { Request, Response } from "express";
import USER from "../models/User";
import {msgResponse} from "./lib/Classes"
const Register = async (req: Request, res: Response) => {
  const rep = new msgResponse(false, "Registered successfully")
  const { name, email, age, number, password, cpassword, DOB, gender } =
    req.body;
  if (password !== cpassword) {
    rep.changeMessage("Passwords don't match")
    return res.status(422).json(rep);
  }
  if (
    !number ||
    !name ||
    !age ||
    !email ||
    !password ||
    !cpassword ||
    !DOB ||
    !gender
  ) {
    rep.changeMessage("Invalid credentials")
    return res.status(422).json({ error: "Invalid credentials" });
  }
  const emailExists = await USER.find({ email });
  const numberExists = await USER.find({ number });
  if (emailExists.length !== 0 || numberExists.length !== 0) {
    console.log(emailExists)
    console.log(numberExists,"Loal what")
    rep.changeMessage("email or number already exists")
    return res.status(422).json(rep);
  }
  const user = new USER({
    name,
    email,
    age,
    number,
    gender: gender.toLowerCase(),
    DOB,
    friends: [],
    followers: [],
    following: [],
    badges: [],
    password,
  });
  try {
    const result = await user.save();
    const token = await user.generateAuthToken();
    await res.cookie("jwt",token, {
      secure:true,
      httpOnly:true,
    })
    console.log(token, req.cookies.jwt)
    if(result){
      rep.changeStats(true)
      res.status(200).json(rep)
    };
  } catch (error) {
    rep.changeMessage(`${error}`)
    return res.status(500).json(rep);
  }
};

export default Register;

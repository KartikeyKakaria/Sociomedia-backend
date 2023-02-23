import { Request, Response } from "express";
import USER from "../models/User";
import { msgResponse } from "../lib/Classes"
import { cookieOps } from "../lib/types"
const Register = async (req: Request, res: Response) => {
  const rep = new msgResponse(false, "Registered successfully")
  const { name, email, age, number, password, cpassword, DOB, gender } =
    req.body;
  if (password !== cpassword) {
    rep.changeMessage("Passwords don't match")
    return res.status(402).json(rep);
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
    return res.status(402).json({ error: "Invalid credentials" });
  }
  const emailExists = await USER.find({ email });
  const numberExists = await USER.find({ number });
  if (emailExists.length !== 0 || numberExists.length !== 0) {
    rep.changeMessage("email or number already exists")
    return res.status(402).json(rep);
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
    const cookieOptions: cookieOps = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions)
    if (result) {
      rep.changeStats(true)
      res.status(201).json(rep)
    };
  } catch (error) {
    rep.changeMessage(`${error}`)
    return res.status(500).json(rep);
  }
};

export default Register;

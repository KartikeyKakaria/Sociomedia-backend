import { Request, Response } from "express";
const Register = (req: Request, res: Response): void => {
  const name:String = req.body.name;
  res.send({ name });
};

export default Register;

import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import USER from '../models/User';
import serverProps from '../config/config';
import { cookieOps } from '../lib/types';
import { msgResponse } from '../lib/Classes';
import { Token } from '../lib/types';

const { env } = serverProps.server;

export const Login: RequestHandler = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   const rep = new msgResponse(false, 'Loginned successfully');
   if (!email || !password) {
      rep.changeMessage('Please enter out all the fields');
      return res.status(402).json(rep);
   }
   const user = await USER.findOne({ email });
   if (!user) {
      rep.changeMessage('Invalid email or password');
      return res.status(402).json(rep);
   }
   const passwordsMatch = await bcrypt.compare(password, user.password);
   if (!passwordsMatch) {
      rep.changeMessage('Invalid email or password');
      return res.status(402).json(rep);
   }
   const token = await user.generateAuthToken();
   const cookieOptions: cookieOps = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true
   };
   if (env === 'prudction') cookieOptions.secure = true;

   res.cookie('jwt', token, cookieOptions);
   rep.changeStats(true);
   return res.status(200).json(rep);
};

export const Register = async (req: Request, res: Response) => {
   const rep = new msgResponse(false, 'Registered successfully');
   const { name, email, age, number, password, cpassword, DOB, gender } = req.body;
   if (password !== cpassword) {
      rep.changeMessage("Passwords don't match");
      return res.status(402).json(rep);
   }
   if (!number || !name || !age || !email || !password || !cpassword || !DOB || !gender) {
      rep.changeMessage('Invalid credentials');
      return res.status(402).json({ error: 'Invalid credentials' });
   }
   const emailExists = await USER.find({ email });
   const numberExists = await USER.find({ number });
   if (emailExists.length !== 0 || numberExists.length !== 0) {
      rep.changeMessage('email or number already exists');
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
      password
   });
   try {
      const result = await user.save();
      const token = await user.generateAuthToken();
      const cookieOptions: cookieOps = {
         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
         httpOnly: true
      };
      if (env === 'production') cookieOptions.secure = true;
      res.cookie('jwt', token, cookieOptions);
      if (result) {
         rep.changeStats(true);
         return res.status(201).json(rep);
      }
   } catch (error) {
      rep.changeMessage(`${error}`);
      return res.status(500).json(rep);
   }
};

export const Logout: RequestHandler = async (req: Request, res: Response) => {
   const rep = new msgResponse(false, 'Logged out successfully');
   const { user, token } = req.params; // fetching the user and the tokens
   const { _id, tokens } = JSON.parse(user); // taking the og tokens and userId
   //removing the logged in token from user db and clearing its cookie
   const newTokens = tokens.filter((tokenObj: Token) => tokenObj.token !== token);
   try {
      const result = await USER.updateOne(
         { _id },
         {
            $set: {
               tokens: newTokens
            }
         }
      );
      if (result) {
         res.clearCookie('jwt');
         rep.changeStats(true);
         res.status(201).json(rep);
      }
   } catch (error) {
      rep.changeMessage(`${error}`);
      return res.status(500).json(rep);
   }
};

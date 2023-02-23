import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface user {
  name: string;
  email: string;
  age: number;
  date: Date;
  number: number;
  gender: "male" | "female" | "others";
  DOB: Date;
  friends: Array<string>;
  followers: Array<string>;
  following: Array<string>;
  badges: Array<string>;
  password: string;
  tokens:[{
    token:string,
  }],
  generateAuthToken:Function,
}

const userSchema = new Schema<user>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  age: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique:true
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
  DOB: {
    type: Date,
    required: true,
  },
  friends: [String],
  followers: [String],
  following: [String],
  badges: [String],
  password: {
    type: String,
    required: true,
  },
  tokens:[{
    token:{
      type:String,
      required:true,
    }
  }]
});

userSchema.methods.generateAuthToken = async function():Promise<string>{
  try {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY || "yoursecretkey" );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    return `${error}`;
  }
}

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 4);
  next();
});
const USER = model<user>("user", userSchema);
export default USER;

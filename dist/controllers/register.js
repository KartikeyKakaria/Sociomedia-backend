"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Register = async (req, res) => {
    const { name, email, age, number, password, cpassword, DOB, gender } = req.body;
    if (password !== cpassword) {
        return res.status(422).json({ error: "Passwords don't match" });
    }
    if (!number ||
        !name ||
        !age ||
        !email ||
        !password ||
        !cpassword ||
        !DOB ||
        !gender) {
        return res.status(422).json({ error: "Invalid credentials" });
    }
    const userExists = await User_1.default.find({ email });
    if (userExists) {
        return res.status(422).json({ error: "Email already exists" });
    }
    const user = new User_1.default({
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
        res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.default = Register;

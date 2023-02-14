"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age, number, password, cpassword, DOB, gender } = req.body;
    if (password !== cpassword) {
        return res.status(500).json({ error: "Passwords don't match" });
    }
    if (!number || !name || !age || !email || !password || !cpassword || !DOB || !gender) {
        return res.status(500).json({ error: "Invalid credentials" });
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
    const result = yield user.save();
    res.status(200).json(result);
});
exports.default = Register;

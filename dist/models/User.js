"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true
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
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await bcryptjs_1.default.hash(this.password, 4);
    next();
});
const USER = (0, mongoose_1.model)("user", userSchema);
exports.default = USER;

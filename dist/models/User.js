"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(Date.now())
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
    }
});
const USER = (0, mongoose_1.model)("user", userSchema);
exports.default = USER;

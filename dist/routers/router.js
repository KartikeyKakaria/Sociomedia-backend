"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = __importDefault(require("../controllers/register"));
const login_1 = __importDefault(require("../controllers/login"));
const authUser_1 = __importDefault(require("../controllers/middleware/authUser"));
const logout_1 = __importDefault(require("../controllers/logout"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello world from ts router");
});
router.post("/register", register_1.default);
router.post("/login", login_1.default);
router.get("/logout", authUser_1.default, logout_1.default);
exports.default = router;

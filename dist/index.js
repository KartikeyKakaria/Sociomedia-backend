"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./config.env" });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routers/router"));
require("./db/connection");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", router_1.default);
app.listen(port, () => console.log(`listening at port number ${port}`));

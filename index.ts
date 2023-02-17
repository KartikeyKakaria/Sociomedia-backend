import { config } from "dotenv";
config({ path: "./config.env" });
import express from "express";
import router from "./routers/router";
import getRouter from "./routers/get"
import cookieParser from "cookie-parser";
import "./db/connection"
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/",router);
app.use("/get",getRouter);

app.listen(port, (): void => console.log(`listening at port number ${port}`));

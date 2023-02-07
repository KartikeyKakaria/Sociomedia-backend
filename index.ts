import { config } from "dotenv";
config({ path: "./config.env" });
import express from "express";
import router from "./routers/router";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/",router)

app.listen(port, (): void => console.log(`listening at port number ${port}`));

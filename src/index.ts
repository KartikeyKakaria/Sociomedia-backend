import express from "express";
import { connect } from "mongoose"
import router from "./routers/router";
import getRouter from "./routers/get"
import cookieParser from "cookie-parser";
import serverProps from "./config/config";
import Logging from './lib/Logging'
const { db, server } = serverProps
connect(db)
    .then(() => {
        Logging.info(`connected to database`)
        startServer();
    })
    .catch(err => {
        Logging.error(`could not connected to database`);
        Logging.error(err)
    })

const startServer = () => {
    const app = express();
    const { port } = server;
    app.use((req, res, next) => {
        const { url } = req
        Logging.info(`Requesting Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}]`)
        res.on('finish', () => {
            Logging.info(`Responding Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}] status:[${res.statusCode}]`)
        })
        next()
    })
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use("/", router);
    app.use("/get", getRouter);
    app.use((req, res) => {
        Logging.error(`[404]: ${req.url} not found`);
    })
    app.listen(port, () => Logging.info(`listening at port number ${port}`));
}

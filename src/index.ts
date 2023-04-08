/** importing essential libraries and files **/
import express from 'express';
import { connect } from 'mongoose';
import router from './routers/router';
import getRouter from './routers/get';
import addRouter from './routers/add';
import editRouter from './routers/edit';
import cookieParser from 'cookie-parser';
import serverProps from './config/config';
import Logging from './lib/Logging';
const { db, server } = serverProps;

/** Connecting to database **/
connect(db)
   .then(() => {
      Logging.info(`connected to database`);
      startServer();
   })
   .catch((err) => {
      Logging.error(`could not connected to database`);
      Logging.error(err);
   });

const startServer = () => {
   const app = express();
   const { port } = server;

   /** Logging midddleware **/
   app.use((req, res, next) => {
      const { url } = req;
      Logging.info(`Requesting Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}]`);
      res.on('finish', () => {
         Logging.info(`Responding Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}] status:[${res.statusCode}]`);
      });
      next();
   });

   /** Essential middleware **/
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(cookieParser());

   /** Api rules **/
   app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method === 'OPTIONS') {
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
      }
      next();
   });

   /** Routes **/
   app.use('/', router);
   app.use('/get', getRouter);
   app.use('/add', addRouter);
   app.use('/edit', editRouter);

   /** Healthcheck **/
   app.get('/work', (req, res) => {
      res.status(200).json({ message: 'working' });
   });

   /** 404 error **/
   app.use((req, res) => {
      Logging.error(`[404]: Method:[${req.method}] ${req.url} not found`);
   });
   app.listen(port, () => Logging.info(`listening at port number ${port}`));
};

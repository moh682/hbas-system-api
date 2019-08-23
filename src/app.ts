import express, { Application, NextFunction, Response, Request } from 'express';
import cors, { CorsOptions } from 'cors';
import colors from 'colors';
import bodyParser from 'body-parser';
import * as ENV from 'dotenv';

import dbConnector from './models/dbConnector';
dbConnector.connect((error) => {
   if (error) console.log('Mysql Connection Error: '.red, error);
   console.log(colors.green('Mysql Connection have been established'));
});

import IndexController from './controllers/IndexController';
import AuthController from './controllers/AuthController';

import AuthenticationService from './services/AuthenticationService';
let authService = new AuthenticationService();

let env: any;
if (ENV.config().parsed) env = ENV.config().parsed;

// let corsConfig = {
//    origin: ["http://localhost", "localhost", "localhost:3000", "http://localhost:3000"],
//    allowedHeaders: ["authToken", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Origin", "Content-Type"],
//    credentials: true
// } as CorsOptions
const app: Application = express();
// app.use(cors(corsConfig));
const ALLOWED_ORIGINS = [
   'http://localhost:3000/',
   'http://www.localhost:8000/'
]

app.use((req: Request, res: Response, next: NextFunction) => {
   console.log(req.headers);
   if (ALLOWED_ORIGINS.indexOf(req.headers.origin as string) > -1) {
      res.set('Access-Control-Allow-Credentials', 'true')
      res.set('Access-Control-Allow-Origin', req.headers["access-control-allow-origin"])
      next();
   } else {
      res.set('Access-Control-Allow-Credentials', 'true')
      next()
   }
})

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', AuthController);

// authention needed
app.use(authService.authenticate);
app.use('/', IndexController);
// app.use('/invoice', invoiceRouter)

app.listen(env.PORT ? env.PORT : 8181, () => console.log(`Running on port: ${env.PORT ? env.PORT : 8181} `));
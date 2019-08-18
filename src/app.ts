import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as ENV from 'dotenv';
import logger from './logger';

import mysql from 'mysql';
import dbConnector from './models/dbConnector';
dbConnector.connect();

import IndexController from './controllers/IndexController';
// import loginRouter from './api/loginRouter';
import AuthController from './controllers/AuthController';


let env: any;
if (ENV.config().parsed) env = ENV.config().parsed;


const app: Application = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/auth', AuthController);

// authention needed
// app.use(authenticate);
app.use('/', IndexController);
// app.use('/invoice', invoiceRouter)

app.listen(env.PORT ? env.PORT : 8181, () => console.log(`Running on port: ${env.PORT ? env.PORT : 8181} `));
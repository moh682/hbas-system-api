import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as ENV from 'dotenv';

import dbConnector from './models/dbConnector';
dbConnector.connect();

import IndexController from './controllers/IndexController';
import AuthController from './controllers/AuthController';

import AuthenticationService from './services/AuthenticationService';
let authService = new AuthenticationService();


let env: any;
if (ENV.config().parsed) env = ENV.config().parsed;


const app: Application = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/auth', AuthController);

// authention needed
app.use(authService.authenticate);
app.use('/', IndexController);
// app.use('/invoice', invoiceRouter)

app.listen(env.PORT ? env.PORT : 8181, () => console.log(`Running on port: ${env.PORT ? env.PORT : 8181} `));
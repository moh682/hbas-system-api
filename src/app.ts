import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as ENV from 'dotenv';
import { DEV_URI } from './settings';
import connect from './dbConnector';

connect(DEV_URI);
let env: any;
if (ENV.config().parsed) env = ENV.config().parsed;

import indexRouter from './routes/indexRouter';
import loginRouter from './routes/loginRouter';
import invoiceRouter from './routes/invoiceRouter';
// import userRouter from './routes/userRouter';

import { authenticate } from './authentication/AuthenticationService';

const app: Application = express();
app.use(bodyParser.json());

app.use(cors());
// root access
app.use('/', indexRouter);
// unauthenticated permissions
app.use('/login', loginRouter);

// authenticated permissions
app.use('/invoice', authenticate, invoiceRouter)


app.listen(env.PORT ? env.PORT : 8181, () => console.log(`Running on port: ${env.PORT ? env.PORT : 8181} `));
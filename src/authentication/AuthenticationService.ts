import { Request, Response, NextFunction } from 'express';
import jwtToken from 'jsonwebtoken';
import { getUserByName, addUser } from '../db/userFacade'

import * as dotenv from 'dotenv'
let env: any = dotenv.config().parsed
import logger from '../logger';
import { secret } from '../settings';
import { IUser, ICreateUserInput, IUserDatabaseOutput } from '../interfaces/IUser';
import { compare } from 'bcrypt';
import UserModel from '../models/UserModel';

let authenticate = (request: Request, response: Response, next: NextFunction) => {
   let token: string | undefined;
   token = request.headers['hbas_authentication'] as string;
   if (!token) response.sendStatus(403);
   if ((typeof token) === 'string') {
      let obj: any;
      obj = jwtToken.verify(token as string, env.SECRET, (error: any, string: any) => {
         if (error) {
            console.log(error);
            switch (error.message) {
               case 'invalid signature':
                  response.sendStatus(400);
                  break;
               default:
                  logger.error(error);
                  response.sendStatus(401)
                  break;
            }
         };
         return string;
      })
      if (obj) {
         next();
      }
   }
}

const login = async (username: string, password: string): Promise<string | undefined> => {
   let user: IUserDatabaseOutput;
   let token;

   user = await getUserByName(username).catch(err => { console.log(err); return err; });
   console.log('user: ', user);
   if (user) {
      let correct: boolean = await comparePassword(password, user.password);
      console.log('isCorrectPassword --> ', correct);
      if (correct) {
         // todo: CREATE TOKEN
         token = await createToken({
            user: {
               email: user.email,
               username: user.username,
               role: user.role
            }
         });
      } else {
         logFailedAttempt(user, { username, password });
      }
      return Promise.resolve(token);
   }
};

let register = async (user: ICreateUserInput): Promise<string | undefined> => {
   let token: string | undefined = undefined;
   let exist: boolean = await UserModel.exists({ username: user.username })
   if (!exist) {
      await addUser(user);
      token = createToken({
         username: user.username,
      });
   }
   return Promise.resolve(token);
}

let createToken = (content: any): string => {
   let token: string = "";
   token = jwtToken.sign(content, env.SECRET, {
      expiresIn: '12h',
   })
   return token;
}

const logFailedAttempt = (user: any, userInput: { username: string; password: string }): void => {
   let { username, password } = userInput;
   logger.log(
      'info',
      JSON.stringify({
         user: JSON.stringify({ id: user.id, username: user.username, email: user.email }),
         msg: 'Incorrect Login Credentials',
         input: JSON.stringify({ username, password })
      })
   );
};

const comparePassword = async (userPassword: string, dbPassword: string): Promise<boolean> => {
   return new Promise<boolean>(async (resolve, reject) => {
      return compare(userPassword, dbPassword, (err, same) => {
         if (err) {
            return reject(err);
         }
         return resolve(same);
      });
   });
};

export {
   authenticate,
   login,
   register
}
import { Request, Response, NextFunction } from 'express';
import jwtToken, { decode } from 'jsonwebtoken';
import AccountMapper from '../models/dataMappers/Account.Mapper'
import ErrorHandlers from './ErrorHandlers';
import * as dotenv from 'dotenv'
let env: any = dotenv.config().parsed
import logger from '../logger';
import { compare } from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import bcrypt from 'bcrypt';

class AuthenticationService {

   private userMapper = new AccountMapper();

   constructor() { };

   public authenticate(request: Request, response: Response, next: NextFunction) {
      let token: string;
      token = request.headers['hbas_authentication'] as string;
      if (!token) response.sendStatus(403);
      if ((typeof token) === 'string') {
         let obj: any;
         obj = jwtToken.verify(token as string, env.SECRET, (error: any, string: any) => {
            if (error) {
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

   public login(user: IUser): Promise<string> {
      let password: string = user.password as string;
      let email: string = user.email as string;
      let thisInstace = this;
      return new Promise(
         async function (resolve, reject) {
            let user: IUser;
            let token: string = "";
            user = await thisInstace.userMapper.getAccountByEmail(email).catch(err => { console.log(err); return undefined as unknown as IUser; });
            if (user && user.email && user.password) {
               let correct: boolean = await thisInstace.comparePassword(password, user.password as string).catch(error => false);
               if (correct) {
                  token = thisInstace.createToken({
                     user: {
                        email: user.email,
                        role: user.role
                     }
                  });
               } else {
                  ErrorHandlers.logFailedAttempt(user, { email, password });
                  reject();
               }
               resolve(token);
            } else {
               resolve(token)
            }
         }
      )
   };

   public register = (user: IUser): Promise<string> => {
      let thisInstace = this;
      return new Promise(
         async function (resolve, reject) {
            let token: string = "";
            let exist: boolean = await thisInstace.userMapper.accountExist(user.email as string);
            if (!exist) {
               user.password = await thisInstace.encryptPassword(user.password as string).catch(() => { reject(); return undefined });
               let dbAccount = await thisInstace.userMapper.addAccount(user).catch((error) => { console.log(error); return undefined });
               if (dbAccount) {
                  token = thisInstace.createToken({
                     email: dbAccount.email,
                  });
               }
            }
            resolve(token);
         }
      )
   }

   public deleteAccount = (email: string): Promise<boolean> => {
      let thisInstace = this;
      return new Promise(
         async function (resolve, reject) {
            let confirmed: boolean = await thisInstace.userMapper.deleteAccount(email).catch((error) => { reject(error); return false });
            if (confirmed) {
               resolve(true);
            } resolve(false);
         })
   }

   private createToken = (content: any): string => {
      let token: string = "";
      token = jwtToken.sign(content, env.SECRET, {
         expiresIn: '12h',
      })
      return token;
   }

   private encryptPassword(password: string): Promise<string> {
      return new Promise(
         function (resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {
               if (err) return logger.error(err)
               bcrypt.hash(password, salt, (error, hash) => {
                  if (error) { console.log(error); reject() }
                  resolve(hash);
               });
            });
         }
      )
   }

   private comparePassword = async (userPassword: string, dbPassword: string): Promise<boolean> => {
      return new Promise<boolean>(async (resolve, reject) => {
         return compare(userPassword, dbPassword, (err, same) => {
            if (err) {
               return reject(err);
            }
            return resolve(same);
         });
      });
   };

   // //  verifyAccount = async (token: string) => {
   // //    // verify token in session
   // // }

   public getObjectFromToken(token: string) {
      let payload: any = decode(token, { json: true });
      if (payload) {
         return payload;
      }
      return undefined;
   }

}

export default AuthenticationService;
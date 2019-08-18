import dbConnector from '../dbConnector';
import mysql from 'mysql';
import { IUser } from '../../interfaces/IUser';
import ErrorHandler from '../../services/ErrorHandlers';

export default class UserMapper {
   private connection: mysql.Connection;
   constructor() {
      this.connection = dbConnector;
   }

   public async getAllUSers(): Promise<IUser[]> {
      let thisInstance = this;
      return new Promise(
         function (resolve, reject) {
            let users: IUser[] = [];
            let sqlOptions: mysql.QueryOptions = {
               sql: "SELECT * FROM users"
            }
            try {
               thisInstance.connection.query(sqlOptions,
                  function (error, result, fields) {
                     if (error) {
                        ErrorHandler.mySqlQueryErrorHandler(error.name, __filename, error);
                        return reject();
                     }
                     users = result;
                     return resolve(users);
                  }
               )
            } catch (exception) {
               ErrorHandler.mySqlQueryErrorHandler(exception.name, __filename, exception);
            }
         }
      )
   }

   public addUser(user: IUser): Promise<IUser> {
      let thisInstance = this;
      return new Promise(
         function (resolve, reject) {
            user.role = user.role ? user.role : "user";
            let sqlOptions: mysql.QueryOptions = {
               sql: "INSERT INTO users (password, email, role) VALUES (?, ?, ?)",
               values: [user.password, user.email, user.role]
            };
            try {
               thisInstance.connection.query(sqlOptions,
                  function (error, result, fields) {
                     if (error) {
                        ErrorHandler.mySqlQueryErrorHandler(error.name, __filename, error);
                        reject();
                     } else {
                        user.password = undefined;
                        resolve(user);
                     }
                  })
            } catch (exception) {
               console.log(exception);
            }
         })
   }

   public async UserExist(email: string): Promise<boolean> {
      let thisInstance = this;
      return new Promise(
         async function (resolve, reject) {
            let sqlOptions: mysql.QueryOptions = {
               sql: "SELECT 1 FROM users WHERE email=?",
               values: [email]
            }
            try {
               await thisInstance.connection.query(sqlOptions,
                  function (error, result, fields) {
                     if (error) { console.log(error); reject(); }

                     if (result && result.length !== 0) {
                        resolve(true);
                     } else {
                        resolve(false);
                     }
                  }
               )
            } catch (exception) {
               console.log(exception);
            }
         }
      )
   }

   public async getUserByEmail(email: string): Promise<IUser> {
      let thisInstance = this;
      return new Promise(
         async function (resolve, reject) {
            let user;
            let sqlOptions: mysql.QueryOptions = {
               sql: "SELECT 1 FROM users WHERE email=?;",
               values: [email]
            }
            try {
               await thisInstance.connection.query(sqlOptions,
                  function (error, result, fields) {
                     if (error) { console.log(error); reject(); }
                     if (result !== null) {
                        user = result;
                        resolve(user);
                     }
                  }
               )
            } catch (exception) {
               console.log(exception);
            }
         }
      )
   }
}

import mysql, { Connection } from 'mysql';
import { IUser } from '../../interfaces/IUser';
import ErrorHandler from '../../services/ErrorHandlers';
import { getPool } from '../dbConnector';
import { connect } from 'tls';

export default class AccountMapper {

   public async getAllAccounts(): Promise<IUser[]> {
      let thisInstance = this;
      return new Promise(
         function (resolve, reject) {
            let users: IUser[] = [];
            let sqlOptions: mysql.QueryOptions = {
               sql: "SELECT * FROM users"
            }
            try {
               getPool().getConnection((error, connection) => {
                  if (error) console.log(error);
                  connection.query(sqlOptions,
                     function (error, result, fields) {
                        if (error) {
                           ErrorHandler.mySqlQueryErrorHandler(error.name, __filename, error);
                           return reject();
                        }
                        users = result;
                        return resolve(users);
                     })
                  connection.release();
               })
            } catch (exception) {
               ErrorHandler.mySqlQueryErrorHandler(exception.name, __filename, exception);
            }
         }
      )
   }

   public deleteAccount(email: string): Promise<boolean> {
      let thisInstance = this;
      return new Promise(
         async function (resolve, reject) {
            let sqlOptions: mysql.QueryOptions = {
               sql: "DELETE FROM users WHERE email=?",
               values: [email]
            };
            let doesExist = await thisInstance.accountExist(email);
            if (doesExist) {
               try {
                  getPool().getConnection(async (error, connection) => {
                     if (error) console.log(error);
                     await connection.query(
                        sqlOptions,
                        function (error, result, fields) {
                           if (error) {
                              ErrorHandler.logDeleteAttempt(error.name, __filename, error, email);
                              reject();
                           } else {
                              resolve(true);
                           }
                        }
                     )
                     connection.release();
                  })
               } catch (exception) {
                  ErrorHandler.mySqlQueryErrorHandler('DeleteUser', __filename, exception);
                  reject();
               }
            } else {
               resolve(false);
            }
         })
   }

   public addAccount(user: IUser): Promise<IUser> {
      return new Promise(
         async function (resolve, reject) {
            user.role = user.role ? user.role : "user";
            let sqlOptions: mysql.QueryOptions = {
               sql: "INSERT INTO users (password, email, role) VALUES (?, ?, ?)",
               values: [user.password, user.email, user.role]
            };
            try {
               await getPool().getConnection(
                  async (error, connection) => {
                     if (error) console.log(error);
                     await connection.query(sqlOptions,
                        function (error, result, fields) {
                           if (error) {
                              ErrorHandler.mySqlQueryErrorHandler(error.name, __filename, error);
                              reject();
                           } else {
                              user.password = undefined;
                              resolve(user);
                           }
                        })
                     connection.release();
                  }
               )
            } catch (exception) {
               console.log(exception);
            }
         })
   }

   public async accountExist(email: string): Promise<boolean> {
      let thisInstance = this;
      return new Promise(
         async function (resolve, reject) {
            let sqlOptions: mysql.QueryOptions = {
               sql: "SELECT * FROM users WHERE email=?",
               values: [email]
            }
            try {
               getPool().getConnection(
                  async (error, connection) => {
                     if (error) console.log(error);
                     await connection.query(sqlOptions,
                        function (error, result, fields) {
                           if (error) { console.log(error); reject(); }

                           if (result && result.length !== 0) {
                              resolve(true);
                           } else {
                              resolve(false);
                           }
                        }
                     )
                     connection.release();
                  }
               )
            } catch (exception) {
               console.log(exception);
            }
         }
      )
   }

   public async getAccountByEmail(email: string): Promise<IUser> {
      let thisInstance = this;
      return new Promise(
         async function (resolve, reject) {
            let user;
            let sqlOptions: mysql.QueryOptions = {
               sql: "SELECT * FROM users WHERE email=?",
               values: [email]
            }
            try {
               getPool().getConnection(
                  async (error, connection) => {
                     if (error) console.log(error);
                     await connection.query(sqlOptions,
                        function (error, result, fields) {
                           if (error) { console.log(error); reject(); }
                           if (result && result.length !== 0) {
                              user = result[0];
                              resolve(user);
                           } else {
                              resolve(undefined);
                           }
                        }
                     )
                     connection.release();
                  }
               )
            } catch (exception) {
               console.log(exception);
            }
         }
      )
   }
}

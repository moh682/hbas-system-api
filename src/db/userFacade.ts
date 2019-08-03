import colors from 'colors';
import User from '../models/UserModel';
import { IUser, IUserDatabaseOutput, ICreateUserInput } from '../interfaces/IUser';
import logger from '../logger';
import { DeepPartial, Document, Mongoose } from 'mongoose';
import { Resolver } from 'dns';

// let getUsers = async (): Promise<IUser[]> => {
//    let user: IUser[];
//    let dbUsers: any[];
//    try {
//       User.find({}, (error, result) => {
//          if (error) console.log(error);
//          console.log(result);
//       })
//    } catch (err) {
//       console.log(colors.red(err))
//    }
//    return user as;
// }

let getUserByName = async (username: string): Promise<IUserDatabaseOutput> => {
   let user = await User.findOne({
      username
   }, (error, result) => {
      if (error) { console.log(error); return Promise.reject(error) };
      return result;
   });
   return Promise.resolve(user as unknown as IUserDatabaseOutput);
}

let addUser = (credentials: ICreateUserInput): Promise<IUserDatabaseOutput> => {
   return new Promise((resolve, reject) => {
      return new User((credentials as DeepPartial<Document>)).save((err, user) => {
         if (err) { logger.error(err); return reject(err); }
         return resolve({
            id: user.get('id'),
            username: user.get('username'),
            email: user.get('email'),
            role: user.get('role'),
            password: user.get('password')
         });
      });
   })
}

export {
   getUserByName,
   addUser
}
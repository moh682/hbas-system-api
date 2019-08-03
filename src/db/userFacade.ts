import colors from 'colors';
import User from '../models/UserModel';
import { IUser, IUserDatabaseOutput, ICreateUserInput } from '../interfaces/IUser';
import logger from '../logger';
import { DeepPartial, Document } from 'mongoose';

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

let addUser = (credentials: ICreateUserInput) => {
   new User(credentials as DeepPartial<Document>).save({}, (err, user) => {
      if (err) console.log(err);
      console.log(user);
      return user;
   }).catch((error) => {
      return undefined;
   });
}

export {
   getUserByName,
   addUser
}
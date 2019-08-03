"use strict";
// import userMapper from '../db/userMapper';
// const { getAllUsers: getAllUsersFromDB, getUser, createUser } = userMapper;
// import { IUser, IUserRegistration } from '../interfaces';
// import logger from '../logger';
// import bcrypt from 'bcrypt';
// const { hash } = bcrypt;
// // const getAllUsers = async (): Promise<IUser[]> => {
// // 	let users: Array<IUser> = [];
// // 	try {
// // 		users = await getAllUsersFromDB();
// // 		return users;
// // 	} catch (err) {
// // 		return users;
// // 	}
// // };
// /**
//  * 
//  * @param user User to be created
//  */
// const addUser = async (user: IUserRegistration): Promise<IUser> => {
// 	try {
// 		user.password = await encrypt(user.password);
// 		var dbUser = await createUser(user).catch((err) => {
// 			throw new Error(err);
// 		});
// 		return dbUser;
// 	} catch (err) {
// 		return Promise.reject(err);
// 	}
// };
// /**
//  * Used in 
//  * - facade/userFacade.ts
//  * 
//  * @param password password to be encrypted
//  */
// const encrypt = async (password: string): Promise<string> => {
// 	let encrypted = await new Promise<string>((resolve) => {
// 		hash(password, 10, (err: Error, encrypted: string) => {
// 			if (err) {
// 				logger.log('error', JSON.stringify(err));
// 				throw new Error('bcrypt');
// 			}
// 			return resolve(encrypted);
// 		});
// 	});
// 	return Promise.resolve(encrypted);
// };
// export {
// 	// getAllUsers,
// 	addUser
// };

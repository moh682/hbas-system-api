import mongoose from 'mongoose';

export interface IUser {
   username: string;
   password: string;
}

export interface ICreateUserInput {
   username: string;
   password: string;
   email: string;
}

export interface IUserDatabaseOutput {
   id: string;
   username: IUser['username'];
   password: IUser['password'];
   email: string;
   role: string;
}
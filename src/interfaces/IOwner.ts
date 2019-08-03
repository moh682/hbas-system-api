import mongoose from "mongoose";

export interface IOwner {
   id?: mongoose.Types.ObjectId;
   name: string;
   address: string;
   email: string;
   zip: number;
   phone: number;
}
import mongoose from 'mongoose';

export interface IPart {
   id?: mongoose.Types.ObjectId;
   description: string;
   productId: string;
   price: number;
   amount: number;
}
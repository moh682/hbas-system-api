import mongoose from 'mongoose';

export interface IPayment {
   id?: mongoose.Types.ObjectId;
   method: 'cash' | 'card';
   date: Date;
   price: number;
}
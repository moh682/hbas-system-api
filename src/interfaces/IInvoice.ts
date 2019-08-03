import mongoose from 'mongoose';
import { IOwner } from './IOwner';
import { IPart } from './IPart';
import { IPayment } from './IPayment';

export interface IInvoice {
   id?: mongoose.Types.ObjectId;
   hours: number;
   owners?: IOwner[];
   parts?: IPart[];
   price: number;
   payments: IPayment[];
}
import mongoose from 'mongoose';
import InvoiceSchema from '../models/InvoiceModel';
import { IInvoice } from '../interfaces/IInvoice';
import { getUserByName } from './userFacade';
import UserModel from '../models/UserModel';

// Create An invoice

let addInvoiceToUser = (username: string, invoice: IInvoice) => {
   // get something uniquely generated to be saved for authentication
   let updatedUser = UserModel.updateOne({
      username
   }, {
      $push: {
         invoice
      }
      }, {
         new: true
      })
   console.log(updatedUser);
}

// Get an Invoice
// update an Invoice
// delete an Invoice
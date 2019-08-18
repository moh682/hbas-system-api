// import mongoose from 'mongoose';
// import InvoiceSchema from '../models/InvoiceModel';
// import { IInvoice } from '../interfaces/IInvoice';
// import { getUserByName } from './userFacade';
// import UserModel from '../models/UserModel';

// // Create An invoice

// let addInvoiceToUser = async (username: string, invoice: IInvoice) => {
//    console.log('addInvoiceToUser --> ');
//    // get something uniquely generated to be saved for authentication
//    let updatedUser = await UserModel.updateOne({
//       username
//    }, {
//          $push: {
//             invoices: invoice
//          }
//       }, {
//          new: true
//       }, (err, data) => {
//          if (err) console.log(err);
//          console.log(data);
//          return data;
//       });
//    console.log(updatedUser);
// }

// // Get an Invoice
// // update an Invoice
// // delete an Invoice

// export {
//    addInvoiceToUser
// };
import mongoose, { HookNextFunction, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import * as bcrypt from 'bcrypt';
import logger from '../logger';
import InvoiceModel from './InvoiceModel';
let Schema = mongoose.Schema;

const UserSchema = new Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   role: { type: String, default: 'user' },
   invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }]
})

// Before saving the user, hash the password
UserSchema.pre('save', function (next) {
   const user: IUser = this as unknown as IUser;
   bcrypt.genSalt(10, (err, salt) => {
      if (err) return logger.error(err)
      bcrypt.hash(user.password, salt, (error, hash) => {
         if (error) { return next(error); }
         user.password = hash;
         next();
      });
   });
});

export default mongoose.model('User', UserSchema);
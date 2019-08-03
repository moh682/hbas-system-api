import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let OwnerModel = new Schema({
   name: { type: String },
   address: { type: String },
   email: { type: String },
   zip: Number,
   phone: Number
})

export default mongoose.model('Owner', OwnerModel);
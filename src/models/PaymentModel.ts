import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PaymentModel = new Schema({
   method: { type: String, enum: ['cash', 'card'], required: true },
   amount: { type: Number, required: true },
   date: { type: Date, default: Date.now }
})

export default mongoose.model('Payment', PaymentModel);
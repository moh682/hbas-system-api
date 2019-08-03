import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let InvoiceModel = new Schema({
   hours: { type: Number, required: true, default: 0 },
   price: { type: Number, required: true },
   owners: [{ type: Schema.Types.ObjectId, ref: 'Owner', required: true }],
   parts: [{ type: Schema.Types.ObjectId, ref: "Part" }],
   payment: [{ type: Schema.Types.ObjectId, ref: "Payment", required: true }],
   created: { Type: Date, default: Date.now }
});

export default mongoose.model('Invoice', InvoiceModel);
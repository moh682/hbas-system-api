import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PartModel = new Schema({
   price: { type: Number, required: true },
   amount: { type: Number, default: 1 },
   productId: { type: String, required: true },
   description: { type: String }
})

export default mongoose.model('Part', PartModel);
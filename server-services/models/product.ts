import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String },
    codeProduct: { type: String },
    description: { type: String },
    price: { type: Number },
    colour: { type: String },
    amount: { type: String }
}, {
    collection: 'products'
});

export default mongoose.model('Product', Product);

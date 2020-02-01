import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String },
    codeProduct: { type: String },
    description: { type: String },
    colour: { type: String },
    img: { type: String },
    additionalImg: [String],
    category: { type: String },
    trademark: { type: String },
    useFor: [String],
    extraInformation: [String],
    extraDescription: [String],
    price: { type: Number },
    bought: { type: Number },
    amount: { type: Number },
    date: { type: Date }
}, {
    collection: 'products'
});

export default mongoose.model('Product', Product);

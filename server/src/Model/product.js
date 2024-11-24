const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Name: String,
    ProductType: String,
    Describe: String,
    Image: String,
    Price: Number,
    PriceSale: Number,
    Quantity: Number,
    CloudId: String
},
{ timestamps: true }
);

export const ProductModel = mongoose.model('product', ProductSchema);
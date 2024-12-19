const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    User: String,
    ProductId: String
},
{ timestamps: true }
);

export const WishModels = mongoose.model('wishmodels', WishSchema);
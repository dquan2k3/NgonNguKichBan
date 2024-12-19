const mongoose = require('mongoose');

const RateScchema = new mongoose.Schema({
    Rate: Number,
    Detail: String,
    User: String,
    ProductId: String
},
{ timestamps: true }
);

export const RateModels = mongoose.model('ratemodels', RateScchema);
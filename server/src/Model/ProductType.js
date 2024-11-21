const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema({
    Name: String,
    Describe: String
});

export const ProductTypeModel = mongoose.model('productTypes', ProductTypeSchema);
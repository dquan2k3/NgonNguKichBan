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

ProductSchema.pre('save', function (next) {
    if (!this.PriceSale) {
      this.PriceSale = this.Price; // Gán PriceSale bằng Price nếu không có giá trị
    }
    next();
  });

export const ProductModel = mongoose.model('product', ProductSchema);
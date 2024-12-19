const mongoose = require('mongoose');
const unidecode = require('unidecode');

const ProductSchema = new mongoose.Schema({
  Name: String,
  NameToSearch: String,
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
  const NameToSearch1 = unidecode(this.Name).toLowerCase();
  this.NameToSearch = NameToSearch1 

  if (!this.PriceSale || this.PriceSale>this.Price) {
    this.PriceSale = this.Price; // Gán PriceSale bằng Price nếu không có giá trị
  }
  next();
});

export const ProductModel = mongoose.model('product', ProductSchema);
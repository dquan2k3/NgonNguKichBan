const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    name: { type: String, required: true },
    productType: { type: String },
    describe: { type: String },
    image: { type: String },
    price: { type: Number },
    priceSale: { type: Number },
    amount: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
    User: String,
    Address: String,
    Account: { type: String, default: 'None' },
    Total: { type: Number, default: 0 },
    Items: [CartItemSchema],
    isDone: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

CartSchema.pre('save', function (next) {
    const cart = this;

    // Tính tổng tiền (giá sale x số lượng) cho từng item
    cart.Total = cart.Items.reduce((sum, item) => {
        const itemTotal = (item.priceSale || 0) * (item.amount || 0); // Sử dụng giá giảm, nếu không có thì 0
        return sum + itemTotal;
    }, 0);

    next();
});

module.exports = mongoose.model('Cart', CartSchema);
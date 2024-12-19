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
    Giamgia: Number,
    Account: { type: String, default: 'None' },
    Total: { type: Number, default: 0 },
    Items: [CartItemSchema],
    isDone: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

CartSchema.pre('save', function (next) {
    const cart = this;
    console.log('cart', cart)

    // Tính tổng tiền (giá sale x số lượng) cho từng item, sau đó áp dụng giảm giá
    cart.Total = cart.Items.reduce((sum, item) => {
        let itemTotal = (item.priceSale || 0) * (item.amount || 0); // Tính tổng tiền trước giảm giá
        let discountAmount = itemTotal * (cart.Giamgia || 0) / 100; // Tính số tiền giảm giá nếu có (hoặc 0 nếu không có giảm giá)
        let totalAfterDiscount = itemTotal - discountAmount; // Tổng tiền sau khi trừ giảm giá
        console.log("itemTotal", itemTotal, "discountAmount", discountAmount, 'totalAfterDiscount', totalAfterDiscount, 'Giamgia', cart.Giamgia)
        return sum + totalAfterDiscount; // Cộng vào tổng của giỏ hàng
    }, 0);

    next();
});

module.exports = mongoose.model('Cart', CartSchema);
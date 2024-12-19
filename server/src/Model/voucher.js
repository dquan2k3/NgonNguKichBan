const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    Name: String,
    Phantram: Number,
    Date: Date
});

voucherSchema.pre('save', function (next) {
    if (this.Date) {
        const date = new Date(this.Date);
        date.setUTCHours(23, 59, 59, 999);
        this.Date = date;
    }
    next();
});

export const VoucherModel = mongoose.model('vouchers', voucherSchema);

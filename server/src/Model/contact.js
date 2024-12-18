const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Thongtin: String,
    isRead: { type: Boolean, default: false }
},
{ timestamps: true }
);

export const ContactModel = mongoose.model('contact', ContactSchema);
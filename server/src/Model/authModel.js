const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    Account: String,
    Password: String,
    Role: { type: String, default: 'User' }
});

export const accountModel = mongoose.model('accounts', authSchema);
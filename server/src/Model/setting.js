const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    Type: String,
    Url: String,
    CloudId: String
});

export const SettingModel = mongoose.model('settingModels', SettingSchema);
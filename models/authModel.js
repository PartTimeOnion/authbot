const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    passwordToDecrypt: String,
    passwordKey: String,
    isVerified: Boolean
});

module.exports = mongoose.model('userAuth', authSchema)
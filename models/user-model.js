const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {ROLES} = require('../utils/utilities');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER,
    },
    avatarPath: {
        type: String
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


const User = mongoose.model('User', userSchema);

module.exports = User;
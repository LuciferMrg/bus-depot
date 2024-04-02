const jwt = require('jsonwebtoken');

const tokenModel = require('../models/token-model');


exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME});
}

exports.validateToken = (refreshToken) => {
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
        return null;
    }
}

exports.saveToken = async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken});
    return token;
}

exports.removeToken = async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({refreshToken});
    return Boolean(tokenData?.deletedCount);
}

exports.findToken = async (refreshToken) => {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData;
}

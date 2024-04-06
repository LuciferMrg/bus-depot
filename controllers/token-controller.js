const jwt = require('jsonwebtoken');

const tokenModel = require('../models/token-model');


exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TIME});
}

exports.validateToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

exports.saveToken = async (userId, accessToken) => {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
        tokenData.accessToken = accessToken;
        return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, accessToken});
    return token;
}

exports.removeToken = async (accessToken) => {
    const tokenData = await tokenModel.deleteOne({accessToken});
    return Boolean(tokenData?.deletedCount);
}

exports.findToken = async (accessToken) => {
    const tokenData = await tokenModel.findOne({accessToken});
    return tokenData;
}

exports.tokenToCookie = (accessToken) => {
    return ['accessToken', accessToken, {httpOnly: true}];
}

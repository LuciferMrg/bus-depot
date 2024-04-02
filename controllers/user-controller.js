const TokenController = require('../controllers/token-controller');

const UserModel = require('../models/user-model');
const TokenModel = require('../models/token-model');

const UserDto = require("../dtos/user-dto");
const ErrorHandler = require('../utils/error-handler');

exports.register = async (username, password) => {
    try {
        const user = await UserModel.create({
            username,
            password
        });
    } catch (error) {
        throw ErrorHandler.BadRequest("A user with the same name already exists.");
    }
    const userDto = new UserDto(user);

    const refreshToken = TokenController.generateToken({...userDto});
    await TokenController.saveToken(userDto.id, refreshToken);

    return {
        token: ['refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}],
        user: userDto
    };
};


exports.login = async (username, password) => {

    const user = await UserModel.findOne({username});

    if (!user) throw ErrorHandler.BadRequest('Wrong login or password.');

    const isValidPass = await user.comparePassword(password);

    if (!isValidPass) throw ErrorHandler.BadRequest('Wrong login or password.');
    const userDto = new UserDto(user);

    const refreshToken = TokenController.generateToken({...userDto});
    await TokenController.saveToken(userDto.id, refreshToken);

    return {
        token: ['refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}],
        user: userDto
    };
}

exports.logout = async (refreshToken) => {
    const removedToken = await TokenController.removeToken(refreshToken);
    if (!removedToken) throw ErrorHandler.BadRequest('Error logging out');
    return {removedToken};
}

exports.refresh = async (refreshToken) => {
    const userData = TokenController.validateToken(refreshToken);
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);

    const token = TokenController.generateToken({...userDto});
    await TokenController.saveToken(userDto.id, token);

    return {
        token: ['refreshToken', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}],
        user: userDto
    };
}

exports.getAllUsers = async () => {
    const users = await UserModel.find();
    return users.map((x) => new UserDto(x));
}


exports.getUser = async (refreshToken) => {
    const user = await TokenModel.findOne({refreshToken}).populate('user');

    if (!user) throw ErrorHandler.NotFound('UserModel is not found.');

    const userDto = new UserDto(user.user);
    return userDto;
};
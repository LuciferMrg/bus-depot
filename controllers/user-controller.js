const TokenController = require('../controllers/token-controller');

const UserModel = require('../models/user-model');
const TokenModel = require('../models/token-model');

const {UserDto, comparePassword} = require("../utils/utilities");
const ErrorHandler = require('../utils/error-handler');

exports.register = async (username, password) => {
    const user = await UserModel
        .create({
            username,
            password,
        }).catch((error) => {
            throw ErrorHandler.BadRequest("A user with the same name already exists.", error);
        });
    const userDto = new UserDto(user);

    const accessToken = TokenController.generateToken({...userDto});
    await TokenController.saveToken(userDto._id, accessToken);

    return {
        token: TokenController.tokenToCookie(accessToken),
        user: userDto,
    };
};


exports.login = async (username, password) => {

    const user = await UserModel.findOne({username});

    if (!user) throw ErrorHandler.BadRequest('Wrong login or password.');

    const isValidPass = await comparePassword(password, user.password);

    if (!isValidPass) throw ErrorHandler.BadRequest('Wrong login or password.');
    const userDto = new UserDto(user);

    const accessToken = TokenController.generateToken({...userDto});
    await TokenController.saveToken(userDto._id, accessToken);

    return {
        token: TokenController.tokenToCookie(accessToken),
        user: userDto,
    };
};

exports.logout = async (accessToken) => {
    const removedToken = await TokenController.removeToken(accessToken);
    if (!removedToken) throw ErrorHandler.BadRequest('Error logging out');
    return {removedToken};
};

exports.refresh = async (accessToken) => {
    const userData = TokenController.validateToken(accessToken);
    const user = await UserModel.findById(userData._id);
    const userDto = new UserDto(user);

    const token = TokenController.generateToken({...userDto});
    await TokenController.saveToken(userDto._id, token);

    return {
        token: TokenController.tokenToCookie(accessToken),
        user: userDto,
    };
};

exports.getAllUsers = async () => {
    const users = await UserModel.find();
    return users.map((x) => new UserDto(x));
};


exports.getUser = async (accessToken) => {
    const token = await TokenModel
        .findOne({accessToken})
        .populate('user');

    if (!token) throw ErrorHandler.NotFound('User is not found.');

    const userDto = new UserDto(token.user);
    return {
        ...userDto,
        // filePath: token.user.avatarPath || null,
    };
};

exports.updateUser = async (accessToken, avatar) => {
    const token = await TokenModel
        .findOne({accessToken})
        .populate('user');

    if (!token) throw ErrorHandler.NotFound('User is not found.');

    const userId = token.user.id;

    const user = await UserModel
        .findByIdAndUpdate(userId, {
            avatarPath: avatar.path,
        }, {
            new: true,
        }).catch((error) => {
            throw ErrorHandler.BadRequest('User is not found.', error);
        });

    return user;
};
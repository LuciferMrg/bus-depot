module.exports = class UserDto {
    username;
    roles;
    id;

    constructor(model) {
        this.username = model.username;
        this.roles = model.roles;
        this.id = model._id;
    }
}
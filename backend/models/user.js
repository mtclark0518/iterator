const bcrypt = require('bcrypt-nodejs')
module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
        }
    });
    model.prototype.hash = password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };
    model.prototype.validPassword = function(attempted, encrypted) {
        return bcrypt.compareSync(attempted, encrypted);
    };
    return model
}

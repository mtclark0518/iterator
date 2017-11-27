const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://TheTDrive@localhost:5432/mischiefmanaged' )
const Example = sequelize.import('./example')
const User = sequelize.import('./user')
const Op = Sequelize.Op;

Example.hasMany(User, {as: 'ActiveUsers'});
User.belongsTo(Example);

const db = {};
db.models = {
    Example,
    User
}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
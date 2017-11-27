const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://TheTDrive@localhost:5432/mischiefmanaged' )
const Example = sequelize.import('./example')
const User = sequelize.import('./user')
const Op = Sequelize.Op;

Example.belongsToMany(User, {
    through: 'ActiveUsers'
}
);
User.hasOne(Example);

const db = {};
db.models = {
    Example,
    User
}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
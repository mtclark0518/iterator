const localDB = require('../../local.env')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || localDB )
const container = sequelize.import('./container')
const user = sequelize.import('./user')


container.hasMany(user);
user.belongsTo(container, { as: 'activeUsers', foreignKey: 'containerId' } );

const db = {}
db.models = {
    container,
    user
}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
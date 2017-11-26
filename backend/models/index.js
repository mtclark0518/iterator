const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://TheTDrive@localhost:5432/mischiefmanaged' )
const Container = sequelize.import('./container')
const User = sequelize.import('./user')


Container.hasMany(User);

const db = {}
db.models = {
    Container,
    User
}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
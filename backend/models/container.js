module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('container', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: Sequelize.INTEGER
        },
        activeUsers: {
            type: Sequelize.INTEGER
        }
    });
    return model
}

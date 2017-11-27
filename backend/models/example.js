module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('Example', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER
        }
    });
    return model
}

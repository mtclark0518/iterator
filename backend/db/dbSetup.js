/*
 *  Setup the db (init the tables to default/empty )
 */
var Sequelize = require('sequelize');
var db = require('../models/index');

db.sequelize.sync({ force: true }).then(function() {
    process.exit();
});
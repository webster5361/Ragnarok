const Sequelize = require('sequelize');
const Database = require('../PostgreSQL');
const database = new Database();

let Warning = database.db.define('warnings', {
	userID: Sequelize.STRING,
	name: Sequelize.STRING,
	adminID: Sequelize.STRING,
	guildID: Sequelize.STRING,
	reason: Sequelize.STRING,
	expDate: Sequelize.DATE
});

Warning.sync();

module.exports = Warning;

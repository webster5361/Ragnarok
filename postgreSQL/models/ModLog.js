const Sequelize = require('sequelize');
const Database = require('../PostgreSQL');
const database = new Database();

let ModLog = database.db.define('modlog', {
	caseNumber: {
		type: Sequelize.INTEGER,
		autoIncrement: true
	},
	action: Sequelize.STRING,
	reason: {
		type: Sequelize.STRING,
		allowNull: true
	},
	guildID: Sequelize.STRING,
	offenderID: Sequelize.STRING,
	adminID: Sequelize.STRING
});

ModLog.sync();

module.exports = ModLog;

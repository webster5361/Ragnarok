const Sequelize = require('sequelize');
const winston = require('winston');
const log = require('../functions/log.js');
const db = require('../settings').db;

class Database {
	constructor() {
		this.database = new Sequelize(db, { logging: false });
	}

	get db() {
		return this.database;
	}

	start() {
		this.database.authenticate()
			.then(() => {
				const logger = 'Connection has been established successfully.';
				winston.info(log(logger, 'log'));
			})
			.catch(err => {
				const logger = `Unable to connect to the database: ${err}`;
				winston.error(log(logger, 'log'));
			});
	}
}

module.exports = Database;

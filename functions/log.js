const moment = require('moment');
const chalk = require('chalk');
const clk = new chalk.constructor({ enabled: true });

module.exports = (data, type = 'log') => {
	switch (type.toLowerCase()) {
		case 'debug':
			return `${clk.bgMagenta(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${data}`;
		case 'warn':
			return `${clk.black.bgYellow(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${data}`;
		case 'error':
			return `${clk.bgRed(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${data}`;
		case 'log':
			return `${clk.bgBlue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${data}`;
		case 'success':
			return `${clk.bgGreen(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${data}`;
		default:
			return null;
	}
};

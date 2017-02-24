const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class AboutCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'about',
			group: 'info',
			memberName: 'about',
			description: 'Displays information about the command framework.',
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		return msg.embed({
			color: 3447003,
			description: stripIndents`
        __**Ragnarok**__
				COMING SOON

        __**Support**__
        https://discord.gg/WtfPDYQ

			`
		});
	}
};

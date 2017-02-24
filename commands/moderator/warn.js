const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const modLog = require('../../config.json');

module.exports = class WarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			group: 'moderator',
			memberName: 'warn',
			description: 'Warns a specified user for a specific reason.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: 'what user would you like to warn?\n',
					type: 'member'
				},

				{
					key: 'reason',
					prompt: 'why do you want to warn this user?\n',
					type: 'string',
					validate: value => {
						if (value.length > 130) {
							return `
								your message was ${value.length} characters long.
								Please limit your personal message to 130 characters.
							`;
						}
						return true;
					}
				}
			]
		});
	}

	async run(msg, args) {
		// let admin = msg.author;
		let user = args.member;
		let reason = args.reason;

		// let modLogs = modLog.logsChannel;
		// let modLogs = client.channels.find('name', modLog.logsChannel);
		let modLogs = this.client.channels.find('name', modLog.logsChannel);
		if (!modLogs) return msg.reply('I cannot find mod-logs');
		const embed = new Discord.RichEmbed()
			.setTitle('WARNED')
			.setAuthor(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`, msg.author.avatarURL)
			.setThumbnail(msg.author.avatarURL)
			.setColor('#fed039')
			.setTimestamp()
			.addField('**User Warned**:', `${user.user.username}#${user.user.discriminator} (${user.id})`)
			.addField('**Reason**:', reason);
		return modLogs.sendEmbed(embed);
	}
};

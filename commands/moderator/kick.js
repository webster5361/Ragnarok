const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const modLog = require('../../config.json');

module.exports = class WarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderator',
			memberName: 'kick',
			description: 'Kicks a specified user for a specific reason.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: 'what user would you like to kick?\n',
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

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
		let user = args.member;
		let reason = args.reason;
		let modLogs = this.client.channels.find('name', modLog.logsChannel);
		if (!modLogs) return msg.reply('I cannot find mod-logs');

		user.sendMessage(`You have been kicked from **${msg.guild.name}** for '${reason}'`);
		user.kick();
		msg.reply(`${user.user.username}#${user.user.discriminator} was successfully kicked from the server.`);

		const embed = new Discord.RichEmbed()
			.setTitle('KICKED')
			.setAuthor(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`, msg.author.avatarURL)
			.setThumbnail(msg.author.avatarURL)
			.setColor('#fe6d39')
			.setTimestamp()
			.addField('**User Kicked**:', `${user.user.username}#${user.user.discriminator} (${user.id})`)
			.addField('**Reason**:', reason);
		return modLogs.sendEmbed(embed);
	}
};

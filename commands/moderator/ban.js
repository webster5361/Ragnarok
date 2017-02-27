const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Config = require('../../config.json');

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderator',
			memberName: 'ban',
			description: 'Bans a specified user for a specific reason.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: 'what user would you like to ban?\n',
					type: 'member'
				},

				{
					key: 'reason',
					prompt: 'why do you want to ban this user?\n',
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
		let modLogs = this.client.channels.find('name', Config.logsChannel);
		if (!modLogs) return msg.reply('I cannot find mod-logs');

		user.sendMessage(`You have been banned from **${msg.guild.name}** for '${reason}'`);
		user.ban();

		const embed = new Discord.RichEmbed()
			.setTitle('BANNED')
			.setAuthor(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`, msg.author.avatarURL)
			.setThumbnail(msg.author.avatarURL)
			.setColor(Config.modLogError)
			.setTimestamp()
			.addField('**User Banned**:', `${user.user.username}#${user.user.discriminator} (${user.id})`)
			.addField('**Guild**:', `${msg.guild.name} (${msg.guild.id})`)
			.addField('**Reason**:', reason);
		user.sendEmbed(embed);
		return modLogs.sendEmbed(embed);
	}
};

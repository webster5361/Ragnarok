const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Config = require('../../config.json');
// const ML = require('../../postgreSQL/models/ModLog');

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
		let user = args.member;
		let reason = args.reason;
		let modLogs = this.client.channels.find('name', Config.logsChannel);
		// let action = 'WARNED';
		// let guildName = msg.guild.name;
		// let guildID = msg.guild.id;
		// let offenderName = `${user.user.username}#${user.user.discriminator}`;
		// let offenderID = user.id;
		// let adminName = `${msg.author.username}#${msg.author.discriminator}`;
		// let adminID = msg.author.id;
		if (!modLogs) return msg.reply('I cannot find mod-logs');

		const embed = new Discord.RichEmbed()
			.setTitle('WARNED')
			.setAuthor(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`, msg.author.avatarURL)
			.setThumbnail(msg.author.avatarURL)
			.setColor(Config.modLogWarn)
			.setTimestamp()
			.addField('**User Warned**:', `${user.user.username}#${user.user.discriminator} (${user.id})`)
			.addField('**Guild**:', `${msg.guild.name} (${msg.guild.id})`)
			.addField('**Reason**:', reason);
		user.sendEmbed(embed);
		return modLogs.sendEmbed(embed);

		// return ML.create({
		// 	action,
		// 	reason,
		// 	guildName,
		// 	guildID,
		// 	offenderName,
		// 	offenderID,
		// 	adminName,
		// 	adminID
		// }).then(newWarning => {
		// 	return msg.reply(`the warning to  ${newWarning.offenderName} has been successfully issued!`);
		// });
	}
};

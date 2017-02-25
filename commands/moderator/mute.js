const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Config = require('../../config.json');

module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'moderator',
			memberName: 'mute',
			description: 'Mutes a specified user for a specific reason.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: 'what user would you like to mute?\n',
					type: 'member'
				},

				{
					key: 'reason',
					prompt: 'why do you want to mute this user?\n',
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
		let mutedRoleName = Config.muteRole;

		const mutedRole = this.client.guilds.get(msg.guild.id).roles.find('name', `${mutedRoleName}`);
		if (!mutedRole) return msg.reply('I can not find the muted role.');

		let modLogs = this.client.channels.find('name', Config.logsChannel);
		if (!modLogs) return msg.reply('I cannot find mod-logs');

		msg.guild.member(user).addRole(mutedRole);

		const embed = new Discord.RichEmbed()
			.setTitle('MUTED')
			.setAuthor(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`, msg.author.avatarURL)
			.setThumbnail(msg.author.avatarURL)
			.setColor('#fed039')
			.setTimestamp()
			.addField('**User Muted**:', `${user.user.username}#${user.user.discriminator} (${user.id})`)
			.addField('**Guild**:', `${msg.guild.name} (${msg.guild.id})`)
			.addField('**Reason**:', reason);
		user.sendEmbed(embed);
		return modLogs.sendEmbed(embed);
	}
};

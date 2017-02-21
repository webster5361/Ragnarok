const { Command } = require('discord.js-commando');

const Currency = require('../../currency/Currency');

module.exports = class MoneyRemoveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'remove-money',
			aliases: [
				'money-remove',
				'remove-donut',
				'remove-gems',
				'remove-doughnut',
				'remove-doughnuts',
				'donut-remove',
				'gems-remove',
				'doughnut-remove',
				'doughnuts-remove'
			],
			group: 'economy',
			memberName: 'remove',
			description: `Remove ${Currency.textPlural} from a certain user.`,
			details: `Remove amount of ${Currency.textPlural} from a certain user.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: `what user would you like to remove ${Currency.textPlural} from?\n`,
					type: 'member'
				},
				{
					key: 'gems',
					label: 'amount of gems to remove',
					prompt: `how many ${Currency.textPlural} do you want to remove from that user?\n`,
					type: 'integer'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
		const user = args.member;
		const gems = args.gems;

		Currency.removeBalance(user.id, gems);

		return msg.reply(`successfully removed ${Currency.convert(gems)} from ${user.displayName}'s balance.`);
	}
};

const { Command } = require('discord.js-commando');

const Currency = require('../../currency/Currency');

module.exports = class MoneyAddCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'add-money',
			aliases: [
				'money-add',
				'add-donut',
				'add-gems',
				'add-diamond',
				'add-diamonds',
				'donut-add',
				'gems-add',
				'diamond-add',
				'diamonds-add'
			],
			group: 'economy',
			memberName: 'add',
			description: `Add ${Currency.textPlural} to a certain user.`,
			details: `Add amount of ${Currency.textPlural} to a certain user.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					prompt: `what user would you like to give ${Currency.textPlural}?\n`,
					type: 'member'
				},
				{
					key: 'gems',
					label: 'amount of gems to add',
					prompt: `how many ${Currency.textPlural} do you want to give that user?\n`,
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

		Currency.addBalance(user.id, gems);

		return msg.reply(`successfully added ${Currency.convert(gems)} to ${user.displayName}'s balance.`);
	}
};

const { Command } = require('discord.js-commando');

const Currency = require('../../currency/Currency');

module.exports = class MoneyRemoveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'remove-money',
			aliases: [
				'money-remove',
				`${Currency.textSingular}-remove`,
				`${Currency.textPlural}-remove`,
				`remove-${Currency.textSingular}`,
				`remove-${Currency.textPlural}`
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
					key: 'currency',
					label: `amount of ${Currency.textPlural} to remove`,
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
		const currency = args.currency;

		Currency.removeBalance(user.id, currency);

		return msg.reply(`successfully removed ${Currency.convert(currency)} from ${user.displayName}'s balance.`);
	}
};

const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

const Currency = require('../../currency/Currency');
const Bank = require('../../currency/Bank');

module.exports = class DepositCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'deposit',
			group: 'economy',
			memberName: 'deposit',
			description: `Deposit ${Currency.textPlural} into the bank.`,
			details: `Deposit ${Currency.textPlural} into the bank.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'currency',
					label: `amount of ${Currency.textPlural} to deposit`,
					prompt: `how many ${Currency.textPlural} do you want to deposit?\n`,
					validate: currency => {
						return /^(?:\d+|-all|-a)$/g.test(currency);
					},
					parse: async (currency, msg) => {
						const balance = await Currency.getBalance(msg.author.id);

						if (currency === '-all' || currency === '-a') return parseInt(balance);
						return parseInt(currency);
					}
				}
			]
		});
	}

	async run(msg, args) {
		const currency = args.currency;

		if (currency <= 0) return msg.reply(`you can't deposit 0 or less ${Currency.convert(0)}.`);

		const userBalance = await Currency.getBalance(msg.author.id);

		if (userBalance < currency) {
			return msg.reply(stripIndents`
				you don't have that many ${Currency.textPlural} to deposit!
				You currently have ${Currency.convert(userBalance)} on hand.
			`);
		}

		Bank.deposit(msg.author.id, currency);

		return msg.reply(`successfully deposited ${Currency.convert(currency)} to the bank!`);
	}
};

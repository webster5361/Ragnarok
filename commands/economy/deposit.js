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
					key: 'gems',
					label: 'amount of gems to deposit',
					prompt: `how many ${Currency.textPlural} do you want to deposit?\n`,
					validate: gems => {
						return /^(?:\d+|-all|-a)$/g.test(gems);
					},
					parse: async (gems, msg) => {
						const balance = await Currency.getBalance(msg.author.id);

						if (gems === '-all' || gems === '-a') return parseInt(balance);
						return parseInt(gems);
					}
				}
			]
		});
	}

	async run(msg, args) {
		const gems = args.gems;

		if (gems <= 0) return msg.reply(`you can't deposit 0 or less ${Currency.convert(0)}.`);

		const userBalance = await Currency.getBalance(msg.author.id);

		if (userBalance < gems) {
			return msg.reply(stripIndents`
				you don't have that many ${Currency.textPlural} to deposit!
				You currently have ${Currency.convert(userBalance)} on hand.
			`);
		}

		Bank.deposit(msg.author.id, gems);

		return msg.reply(`successfully deposited ${Currency.convert(gems)} to the bank!`);
	}
};

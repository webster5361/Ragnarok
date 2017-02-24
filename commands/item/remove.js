const { Command } = require('discord.js-commando');
const Item = require('../../postgreSQL/models/Item');
const Store = require('../../currency/Store');

module.exports = class ItemAddCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'item-remove',
			aliases: ['remove-item'],
			group: 'item',
			memberName: 'remove',
			description: 'Removes an item to the store.',
			throttling: {
				details: 'Removes an item to the store.',
				usages: 2,
				duration: 3
			},

			args: [{
				key: 'name',
				prompt: 'what item should be removed?\n',
				type: 'string'
			}]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
		const name = args.name.toLowerCase();
		const item = Store.getItem(name);

		if (!item) return msg.reply('That item does not exist!');

		Store.getItems().delete(name);

		return Item.sync().then(() => {
			Item.destroy({ where: { name: item.name } });
			return msg.say(
				`The item **${name}** has been deleted, ${msg.author}`);
		});
	}
};

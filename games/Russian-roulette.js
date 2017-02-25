const games = new Map();

class RussianRoulette {
	constructor(guildID) {
		this.guildID = guildID;
		this.players = [];

		games.set(this.guildID, this);
	}

	join(user, currency) {
		this.players.push({
			user: user,
			currency: currency
		});

		games.set(this.guildID, this);
	}

	hasPlayer(userID) {
		return !!this.players.find(player => player.user.id === userID);
	}

	awaitPlayers(time) {
		return new Promise((resolve) => {
			setTimeout(() => {
				games.delete(this.guildID);

				return resolve(this.players);
			}, time);
		});
	}

	static findGame(guildID) {
		return games.get(guildID) || null;
	}
}

module.exports = RussianRoulette;

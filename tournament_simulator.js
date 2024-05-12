let name_database = [
		'Isabella',
		'Maxwell',
		'Ava',
		'Lucas',
		'Olivia',
		'Ethan',
		'Sophia',
		'Logan',
		'Mia',
		'Noah',
		'Charlotte',
		'Jackson',
		'Emma',
		'Aiden',
		'Amelia',
		'Elijah',
	],
	letters = [
		' A',
		' B',
		' C',
		' D',
		' E',
		' F',
		' G',
		' H',
		' I',
		' J',
		' K',
		' L',
		' M',
		' N',
		' O',
		' P',
		' Q',
		' R',
		' S',
		' T',
		' U',
		' V',
		' W',
		' X',
		' Y',
		' Z',
	],
	competitors = [];

function competitor(name, rating, seed) {
	this.name = name;
	this.rating = rating;
	this.seed = seed;
}

function get_random_int(min, max) {
	const MIN_CEILED = Math.ceil(min);
	const MAX_FLOORED = Math.floor(max);
	return Math.floor(Math.random() * (MAX_FLOORED - MIN_CEILED) + MIN_CEILED);
}

function create_competitors(name_database) {
	for (let i = 0; i < 16; i++) {
		competitors[i] = new competitor(
			name_database[get_random_int(0, 15)] + letters[get_random_int(0, 25)],
			get_random_int(0, 2000),
			null
		);
	}
}

function get_player_seed(competitors) {
	let ascending_ordered_players = competitors.slice();
	ascending_ordered_players.sort(function (a, b) {
		return a - b;
	});

	let descending_ordered_players = competitor.slice();
	descending_ordered_players.sort(function (a, b) {
		return b - a;
	});
	// TODO: Write code to give player's their seed number
}

create_competitors(name_database);
for (player of competitors) {
	console.log(player);
}

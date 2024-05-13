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

function generate_name(name_database, letters, competitors) {
	while (true) {
		let generated_name =
			name_database[get_random_int(0, 15)] + letters[get_random_int(0, 25)];
		if (check_for_duplicate_name(generated_name, competitors) == true) {
			break;
		} else {
			return generated_name;
		}
	}
}

function check_for_duplicate_name(generated_name, competitors) {
	for (player of competitors) {
		if (generated_name == player.name) {
			return true;
		} else {
			return false;
		}
	}
}

function create_competitors(name_database) {
	for (let i = 0; i < 16; i++) {
		competitors[i] = new competitor(
			generate_name(name_database, letters, competitors),
			get_random_int(0, 2000),
			null
		);
	}
}

function get_player_seed(competitors) {
	let ascending_ordered_players = competitors.slice();
	ascending_ordered_players.sort(function (high, low) {
		return high - low;
	});

	let descending_ordered_players = competitor.slice();
	descending_ordered_players.sort(function (high, low) {
		return low - high;
	});

	for (let seed_number = 0; seed_number < 16; seed_number++) {
		for (player of competitors) {
			for (asc_player of ascending_ordered_players) {
			}
		}
	}
}

create_competitors(name_database);
for (player of competitors) {
	console.log(player);
}

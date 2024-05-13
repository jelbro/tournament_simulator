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
	competitors = [],
	seeded_players = [];

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
	return false;
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
	let descending_ordered_players = competitors.slice();
	descending_ordered_players.sort(function (high, low) {
		return low.rating - high.rating;
	});

	let ascending_ordered_players = competitors.slice();
	ascending_ordered_players.sort(function (high, low) {
		return high.rating - low.rating;
	});
	console.log('\n');
	for (player of ascending_ordered_players) {
		console.log(player);
	}
	let seed_incrementer = 1;
	for (let index = 0; index < 8; index++) {
		seeded_players.push({
			name: ascending_ordered_players[index].name,
			rating: ascending_ordered_players[index].rating,
			seed: seed_incrementer,
		});
		seed_incrementer += 1;
		seeded_players.push({
			name: descending_ordered_players[index].name,
			rating: descending_ordered_players[index].rating,
			seed: seed_incrementer,
		});
		seed_incrementer += 1;
	}

	return seeded_players;
}

create_competitors(name_database);
for (player of competitors) {
	console.log(player);
}

seeded_players = get_player_seed(competitors);
console.log('\n');
for (player of seeded_players) {
	console.log(player);
}

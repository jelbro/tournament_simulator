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
	seeded_players = [],
	heats = [];

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

function create_heats_stage(seeded_players) {
	for (let index = 0; index < 16; index += 2) {
		heats.push({
			name: seeded_players[index].name,
			rating: seeded_players[index].rating,
			seed: seeded_players[index].seed,
		});
		heats.push({
			name: seeded_players[index + 1].name,
			rating: seeded_players[index + 1].rating,
			seed: seeded_players[index + 1].seed,
		});
	}
	display_heats_stage(heats);
}

function display_heats_stage(heats) {
	let round_number = 1;
	for (let heat = 0; heat < heats.length; heat += 2) {
		console.log(
			'Bracket ' +
				round_number +
				': ' +
				heats[heat].name +
				' vs ' +
				heats[heat + 1].name
		);
		round_number++;
	}
}

function get_player_roll(heats) {
	for (let index = 0; index < heats.length; index++) {
		heats[index].roll =
			get_random_int(0, 100) + Math.floor(heats[index].rating / 100);
	}
}

function determine_winner(heats) {
	get_player_roll(heats);
	for (player of heats) {
		console.log(player);
	}
}

create_competitors(name_database);
seeded_players = get_player_seed(competitors);
console.log('\n');
for (player of seeded_players) {
	console.log(player);
}
console.log('\n');
create_heats_stage(seeded_players);
determine_winner(heats);

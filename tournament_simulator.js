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
	heats = [],
	quarters = [],
	semis = [],
	losers = [],
	losers_results = [],
	finals = [],
	results = [];

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

function generate_name(name_database, letters, input_array) {
	while (true) {
		let generated_name =
			name_database[get_random_int(0, 15)] + letters[get_random_int(0, 25)];
		if (check_for_duplicate_name(generated_name, input_array) == true) {
			break;
		} else {
			return generated_name;
		}
	}
}

function check_for_duplicate_name(generated_name, input_array) {
	for (entry of input_array) {
		if (generated_name == entry.name) {
			return true;
		} else {
			return false;
		}
	}
	return false;
}

function create_competitors(name_database) {
	let output_array = [];
	for (let i = 0; i < 16; i++) {
		output_array[i] = new competitor(
			generate_name(name_database, letters, competitors),
			get_random_int(0, 2000),
			null
		);
	}
	return output_array;
}

function get_player_seed(input_array) {
	let seeded_array = [];
	let seed_incrementer = 1;
	let descending_ordered_players = input_array.slice();
	descending_ordered_players.sort(function (high, low) {
		return low.rating - high.rating;
	});

	let ascending_ordered_players = input_array.slice();
	ascending_ordered_players.sort(function (high, low) {
		return high.rating - low.rating;
	});
	for (let index = 0; index < 8; index++) {
		seeded_array.push({
			name: descending_ordered_players[index].name,
			rating: descending_ordered_players[index].rating,
			seed: seed_incrementer,
		});
		seed_incrementer += 1;
		seeded_array.push({
			name: ascending_ordered_players[index].name,
			rating: ascending_ordered_players[index].rating,
			seed: seed_incrementer,
		});
		seed_incrementer += 1;
	}

	return seeded_array;
}

function create_tournament_stage(seeded_array, round_name) {
	let output_array = [];
	console.log(round_name + ':\n');
	for (let index = 0; index < seeded_array.length; index += 2) {
		output_array.push({
			name: seeded_array[index].name,
			rating: seeded_array[index].rating,
			seed: seeded_array[index].seed,
		});
		output_array.push({
			name: seeded_array[index + 1].name,
			rating: seeded_array[index + 1].rating,
			seed: seeded_array[index + 1].seed,
		});
	}
	display_stage(output_array);
	return output_array;
}

function display_stage(input_array) {
	let round_number = 1;
	for (let heat = 0; heat < input_array.length; heat += 2) {
		console.log(
			'Bracket ' +
				round_number +
				': ' +
				input_array[heat].name +
				' vs ' +
				input_array[heat + 1].name
		);
		round_number++;
	}
}

function get_player_roll(input_array) {
	for (let index = 0; index < input_array.length; index++) {
		input_array[index].roll =
			get_random_int(0, 100) + Math.floor(input_array[index].rating / 100);
	}
}

function determine_winner(input_array, finals, losers_finals) {
	let output_array = [];
	get_player_roll(input_array);
	let round_number = 1;
	for (let index = 0; index < input_array.length; index += 2) {
		if (input_array[index].roll > input_array[index + 1].roll) {
			console.log(
				'The winner of bracket ' +
					round_number +
					' is ' +
					input_array[index].name +
					'! With a roll of ' +
					input_array[index].roll +
					' vs ' +
					input_array[index + 1].name +
					"'s roll of " +
					input_array[index + 1].roll
			);
			output_array.push({
				name: input_array[index].name,
				rating: input_array[index].rating,
				seed: input_array[index].seed,
			});
			if (finals) {
				losers.push({
					name: input_array[index + 1].name,
					rating: input_array[index + 1].rating,
					seed: input_array[index + 1].seed,
				});
			} else if (losers_finals) {
				output_array.push({
					name: input_array[index + 1].name,
					rating: input_array[index + 1].rating,
					seed: input_array[index + 1].seed,
				});
			}
			round_number++;
		} else {
			console.log(
				'A true underdog story! The winner of bracket ' +
					round_number +
					' is ' +
					input_array[index + 1].name +
					'! With a roll of ' +
					input_array[index + 1].roll +
					' vs ' +
					input_array[index].name +
					"'s roll of " +
					input_array[index].roll
			);
			output_array.push({
				name: input_array[index + 1].name,
				rating: input_array[index + 1].rating,
				seed: input_array[index + 1].seed,
			});
			if (finals) {
				losers.push({
					name: input_array[index].name,
					rating: input_array[index].rating,
					seed: input_array[index].seed,
				});
			} else if (losers_finals) {
				output_array.push({
					name: input_array[index].name,
					rating: input_array[index].rating,
					seed: input_array[index].seed,
				});
			}
			round_number++;
		}
	}
	return output_array;
}

function tournament_results(input_array) {
	console.log('The final results are in!');
	for (let position = 0; position < input_array.length; position++) {
		console.log(
			'In position ' + (position + 1) + ' ' + input_array[position].name
		);
	}
}

function combine_results(lower_result, higher_result) {
	output_array = [];
	for (let result of higher_result) {
		output_array.push(result);
	}
	for (let result of lower_result) {
		output_array.push(result);
	}
	return output_array;
}

competitors = create_competitors(name_database);
seeded_players = get_player_seed(competitors);
console.log('\n');
heats = create_tournament_stage(seeded_players, 'Heats Stage');
console.log('\n');
quarters = determine_winner(heats);
console.log('\n');
quarters = create_tournament_stage(quarters, 'Quarter Finals');
console.log('\n');
semis = determine_winner(quarters);
console.log('\n');
semis = create_tournament_stage(semis, 'Semi Finals');
console.log('\n');
finals = determine_winner(semis, true);
console.log('\n');
losers = create_tournament_stage(losers, 'Losers Finals');
losers_results = determine_winner(losers, false, true);
console.log('\n');
finals = create_tournament_stage(finals, 'Finals');

results = determine_winner(finals);
results = combine_results(losers_results, finals);
console.log('\n');
tournament_results(results);

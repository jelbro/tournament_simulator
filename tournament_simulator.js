const NUMBER_OF_PLAYERS = 16;

let names = [
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
	'Jason',
];
let letters = [
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
];
let competitors = [];
let seeded_players = [];
let heats = [];
let quarters = [];
let semis = [];
let losers = [];
let losers_results = [];
let finals = [];
let results = [];

/**
 *Competitor object, I think this hasn't been implemented properly throughout the code
 *
 * @param {string} name
 * @param {number} rating
 * @param {number} seed
 */
function competitor(name, rating, seed, roll) {
	this.name = name;
	this.rating = rating;
	this.seed = seed;
	this.roll = roll;
}

/**
 *Returns a random whole number between min and max
 *
 * @param {number} min generate numbers from this
 * @param {number} max generate numbers up to this
 * @return {number} returns a whole number between min and max
 */
function get_random_int(min, max) {
	const MIN_CEILED = Math.ceil(min);
	const MAX_FLOORED = Math.floor(max);
	return Math.floor(Math.random() * (MAX_FLOORED - MIN_CEILED) + MIN_CEILED);
}

/**
 *Generates a player name from inputted name and letter arrays. Loops until a non-duplicate name is found.
 *
 * @param {Array} name_array an array of names to generate from
 * @param {Array} letters an array of letters to generate from
 * @param {Array} current_names_array an array of including previously generated names
 * @return {string} a name that has been checked against previous generated names to not be a duplicate
 */
function generate_name(name_array, letter_array, current_names_array) {
	while (true) {
		let generated_name =
			name_array[get_random_int(0, name_array.length)] +
			letter_array[get_random_int(0, letter_array.length)];
		if (check_for_duplicate_name(generated_name, current_names_array)) {
			continue;
		} else {
			return generated_name;
		}
	}
}

/**
 *A function that tests if the given generated name exists within the array of previously generated names.
 *
 * @param {string} generated_name current generated name to check if is a duplicate
 * @param {Array} current_names_array
 * @return {boolean} True if the generated name exists already in the current names array
 */
function check_for_duplicate_name(generated_name, current_names_array) {
	for (let player of current_names_array) {
		if (generated_name === player.name) {
			return true;
		}
	}
	return false;
}

/**
 *Create's new competitor objects for the amount of players in the tournament.
 *
 * @param {Array} name_array of useable names to generate from
 * @param {Array} letters_array of useable letter's to append to names
 * @return {Array} An array of competitor objects
 */
function create_competitors(name_array, letters_array) {
	let competitors_array = [];
	for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
		competitors_array[i] = new competitor(
			generate_name(name_array, letters_array, competitors_array),
			get_random_int(0, 2000),
			null,
			null
		);
	}
	return competitors_array;
}

/**
 * Gives players a seed number based on their rating and then returns an array of players ordered by their seed number from high to low.
 *
 * @param {Array} players_to_be_seeded an array of players needing to be sorted and given seed numbers
 * @return {Array} returns an array of players sorted by their seed number.
 */
function get_player_seed(players_to_be_seeded) {
	let seeded_players = [];
	let seed_number = 1;
	let descending_ordered_players = order_array_by_rating(
		players_to_be_seeded,
		'desc'
	);
	let ascending_ordered_players = order_array_by_rating(
		players_to_be_seeded,
		'asc'
	);

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
		seed_number += 1;
	}

	return seeded_players;
}

/**
 *Sorts given array by rating, depending on the order string given. 'asc' or 'desc'
 *
 * @param {Array} input_array inputted array to be sorted
 * @param {String} order a string of either 'desc' or 'asc'
 * @return {Array} returns a sorted array depending on order string
 */
function order_array_by_rating(input_array, order) {
	let sorted_array = [];
	if ((order = 'desc')) {
		sorted_array = input_array.slice();
		sorted_array.sort(function (high, low) {
			return low.rating - high.rating;
		});
	} else if ((order = 'asc')) {
		sorted_array = input_array.slice();
		sorted_array.sort(function (high, low) {
			return high.rating - low.rating;
		});
	}
	return sorted_array;
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

competitors = create_competitors(names, letters, competitors);
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

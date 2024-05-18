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
let losing_players = [];
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
	let descending_ordered_players = [];
	descending_ordered_players = order_array_by_rating(
		players_to_be_seeded,
		'desc'
	);

	let ascending_ordered_players = [];
	ascending_ordered_players = order_array_by_rating(
		players_to_be_seeded,
		'asc'
	);

	for (let index = 0; index < 8; index++) {
		seeded_players.push({
			name: descending_ordered_players[index].name,
			rating: descending_ordered_players[index].rating,
			seed: seed_number,
		});
		seed_number += 1;
		seeded_players.push({
			name: ascending_ordered_players[index].name,
			rating: ascending_ordered_players[index].rating,
			seed: seed_number,
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
	if (order === 'desc') {
		sorted_array = input_array.slice();
		sorted_array.sort(function (high, low) {
			return low.rating - high.rating;
		});
	} else if (order === 'asc') {
		sorted_array = input_array.slice();
		sorted_array.sort(function (high, low) {
			return high.rating - low.rating;
		});
	}
	return sorted_array;
}

/**
 * Displays the round name in the console, sorts the seeded players into heats by putting two players into one heat.
 * And passes the heat sorted players to be displayed by display_stage().
 *
 * @param {Array} seeded_players array of players sorted by seed number
 * @param {String} round_name name of the round to be displayed
 * @return {Array} returns an array of players sorted into heats, two players per heat index.
 */
function create_tournament_stage(seeded_players, round_name) {
	let stage_brackets = [];
	console.log(round_name + ':\n');
	for (let index = 0; index < seeded_players.length; index += 2) {
		stage_brackets.push({
			name: seeded_players[index].name,
			rating: seeded_players[index].rating,
			seed: seeded_players[index].seed,
		});
		stage_brackets.push({
			name: seeded_players[index + 1].name,
			rating: seeded_players[index + 1].rating,
			seed: seeded_players[index + 1].seed,
		});
	}
	display_stage(stage_brackets);
	return stage_brackets;
}

/**
 *Display's the current stage brackets in the console.
 *
 * @param {Array} stage_brackets Player's sorted into brackets, two players per bracket.
 */
function display_stage(stage_brackets) {
	let round_number = 1;
	for (let bracket = 0; bracket < stage_brackets.length; bracket += 2) {
		console.log(
			'Bracket ' +
				round_number +
				': ' +
				stage_brackets[bracket].name +
				' vs ' +
				stage_brackets[bracket + 1].name
		);
		round_number++;
	}
}

/**
 *Function that compares the two players of the current brackets roll's
 *and determines who has won and returns that player to the array of player's in the next round
 *
 * @param {Array} currents_stage_players an array of players of the current stage e.g. the players in the semi-finals
 * @param {Boolean} is_finals a boolean value to determine if the current stage is the finals
 * @param {Boolean} losers_finals a boolean value to determine if the current stage is the losers_finals
 * @return {Array} returns an array of the player's that won their bracket in the current stage
 */
function determine_winner(input_array, finals, losers_finals) {
	let winning_players = [];
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
			winning_players.push({
				name: input_array[index].name,
				rating: input_array[index].rating,
				seed: input_array[index].seed,
			});
			if (finals) {
				losing_players.push({
					name: input_array[index + 1].name,
					rating: input_array[index + 1].rating,
					seed: input_array[index + 1].seed,
				});
			} else if (losers_finals) {
				winning_players.push({
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
			winning_players.push({
				name: input_array[index + 1].name,
				rating: input_array[index + 1].rating,
				seed: input_array[index + 1].seed,
			});
			if (finals) {
				losing_players.push({
					name: input_array[index].name,
					rating: input_array[index].rating,
					seed: input_array[index].seed,
				});
			} else if (losers_finals) {
				winning_players.push({
					name: input_array[index].name,
					rating: input_array[index].rating,
					seed: input_array[index].seed,
				});
			}
			round_number++;
		}
	}
	return winning_players;
}

/**
 * Assigns a new roll to the player.
 * The roll is summed with the player's rating divied by the rating weight (set to 100 by default)
 *
 * @param {Array} players
 */
function get_player_roll(players) {
	const RATING_WEIGHT = 100;
	for (let player = 0; player < players.length; player++) {
		players[player].roll =
			get_random_int(0, 100) +
			Math.floor(players[player].rating / RATING_WEIGHT);
	}
}

/**
 * Takes in an array of the top four players after the finals and loser's finals and displays them in order from 1st to 4th.
 *
 * @param {Array} tournament_results
 */
function disply_tournament_results(tournament_results) {
	console.log('The final results are in!');
	for (let position = 0; position < tournament_results.length; position++) {
		console.log(
			'In position ' + (position + 1) + ' ' + tournament_results[position].name
		);
	}
}

/**
 *Combines the results of the loser finals and the finals into the finals results array
 *
 * @param {Array} losers_finals_results an array of the the players that were in the losers finals ordered by who won
 * @param {Array} finals_results an array of the the players that were in the finals ordered by who won
 * @return {Array} an array of the finals_results and the losers_finals_results joined in order of place in the tournament overall
 */
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

/**
 *Creates a new line in the console
 *
 * @return {*}
 */
function new_line() {
	return console.log('\n');
}

function run_torunament(competitors) {}

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
losing_players = create_tournament_stage(losing_players, 'Losers Finals');
losers_results = determine_winner(losing_players, false, true);
console.log('\n');
finals = create_tournament_stage(finals, 'Finals');
results = determine_winner(finals);
results = combine_results(losers_results, finals);
console.log('\n');
disply_tournament_results(results);

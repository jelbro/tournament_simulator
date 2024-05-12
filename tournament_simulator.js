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
	competitors = [];

function competitor(name, rating, seed) {
	this.name = name;
	this.rating = rating;
	this.seed = seed;
}

function getRandomInt(min, max) {
	const MIN_CEILED = Math.ceil(min);
	const MAX_FLOORED = Math.floor(max);
	return Math.floor(Math.random() * (MAX_FLOORED - MIN_CEILED) + MIN_CEILED);
}

function create_competitors(name_database) {
	for (let i = 0; i < 16; i++) {
		random_name_number = getRandomInt(0, 15);
		random_rating_number = getRandomInt(0, 2000);
		competitors[i] = new competitor(
			name_database[getRandomInt(0, 15)],
			getRandomInt(0, 2000),
			null
		);
	}
}

create_competitors(name_database);
for (player of competitors) {
	console.log(player);
}

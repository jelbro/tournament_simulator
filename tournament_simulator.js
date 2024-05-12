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

function create_competitors(name_database) {
	let random_name_number;
	let random_rating_number;
	for (let i = 0; i < 16; i++) {
		random_name_number = Math.random() * 16;
		random_rating_number = Math.random() * 2000;
		competitors[i] = new competitor(
			name_database[random_name_number],
			random_rating_number,
			null
		);
	}
}

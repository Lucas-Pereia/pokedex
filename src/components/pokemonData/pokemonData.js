/* eslint-disable linebreak-style */
const generatePokemonList = (numPokemons) => {
	const types = ["grass", "fire", "water", "electric", "rock", "ground", "psychic", "fighting", "ghost"];
	const pokemonList = [];

	for (let i = 1; i <= numPokemons; i++){
		const randomType = types[Math.floor(Math.random() * types.length)];
		pokemonList.push({
			id: 1,
			name: `Pokemon ${i}`,
			type: randomType
		});
	} 

	return pokemonList;
};

const pokedexData = generatePokemonList(150);

export default pokedexData;
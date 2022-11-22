const pokeApi = {}

//Função para converter o modelo dos pokemons de origem para um modelo simplificado
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.base_experience = pokeDetail.base_experience

    return pokemon

}

//Função para fazer a segunda requisição na url de resposta 
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
//Função para comunicar com a PokeAPI
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    //Converter o resultado da requisição em um json
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

//Função para comunicar com a PokeAPI e receber os detalhes do pokemon para a página de info
pokeApi.getPokemonInfo = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
   //Converter o resultado da requisição em um json
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

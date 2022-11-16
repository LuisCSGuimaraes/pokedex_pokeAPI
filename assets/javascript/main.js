//Função para converter o response em uma li do html
function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">   
                <ol class="types">
                    <li class="type">grass</li>
                    <li class="type">poison</li>
                </ol>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>
        </li>

    `
}

//Capurar a ol do html
const pokemonList = document.getElementById("pokemonList")

/*Mapear o resultado json da requisição da PokeAPI, enviar para a função 
convertPokemonToHtml e dicionar ao HTML original as li concatenadas*/
pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('')
})


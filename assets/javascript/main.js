//Capturar a ol do html
const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
const maxRecord = 151
const limit = 10
let offset = 0

/*Mapear o resultado json da requisição da PokeAPI, enviar para a função 
convertPokemonToHtml e dicionar ao HTML original as li concatenadas*/
function loadPokemonItems(offset, limit){

    //Função para converter o response em uma li do html
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
                <a href="info.html?pokemon=${pokemon.number}">
                    <li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
        
                        <div class="detail">   
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}<li>`).join('')}
                            </ol>
        
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </li>
                </a>    
    
            `
        ).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordNextPage = offset + limit

    if (qtRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }    
})

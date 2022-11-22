//Capturar a span do html
const pokemonInfo = document.getElementById('info')

//Capturar o parâmetro da URL para ser utilizada nas requisições
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonID = urlParams.get('pokemon');

//Utilizar na função getPokemonInfo o ID único do pokemon capturado na URL e montar o HTML com as informações
function getPokemonData(pokemonID){
    pokeApi.getPokemonInfo(pokemonID).then((pokemon) => 
        pokemonInfo.innerHTML =
        `
                <li class="pkm-info ${pokemon.type}">

                <div class="back-and-heart">
                    <p><a id="return-link" href="index.html"><i class="arrow left"></i></a></p>
                    <div class="heart"></div>
                </div>

                <div class="number-name">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>

                </div>

                <div class="infos">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                    </ol>
                </div>
            </li>
            <li class="pkm-info-inferior">
                <img src=${pokemon.photo}
                alt=${pokemon.name}>
                <div class="pkm-detail">
                    <ol class="menu">
                        <span class="type">About</span>
                        <span class="type">Base stats</span>
                        <span class="type">evolution</span>
                        <span class="type">moves</span>
                    </ol>
                    <ol class="description">
                        <li class="description-name">
                            <span class="type">Base experience</span>
                            <span class="type">Abilities</span>
                        </li>
                        <li class="description-value">
                            <span class="type">${pokemon.base_experience}</span>

                            ${pokemon.abilities.map((ability) => `<span class="type ${ability}">${ability}</span>`).join('')}
                        </li>
                    </ol>    
                    <ol class="menu-2">
                        Body                   
                    </ol>
                    <ol class="description">
                        <li class="description-name">
                            <span class="type">Height</span>
                            <span class="type">weight</span>
                        </li>
                        <li class="description-value">
                            <span class="type">${pokemon.height}</span>
                            <span class="type">${pokemon.weight}</span>
                        </li>
                    </ol>
                </ol>

                </div>
                        
            </li>
        `)}

getPokemonData(pokemonID);
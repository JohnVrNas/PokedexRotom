const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const form = document.querySelector('.formulario');
const input = document.querySelector('.inputSearch');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const pokemonImage = document.querySelector('.pokemonImage');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = `../src/imagens/pokemons/poke_${data.id}.gif`;
        input.value = "";
        searchPokemon = data.id;

    } else {
        pokemonImage.src = "../src/imagens/pokemons/pokemonError.png";
        pokemonImage.style.dysplay = "none";
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
    }
}

// Envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const pokemonInput = input.value.toLowerCase(); // Converte a entrada para minúsculas

    // Verifica se a entrada é um número ou um nome
    if (!isNaN(pokemonInput)) {
        const pokemonNumberInput = parseInt(pokemonInput);
        if (pokemonNumberInput) {
            renderPokemon(pokemonNumberInput);
        } else {
            pokemonName.innerHTML = "Not found";
            pokemonNumber.innerHTML = "";
            pokemonImage.src = "../src/imagens/pokemons/pokemonError.png";
        }
    } else {
        renderPokemon(pokemonInput); // Passa o nome diretamente
    }

    input.value = '';
});

// Botões de passar e voltar de pokemon
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    if (searchPokemon < 706) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);
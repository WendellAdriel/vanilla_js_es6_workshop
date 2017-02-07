(function () {
  const formSection    = document.getElementById('form');
  const loadingSection = document.getElementById('loading');
  const resultSection  = document.getElementById('result');
  const searchSection  = document.getElementById('search-again');

  const nameInput         = document.getElementById('name');
  const searchButton      = document.getElementById('search-btn');
  const searchAgainButton = document.getElementById('search-again-btn');
  const pokemonImage      = document.getElementById('pokemon-img');
  const pokemonName       = document.getElementById('pokemon-name');
  const pokemonNumber     = document.getElementById('pokemon-number');
  const pokemonTypes      = document.getElementById('pokemon-types');

  const nameNotification    = document.getElementById('name-notification');
  const requestNotification = document.getElementById('req-notification');
  const requestErrorMessage = document.getElementById('req-error-msg');

  const API_PATH = 'https://pokeapi.co/api/v2/pokemon/';

  const init = () => {
    loadingSection.style.display      = 'none';
    resultSection.style.display       = 'none';
    searchSection.style.display       = 'none';
    nameNotification.style.display    = 'none';
    requestNotification.style.display = 'none';
    formSection.style.display         = 'block';
    nameInput.value                   = '';
  };

  const searchPokemon = () => {
    const pokemonSearchName = nameInput.value.trim().toLowerCase();

    if (!isValidName(pokemonSearchName)) {
      nameNotification.style.display = 'block';
      nameInput.className           += ' is-danger';
      return;
    }

    nameNotification.style.display = 'none';
    nameInput.className            = 'input is-expanded';
    makeRequest(pokemonSearchName);
  };

  const isValidName = pokemonSearchName => {
    if (pokemonSearchName.length === 0) {
      return false;
    }
    return true;
  };

  const makeRequest = pokemonSearchName => {
    const url = `${API_PATH}${pokemonSearchName}`;
    showLoading();

    fetch(url)
      .then(res => res.json())
      .then(res => showResult(res))
      .catch(error => showError(error));
  };

  const showLoading = () => {
    formSection.style.display    = 'none';
    loadingSection.style.display = 'block';
  };

  const showResult = response => {
    if (response.detail) {
      showError(`Pokemon ${response.detail}`);
      return;
    }
    pokemonName.innerHTML   = response.name.toUpperCase();
    pokemonNumber.innerHTML = `#${response.id}`;
    pokemonTypes.innerHTML  = buildTypesTags(response.types);
    pokemonImage.src        = response.sprites.front_default;

    loadingSection.style.display = 'none';
    resultSection.style.display  = 'block';
    searchSection.style.display  = 'block';
  };

  const buildTypesTags = types => {
    let typesTags = '';

    return types
      .map(type => type.type.name.toUpperCase())
      .reduce((template, type) => template += `<span class="tag">${type}</span>`, typesTags);
  };

  const showError = error => {
    requestErrorMessage.innerHTML     = error;
    loadingSection.style.display      = 'none';
    requestNotification.style.display = 'block';
    searchSection.style.display       = 'block';
  };

  init();
  searchButton.addEventListener('click', searchPokemon);
  searchAgainButton.addEventListener('click', init);
})();

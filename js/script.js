// Funcion para mostrar los pokemones
function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId
    }

    const div = $("<div>");
    $(div).addClass('pokemon');
    $(div).html(`
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-estadisticas">
                <p class="estadistica">${poke.height}m</p>
                <p class="estadistica">${poke.weight}kg</p>
            </div>
        </div>`
    );
    $(listaPokemon).append(div);
} 

// Elementos tomados HTML
const btn_filtrar = $('#btn-filtrar');
const menu_filtrar = $('#menu-filtrar');
const texto_filtrar = $('#texto-filtrar');
const listaPokemon = $('#listaPokemon');
const botonesHeader = $('.btn-header')

// Variable para saber al cargar la pagina en que estado se encuentra el nav
let oculto = true;

// Evento ocultar y mostrar menu filtrar
$(btn_filtrar).on("click", function () {
    
    oculto = !oculto
    
    oculto ? $(menu_filtrar).fadeOut() :
    $(menu_filtrar).fadeIn(), $(menu_filtrar).css('display', 'flex');

    $(texto_filtrar).text(oculto ? ' Filtrar' :
    ' Ocultar Filtrar');
});

//URL para traer la pokeAPI
let URL = "https://pokeapi.co/api/v2/pokemon/"

// Recorrer la URL API 151 veces para traaer a todos los pokemones
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

$.each(botonesHeader, function (index,boton) { 
    $(boton).on('click', function (e) {
        const botonId = e.currentTarget.id;

        $(listaPokemon).html("");
        
        for (let i = 1; i <= 151; i++) {
            fetch(URL + i)
                .then((response) => response.json())
                .then(data => {
                    if (botonId === "ver-todos") {
                        mostrarPokemon(data);
                    } else {
                        const tipos = data.types.map(type => type.type.name);
                        if (tipos.some(tipo => tipo.includes(botonId))) {
                            mostrarPokemon(data);
                    }
                }
            })
        }
    });
});
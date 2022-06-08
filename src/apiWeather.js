let ciudadClimaExtendido = new Map();


const getClima = () => {
    fetch('https://weatherservices.herokuapp.com/api/weather').then(function (response) {
    //fetch('src/pruebaClima.json').then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        elemento = document.getElementById("ciudades");
        nuevoElemento = '';
        for (let i = 0; i < data.items.length; i++) {
            ciudadClimaExtendido.set(data.items[i]._id, data.items[i]);
            nuevoElemento += agregarCardView(data.items[i]);
        }
        nuevoElemento += '';
        elemento.innerHTML = nuevoElemento;
        console.log(data.items[0]);
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

/**
 * Al abrir el modal, se llama a esta función para que actualice en la pantalla la informacion del modal
 * @param {*} idObjeto 
 */
const abrirModalId = (idObjeto) => {
    objetoClima = ciudadClimaExtendido.get(idObjeto);
    document.getElementById("modalTitle").innerHTML = objetoClima.name;
    elemento = document.getElementById("rowModal");
    nuevoElemento = '';

    let claves = Object.keys(objetoClima.forecast.forecast);
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        console.log(objetoClima.forecast.forecast[clave]);
        objetoClimaForecast = objetoClima.forecast.forecast[clave];
        nuevoElemento += agregarCardViewClimaExtendido(objetoClimaForecast);
    }
    elemento.innerHTML = nuevoElemento;
}

/**
 * Esta función tiene el código html para agregar una cardView al html.
 * Recibe como parametro un objeto con los datos del clima adentro.
 * @param {*} objetoClima 
 * @returns 
 */
const agregarCardView = (objetoClima) => {
    nuevoElemento = '';
    nuevoElemento += '<div class="col-sm-6 ">';
    nuevoElemento += '<div class="card">';
    nuevoElemento += '<div class="card-body">';
    nuevoElemento += '<h5 class="card-title"> ' + objetoClima.name + '</h5>';
    nuevoElemento += '<p class="card-text"><b>Descripción:</b> ' + objetoClima.weather.description + '</p>';
    nuevoElemento += '<p class="card-text"><b>Humedad:</b> ' + objetoClima.weather.humidity + '% </p>';
    nuevoElemento += '<p class="card-text"><b>Presión:</b> ' + objetoClima.weather.pressure + ' hectopascales</p>';
    // nuevoElemento += '<p class="card-text"><b>Sensación Térmica:</b> ' + objetoClima.weather.st + ' </p>';
    nuevoElemento += '<p class="card-text"><b>Visibilidad:</b> ' + objetoClima.weather.visibility + ' km </p>';
    nuevoElemento += '<p class="card-text"><b>Velocidad del viento:</b> ' + objetoClima.weather.wind_speed + ' km/h </p>';
    nuevoElemento += '<button onclick=(abrirModalId("' + objetoClima._id + '")) class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Pronóstico extendido</button>';
    nuevoElemento += '</div>';
    nuevoElemento += '</div>';
    nuevoElemento += '</div>';
    return nuevoElemento;
}

/**
 * Agrega una card view dentro del modal.
 * Recibe como parametro un objeto json con el clima de los proximos días.
 * @param {*} objetoClimaForecast 
 * @returns 
 */
const agregarCardViewClimaExtendido = (objetoClimaForecast) => {
    nuevoElemento = '';
    nuevoElemento += '<div class="col-sm-6">';
    nuevoElemento += '<div class="card">';
    nuevoElemento += '<div class="card-body">';
    nuevoElemento += '<h5 class="card-title"> ' + objetoClimaForecast.date + '</h5>';
    if (objetoClimaForecast.temp_min) {
        nuevoElemento += '<p class="card-text"><b>Temperatura mínima: </b> ' + objetoClimaForecast.temp_min + '°</p>';
    }
    if (objetoClimaForecast.temp_max) {
        nuevoElemento += '<p class="card-text"><b>Temperatura máxima: </b> ' + objetoClimaForecast.temp_max + '°</p>';
    }
    nuevoElemento += '<p class="card-text"><b>A la mañana: </b> ' + objetoClimaForecast.morning.description + ' </p>';
    nuevoElemento += '<p class="card-text"><b>A la tarde:</b> ' + objetoClimaForecast.afternoon.description + ' </p>';
    nuevoElemento += '</div>';
    nuevoElemento += '</div>';
    nuevoElemento += '</div>';
    return nuevoElemento;
}
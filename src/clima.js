let ciudadClimaExtendido = new Map();
let alertaMapa = new Map();


const getClima = () => {
    fetch('https://weatherservices.herokuapp.com/api/weather').then(function (response) {
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
    return `<div class="col-sm-6 cardCiudad">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title" style="text-align:center;">${objetoClima.name}</h3>
                        <div class="card-contenido">
                        <div class="row">
                            <div class="col-sm-6">
                                <h3 class="card-text titleTemperatura"><b></b> ${objetoClima.weather.temp}°</h3>
                                <p class="card-text subtitleDescripcion">${objetoClima.weather.description}</p>
                            </div>
                            <div class="col-sm-6">
                                <p class="card-text textDescriptionGray"><b>Humedad:</b> ${objetoClima.weather.humidity} % </p>
                                <p class="card-text textDescriptionWhite"><b>Presión:</b> ${objetoClima.weather.pressure} hectopascales</p>
                                <p class="card-text textDescriptionGray"><b>Visibilidad:</b> ${objetoClima.weather.visibility} km </p>
                                <p class="card-text textDescriptionWhite"><b>Velocidad del viento:</b>${objetoClima.weather.wind_speed} km/h </p>    
                                <button onclick=(abrirModalId("${objetoClima._id}")) class="btn btn-success btn100" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Pronóstico extendido</button>
                            </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>`;
}

/**
 * Agrega una card view dentro del modal.
 * Recibe como parametro un objeto json con el clima de los proximos días.
 * @param {*} objetoClimaForecast 
 * @returns 
 */
const agregarCardViewClimaExtendido = (objetoClimaForecast) => {
    cardview = `<div class="col-sm-4 cardModal">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title titleCardView"> ${objetoClimaForecast.date} </h5>`
    if (objetoClimaForecast.temp_min || objetoClimaForecast.temp_max) {
        cardview += `<div class="temperaturaCardView"><h5 style="text-align:center;">Temperaturas</h5>
                    <div class="row">`
        if (objetoClimaForecast.temp_min) {
            cardview += `<div class="col-sm-6">
            <p class="titleTemperaturaCardview">${objetoClimaForecast.temp_min}°</p>
            <p class="card-text subtitleDescripcionCardview"><b>mínima</b></p></div>`
        }
        if (objetoClimaForecast.temp_max) {
            cardview += `<div class="col-sm-6">
            <p class="titleTemperaturaCardview">${objetoClimaForecast.temp_max}°</p>
            <p class="card-text subtitleDescripcionCardview"><b>máxima</b></p></div>`
        }
        cardview += `</div></div>`
    }
    cardview += `<p class="card-text"><b>A la mañana: </b>${objetoClimaForecast.morning.description}</p>
                <p class="card-text"><b>A la tarde: </b>${objetoClimaForecast.afternoon.description}</p>
            </div>
        </div>
    </div>
    `;

    return cardview;
}

const getAlertas = () => {
    for (let i = 0; i < 4; i++) {
        fetch(`https://weatherservices.herokuapp.com/api/alerts/byDay/${i}`).then(function (response) {
            // The API call was successful!
            return response.json();
        }).then(function (data) {
            let cardView = generarCardViewAlertas(i, data);
            document.getElementById("alertas").innerHTML += cardView;
        }).catch(function (err) {

        });
    }
}

const generarCardViewAlertas = (numeroDia, alerta) => {
    return `<div class="col-sm-3 cardCiudad">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title" style="text-align:center;">Día número ${numeroDia + 1}</h3>
            <div class="card-contenido">
            ${agregarBotonAlerta(alerta)}
            </div>
        </div>
    </div>
</div>`;
}

const agregarBotonAlerta = (alerta) => {
    listaAlertas = alerta.alerts;
    nuevoElemento = "";
    listaAlertas.forEach(element => {
        alertaMapa.set(element._id, element);
        nuevoElemento += "<div><button type='button' onclick=(abrirModalAlerta('" + element._id + "')) class='btn btn-success btn100' data-bs-toggle='modal' data-bs-target='#modalAlerta'>" + element.title + "</button></div>";
    });
    return nuevoElemento;
}

const abrirModalAlerta = (idObjeto) => {
    alerta = alertaMapa.get(idObjeto);
    document.getElementById("modalAlertaTitle").innerHTML = alerta.title;
    elemento = document.getElementById("contenidoAlerta");
    nuevoElemento = `
    <div class="row" >
        <div class="col-sm-6">
            <p class="titleTemperaturaCardview">${alerta.date}</p>
            <p class="subtitleDescripcionCardview">Fecha</p>
        </div>
        <div class="col-sm-6">
            <p class="titleTemperaturaCardview">${alerta.hour}</p>
            <p class="subtitleDescripcionCardview">Hora</p>
        </div>
    </div>
    <p class="textDescriptionGray">${alerta.description}</p>
    <div>
        <h3>Zonas afectadas</h3>
        ${getZonasAfectadas(alerta.zones)}
    </div>
    `;
    elemento.innerHTML = nuevoElemento;
}

const getZonasAfectadas = (zonas) => {
    listaAlertas = alerta.alerts;
    nuevoElemento = "";
    let claves = Object.values(zonas);
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if(i%2==0){
            nuevoElemento+="<p class='textDescriptionGray'>"+clave+"</p>"
        }else{
            nuevoElemento+="<p class='textDescriptionWhite'>"+clave+"</p>"
        }
    }
    return nuevoElemento;
}
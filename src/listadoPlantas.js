const familiasDePlantas = `[
    {
        "familia":"Limonero",
        "imagen": "img/familias/limonero.jpg",
<<<<<<< HEAD
        "cantidad" : "30"
=======
        "cantidad":13
>>>>>>> 9ce9490729c601007886a1bcdf3a08d21574c487
    }, 
    {
        "familia":"Naranjo",
        "imagen": "img/familias/naranjo.jpg",
<<<<<<< HEAD
        "cantidad" : "15"
    }, {
        "familia":"Mandarino",
        "imagen": "img/familias/mandarino.jpg",
        "cantidad" : "66"
=======
        "cantidad":26
    }, {
        "familia":"Mandarino",
        "imagen": "img/familias/mandarino.jpg",
        "cantidad":39
>>>>>>> 9ce9490729c601007886a1bcdf3a08d21574c487
    }
    
]`;
window.onload = () => {
    const elem = document.getElementById("valorIngresado");
    elem.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') { // key code of the keybord key
            event.preventDefault();
            buscar();
        }
    });
}
let arregloPlantas = [];
const getListadoPlantas = () => {
    arregloPlantas = JSON.parse(familiasDePlantas);
    mostrarEnPantalla(arregloPlantas);
}

const mostrarEnPantalla = (lista) => {
    let listadoPantalla = document.getElementById("resultados");
    let nuevosCards = ``;
    lista.forEach(element => {
        nuevosCards += `<div class="card" style="width: 18rem;">
        <img src="${element.imagen}" class="card-img-top imagen" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.familia}</h5>
<<<<<<< HEAD
            <p class="card-text">Cantidad : ${element.cantidad}</p>
=======
            <p class="card-text">Cantidad disponible: ${element.cantidad}</p>
>>>>>>> 9ce9490729c601007886a1bcdf3a08d21574c487
            <!--<a href="#" class="btn btn-primary"></a>-->
        </div>
        </div>`
    });
    listadoPantalla.innerHTML = nuevosCards;
    if (lista.length === 0) {
        listadoPantalla.innerHTML = `<div class="alert alert-danger" role="alert">
        No se han encontrado resultados. Buscá con otro valor.
      </div>`
    }
}

const buscar = () => {
    const valorABuscar = document.getElementById("valorIngresado").value;
    const result = arregloPlantas.filter(familia => familia.familia.toLowerCase() == valorABuscar.toLowerCase());
    if (valorABuscar === "") {
        mostrarEnPantalla(arregloPlantas);
    } else {
        mostrarEnPantalla(result);
    }
}

const limpiar = () => {
    document.getElementById("valorIngresado").value = "";
    mostrarEnPantalla(arregloPlantas);
}


const familiasDePlantas =`[
    {
        "familia":"Limonero",
        "imagen": "img/familias/limonero.jpg"
    }, 
    {
        "familia":"Naranjo",
        "imagen": "img/familias/naranjo.jpg"
    }, {
        "familia":"Mandarino",
        "imagen": "img/familias/mandarino.jpg"
    }
    
]`;

let arregloPlantas= [];
const getListadoPlantas = () =>{
    arregloPlantas = JSON.parse(familiasDePlantas);
    mostrarEnPantalla(arregloPlantas);
}

const mostrarEnPantalla = (lista) => {
    let listadoPantalla = document.getElementById("resultados");
    let nuevosCards= ``;
    lista.forEach(element => {
        nuevosCards+=`<div class="card" style="width: 18rem;">
        <img src="${element.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.familia}</h5>
            <!--<p class="card-text">Arboles de limones</p>-->
            <!--<a href="#" class="btn btn-primary"></a>-->
        </div>
        </div>`
    });
    listadoPantalla.innerHTML=nuevosCards;
}

const buscar = () => {
    const valorABuscar = document.getElementById("valorIngresado").value;
    const result = arregloPlantas.filter(familia => familia.familia.toLowerCase()==valorABuscar.toLowerCase());
    if(valorABuscar===""){
        mostrarEnPantalla(arregloPlantas);
    }else{
        mostrarEnPantalla(result);
    }
    
}
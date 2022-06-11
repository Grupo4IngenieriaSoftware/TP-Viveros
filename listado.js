const renderListado = (valorIngresado) => {
    let familias = localStorage.getItem('familias');
    familias= JSON.parse(familias);
    let listado = document.getElementById("listado");
    familias.forEach(familia => {
        if(familia.nombreComun === valorIngresado){
             let div = document.createElement("div");
             div.classList.add("familia");
             div.innerHTML = 
             `<div class="col-md-4">
                 <div class="card">
                 <img class="card-img-top" src=${familia.imagen}>
                     <div class="card-body">
                         <h5 class="familiaListado">${familia.nombreComun}</h5>
                         <a href="#" class="btn btn-primary">Go somewhere</a>
                     </div>
                 </div>
             </div>`;
            listado.appendChild(div);
            console.log(familia.imagen);
        }     
        });
        
}

const buscarEnLocalStorage = (valorIngresado) => {
    let familias = localStorage.getItem('familias');
    familias= JSON.parse(familias);
    if(familias.filter(familia => familia.nombreComun === valorIngresado).length > 0){
        console.log("si existe");
        renderListado(valorIngresado)
        //pendiente
    }
}
window.onload = () => {
    const boton=document.getElementById("boton");
    boton.addEventListener("click",(evento)=>{
        evento.preventDefault();
        const valorIngresado=document.getElementById("valorIngresado").value;
        console.log(valorIngresado);
        buscarEnLocalStorage(valorIngresado);
    });
}            
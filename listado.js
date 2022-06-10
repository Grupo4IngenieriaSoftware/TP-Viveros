const buscarEnLocalStorage = (valorIngresado) => {
    let familias = localStorage.getItem('listado');
    familias= JSON.parse(familias);
    if(familias.filter(familia => familia === valorIngresado).length > 0){
        renderListado()
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
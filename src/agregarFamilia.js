const form= document.getElementById("formFamilia");

const cargarALocal=(valor)=>{
    if(localStorage.getItem("familias")===null){
        console.log("No hay familias");
        let array=[];
        array.push(valor);
        localStorage.setItem("familias",JSON.stringify(array)); 
        console.log(localStorage.getItem("familias"));
    }
    else{
        console.log("Hay familias");
        let arrayString=localStorage.getItem("familias");
        const array=JSON.parse(arrayString);
        array.push(valor);
        localStorage.setItem("familias",JSON.stringify(array));
    }
}
//Alerta familia cargada con exito
form.addEventListener("submit",(event)=>{
    const nombreComun= document.getElementById("nombreComun").value;
    cargarALocal(nombreComun);
    event.preventDefault();
    swal.fire({
    html:` <div class="container">
           <h3>¡La familia ha sido agregada con exito!</h3>
           <p>¿Qué deseás hacer?</p>
           <a href="agregar-familia.html" class="btn btn-success">Agregar otra familia</a>
           <a href="agregar-planta.html" class="btn btn-success">Agregar planta</a>
           <a href="listado-plantas.html" class="btn btn-success">Visualizar todas</a>
           </div>`
   })

})  
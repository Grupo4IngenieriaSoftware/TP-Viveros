const form= document.getElementById("formFamilia");

//variables para el id de las imagenes y para guardar la url de imagen
let idImagen=0;
let UrlImagen=""

//Obtengo referencia al archivo y a la imagen
const fotoParticular= document.getElementById("fotoParticular");
const imagenPrevisualizacion= document.getElementById("imagenPrevisualizacion");



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

    //guardo imagen seleccionada en localstorage
    localStorage.setItem("Imagen"+`${idImagen}`,UrlImagen);

    //creo alerta
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


// muestro en pantalla la imagen seleccionada
fotoParticular.addEventListener("change",(e) =>{
    e.preventDefault();
    idImagen++;
    const imagen= fotoParticular.files[0]
    var binaryData = [];
    binaryData.push(imagen);
    UrlImagen=window.URL.createObjectURL(new Blob(binaryData), {type : 'images/png'});
    imagenPrevisualizacion.src=UrlImagen;
    console.log(UrlImagen)
    imagenPrevisualizacion.style.width="200px";
    imagenPrevisualizacion.style.marginTop="24px";
});


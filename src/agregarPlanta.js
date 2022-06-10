const form= document.getElementById("formPlanta");

//Alerta familia cargada con exito
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    swal.fire({
    html:` <div class="container">
           <h3>¡La planta ha sido agregada con exito!</h3>
           <p>¿Qué deseás hacer?</p> 
           <a href="agregar-planta.html" class="btn btn-success">Agregar otra planta</a>
           <a href="agregar-familia.html" class="btn btn-success">Agregar familia</a>
           <a href="listado-plantas.html" class="btn btn-success">Visualizar todas</a>
           </div>`
   })

})  
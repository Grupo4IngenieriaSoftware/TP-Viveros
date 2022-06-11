const form= document.getElementById("formPlanta");
const boton=document.getElementById("boton");
window.onload = () => {
    const formFamilia= document.getElementById("familia");
    const familiasString=localStorage.getItem("familias");
    const familias=JSON.parse(familiasString);
     for(let i=0;i<familias.length;i++){
        const option=document.createElement("option");
        option.innerText=familias[i].nombreComun; 
        formFamilia.appendChild(option);
     }
}
boton.addEventListener("click",(e)=>{
   e.preventDefault();
   window.location.href="agregar-familia.html";
});
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


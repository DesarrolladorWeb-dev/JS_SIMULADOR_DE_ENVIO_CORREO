const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");
const resetBtn = document.querySelector('#resetBtn');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// variables de los campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

addEventListener();

function addEventListener() {
  // Cuando la app arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);
  // Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  resetBtn.addEventListener('click', resetearFormulario);


  btnEnviar.addEventListener('click', enviarEmail);
 // Reiniciar formulario


 
}


// funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  // console.log(e.target.value)
  if (e.target.value.length > 0) {
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
    console.log("si hay algo");
    //eliminar errores
    const error = document.querySelector("p.error");
    if (error) { // si no hay nada devuelve null
        error.remove();
      }

   
  } else {
    // console.log("no hay nada")
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }
  // console.log(e.target.type)
  if (e.target.type === "email") {
    // si no lo encuentra mostrara -1
   
    // const resultado = e.target.value.indexOf('@');//encuentra valores
    // if (resultado < 0 ) {
    //     mostrarError('El email no es valido');

    // }

    if (er.test(e.target.value)) {
      console.log("email correcto");
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      console.log("email incorrecto")
      mostrarError("Email no valido");
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      
    }
  }

  if (er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    
  }
}

function mostrarError(mensaje) {
  //cada ves que pasa se creara un nuevo <p>
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "error",
    "border",
    "border-red-500",
    "background-color-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center"
  );
  // Selecciona todos los elementos con clase error
  const errores = document.querySelectorAll(".error");
  /**Nota: document.querySelector si no encuentra la clase devuelve null  */
  // como un array tiene length de la cantidad de <p> que hay 0 significa 1
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);

    // puedes pasarle un elemento a un elemento con js
    // tienes control total de donde quieres que se muestren los elementos
    // formulario.insertBefore(mensaj   eError, document.querySelector('.mb-10'))
  }
}


// Funcion Enviar email
function enviarEmail(e){
  e.preventDefault();

  // Mostrar el spiner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex'

  setTimeout(() => {
    spinner.style.display = 'none'

    // mensaje de se envio correctamente

    const parrafo = document.createElement('p');
    parrafo.textContent = "El mensaje se envio correctamente";
    parrafo.classList.add('text-center', 'my-10','p-2', 'bg-green-500', 'text-white','font-bold','uppercase');
    // antes del espiner
    formulario.insertBefore(parrafo, spinner);
    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}


function resetearFormulario(){
  // metodo que se puede realizar a cualquier formulario
  formulario.reset();
  
  iniciarApp();
}

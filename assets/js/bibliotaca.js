function cambiarSeccion(idSeccion) {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    const seccion = secciones[i]
    seccion.style.display = "none"; //con la propiedad display de css(style) con valor "none" ese elemento deja de visualizarse en la app
  }
  document.querySelector("#" + idSeccion).style.display = "block";
}

// funciones genericas que se utilizaron en el login y en el registro 
function obtenerObjeto(arrElementos, propiedad, dato) {
  let objeto = null;
  for (let i = 0; i < arrElementos.length; i++) {
    const elemento = arrElementos[i];
    if (elemento[propiedad] === dato) {
      objeto = elemento;
      break;
    }
  }
  return objeto;
}

function buscarElemento(arrElementos, propiedad, dato) {
  let existe = false;
  for (let i = 0; i < arrElementos.length; i++) {
    const elemento = arrElementos[i];
    if (elemento[propiedad] === dato) {
      existe = true;
      break;
    }
  }
  return existe;
}

// funcion para validar contraseña generica 
function validarContraseña(contraseña) {
  if (contraseña.length >= 6) {
    let mayuscula = false;
    let minuscula = false;
    let numero = false;


    for (let i = 0; i < contraseña.length; i++) {
      if (contraseña.charCodeAt(i) >= 65 && contraseña.charCodeAt(i) <= 90) {
        mayuscula = true;
      }
      else if (contraseña.charCodeAt(i) >= 97 && contraseña.charCodeAt(i) <= 122) {
        minuscula = true;
      }
      else if (contraseña.charCodeAt(i) >= 48 && contraseña.charCodeAt(i) <= 57) {
        numero = true;

      }

    }
    if (mayuscula == true && minuscula == true && numero == true) {
      return true;
    }
  }
  return false;

}

/*----------------------------------------------------------------------------------------------*/

function ocultarElementos(_selectorString) {

  let elementos = document.querySelectorAll(_selectorString)

  for (let i = 0; i < elementos.length; i++){
    let e = elementos[i];
      e.style.display = "none";
  }


}



function mostrarElementos(_selectorString) {

  let elementos = document.querySelectorAll(_selectorString)

  for (let i = 0; i < elementos.length; i++){
    let e = elementos[i]
    e.style.display = "block"
  }

}


function armarMenu(rol) {
  ocultarElementos(".menu-item");
  mostrarElementos(".menu-item" + rol);
  

}



function cambiarPantalla(_pantalla) {
  ocultarElementos(".seccion")
  mostrarElementos("#seccion" + _pantalla)
}

function elazarBotonsMenus() {

  let items = document.querySelector('#navPrincipal li');

  for (let i = 0; i < items.length; i++) {
    const li = items[i];
    li.addEventLitener("click", itemMenuBotones)

  }

}

function itemMenuBotones() {

  let patanllaAmostrar = this.id.substr(4);
  cambiarPantalla(patanllaAmostrar)

}


function armarMenu(_rol){
  document.querySelector("#navPrincipal").style.display = "block" 
  document.querySelector("#aux").style.display = "block"
  ocultarElementos(".menu-item");
  mostrarElementos(".menu-item."+_rol)

}

function cargarVehiculo () {


  let vehiculo = '';

  for(let i = 0; i < nuevoVehiculo.length; i++) {

      let v = nuevoVehiculo[i];
      let option = `<option value="${v.tipo}">${v.tipo} modelo:${v.nombre}</option>`;
      vehiculo+= option
  }

  document.querySelector("#slcVehiculo").innerHTML = vehiculo;
  document.querySelector("#slcTipoVehiculo").innerHTML = vehiculo;
}
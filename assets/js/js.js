iniciarApp();

let usuarioActivo = 0;

function iniciarApp() {
  cambiarPantalla("Login");
  document.querySelector("#aux").style.display = "none";
  document.querySelector("#navPrincipal").style.display = "none";
}

/*-----[LOGIN]-----------------------------------------------------------------------------------*/

document.querySelector("#btnIniciarSesion").addEventListener("click", logIn);

function logIn() {
  let usuarioAdmin = "Admin";
  let passAdmin = "Admin01";
  let usuarioIngresado = document.querySelector("#txtIngresoUsuario").value;
  let passIngresado = document.querySelector("#txtIngresoPass").value;
  let tipoUsuario = document.querySelector("#slcIngresoUsuarios").value;
  let loginExitoso = false;
  let objetoUsario;

  if (usuarioIngresado.trim() === "" || passIngresado.trim() === "") {
    document.querySelector("#pMensajeError").innerHTML = `Debe completar ambos campos de ingreso`;
  } else {
    switch (tipoUsuario) {
      case "logIngresoPersona":
        loginExitoso = realizarLogin(nuevasPersonas, usuarioIngresado, passIngresado);
        if (loginExitoso) {
          /*---SECCION PERSONA--*/
          loginExitoso;
          pantallaDeBienvenida();
          armarMenu("persona");
          objetoUsario = obtenerObjeto(nuevasPersonas, "usuario", usuarioIngresado);
          usuarioActivo = objetoUsario.idP;
          document.querySelector(
            "#linkUsuarioConectado"
          ).innerHTML = `${objetoUsario.usuario}`;
        }

        break;
      case "logIngresoEmpresa":
        loginExitoso = realizarLoginEmpresa(
          nuevaEmpresa,
          usuarioIngresado,
          passIngresado
        );
        if (loginExitoso && empresaHabilitada) {
          /*---SECCION EMPRESA--*/
          pantallaDeBienvenida();
          armarMenu("empresa");
          objetoUsario = obtenerObjeto(nuevaEmpresa, "usuario", usuarioIngresado);
          usuarioActivo = objetoUsario.idE;
          document.querySelector("#linkUsuarioConectado").innerHTML = `${objetoUsario.razonSocial}`;
        }

        break;

      case "logIngresoAdmin":
        if (usuarioIngresado === usuarioAdmin && passIngresado === passAdmin) {
          loginExitoso;
          /*---SECCION ADMIN--*/
          pantallaDeBienvenida();
          armarMenu("admin");
          usuarioActivo = "Admin";
          document.querySelector(
            "#linkUsuarioConectado"
          ).innerHTML = `${usuarioAdmin}`;
        }
    }
    if (!loginExitoso) {
      document.querySelector("#pMensajeError").innerHTML =
        "El usuario y/o contraseña es invalido";
    }
    if (!empresaHabilitada) {
      document.querySelector("#pMensajeError").innerHTML =
        "Su empresa aun no fue habilitada por el administrador";
    }
  }
}

function realizarLogin(_array, _campoUsuario, _campoPass) {
  loginExitoso = false;

  for (let i = 0; i < _array.length; i++) {
    const usuario = _array[i];

    if (
      _campoUsuario.toLowerCase() === usuario.usuario.toLowerCase() &&
      _campoPass === usuario.pass
    ) {
      loginExitoso = true;
      break;
    } else {
      loginExitoso = false;
    }
  }
  return loginExitoso;
}

function realizarLoginEmpresa(_array, _campoUsuario, _campoPass) {
  loginExitoso = false;
  empresaHabilitada = true;

  for (let i = 0; i < _array.length; i++) {
    const usuario = _array[i];
    if (usuario.habilitacion === false) {
      loginExitoso = false;
      empresaHabilitada = false;
    } else if (
      _campoUsuario.toLowerCase() === usuario.usuario.toLowerCase() &&
      _campoPass === usuario.pass
    ) {
      loginExitoso = true;
      break;
    } else {
      loginExitoso = false;
    }
  }

  return [loginExitoso, empresaHabilitada];
}

/*-----------------[LOG OUT]------------------------------------------------------------------*/
document.querySelector("#linkCerrarSeccion").addEventListener("click", cerrarSeccion);

function cerrarSeccion() {
  iniciarApp();
  document.querySelector("#txtIngresoUsuario").value = "";
  document.querySelector("#txtIngresoPass").value = "";
  document.querySelector("#pMensajeError").innerHTML = "Se ha cerrado seccion correctamente";
  usuarioActivo = 0;
}

/*-----------------[REGISTRO]------------------------------------------------------------------*/

document.querySelector("#slcUsuarios").addEventListener("change", cambiarTipoRegistro);

function cambiarTipoRegistro() {
  let tipoUsuario = document.querySelector("#slcUsuarios").value;

  document.querySelector("#pResultado").innerHTML = "";



  if (tipoUsuario === "logPersona") {
    document.querySelector("#lblRut").setAttribute("style", "display:none");
    document.querySelector("#txtRut").setAttribute("style", "display:none");
    document.querySelector("#lblRazonSocial").setAttribute("style", "display:none");
    document.querySelector("#txtRazonSocial").setAttribute("style", "display:none");
    document.querySelector("#slcVehiculo").setAttribute("style", "display:none");
    document.querySelector("#lblRegistroVehiculo").setAttribute("style", "display:none");
    document.querySelector("#btnRegistrarse").setAttribute("style", "display:none");

    document.querySelector("#lblDocumeto").setAttribute("style", "display:line-block");
    document.querySelector("#txtDocumento").setAttribute("style", "display:line-block");
    document.querySelector("#lblApellido").setAttribute("style", "display:line-block");
    document.querySelector("#txtApellido").setAttribute("style", "display:line-block");



  }
  if (tipoUsuario === "logEmpresa") {
    document.querySelector("#lblDocumeto").setAttribute("style", "display:none");
    document.querySelector("#txtDocumento").setAttribute("style", "display:none");
    document.querySelector("#lblApellido").setAttribute("style", "display:none");
    document.querySelector("#txtApellido").setAttribute("style", "display:none");
    document.querySelector("#btnRegistrarse").setAttribute("style", "display:none");

    document.querySelector("#lblRut").setAttribute("style", "display:line-block");
    document.querySelector("#txtRut").setAttribute("style", "display:line-block");
    document.querySelector("#lblRazonSocial").setAttribute("style", "display:line-block");
    document.querySelector("#txtRazonSocial").setAttribute("style", "display:line-block");
    document.querySelector("#slcVehiculo").setAttribute("style", "display:line-block");
    document.querySelector("#lblRegistroVehiculo").setAttribute("style", "display:line-block");



  }
}

cambiarTipoRegistro();

document.querySelector("#btnSeccionRegistro").addEventListener("click", irSeccionRegistro);

function irSeccionRegistro() {
  cambiarPantalla("seccionRegistro");
  agregarRegistro();
}

cargarVehiculo();

document.querySelector("#btnFormularioRegistro").addEventListener("click", agregarRegistro);

function agregarRegistro() {
  cambiarPantalla("Registro");
  document.querySelector("#pResultado").innerHTML = "";
  let usuario = document.querySelector("#slcUsuarios").value;

  switch (usuario) {
    case "logPersona":
      let idP = nuevasPersonas.length + 1;
      let documento = document.querySelector("#txtDocumento").value;
      let nombre = document.querySelector("#txtNombre").value;
      let apellido = document.querySelector("#txtApellido").value;
      let usuario = document.querySelector("#txtUsuario").value;
      let contraseña = document.querySelector("#txtPass").value;
      let personaN = new Persona(
        idP,
        documento,
        nombre,
        apellido,
        usuario,
        contraseña,

      );
      let existe = buscarElemento(nuevasPersonas, "usuario", usuario);
      let validarP = validarContraseña(contraseña);

      if (existe) {
        document.querySelector("#pResultado").innerHTML += "El nombre de usuario ya existe";
      } else if (
        nombre.length === 0 ||
        usuario.length === 0 ||
        apellido.length === 0 ||
        documento.length === 0 ||
        contraseña === 0
      ) {
        document.querySelector("#pResultado").innerHTML += "Ninguno de los campos  pueden estar vacios";
        return false;
      } else if (validarP === false) {
        document.querySelector("#pResultado").innerHTML += "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número";
      } else {
        nuevasPersonas.push(personaN);
      }



      break;

    case "logEmpresa":
      let rut = document.querySelector("#txtRut").value;
      let nombreFantasia = document.querySelector("#txtNombre").value;
      let razonSocial = document.querySelector("#txtRazonSocial").value;
      let usuarioE = document.querySelector("#txtUsuario").value;
      let contraseñaE = document.querySelector("#txtPass").value;
      let seleccionarVehiculo = document.querySelector("#slcVehiculo").value;
      let id = nuevaEmpresa.length + 1;
      let empresa = new Empresas(
        id,
        rut,
        razonSocial,
        nombreFantasia,
        usuarioE,
        contraseñaE,
        false,
        seleccionarVehiculo,

      );
      let existeR = buscarElemento(nuevaEmpresa, "rut", rut);
      let existeRS = buscarElemento(nuevaEmpresa, "razonSocial", razonSocial);
      let validarE = validarContraseña(contraseñaE);

      if (existeR) {
        document.querySelector("#pResultado").innerHTML += "El RUT ya existe, ingrese otro RUT";
      } else if (existeRS) {
        document.querySelector("#pResultado").innerHTML += "La Razon Social ya existe, ingrese otra Racion Social";
      } else if (
        nombreFantasia.length === 0 || usuarioE.length === 0 || rut.length === 0 ||
        razonSocial.length === 0 || contraseñaE === 0
      ) {
        document.querySelector("#pResultado").innerHTML += "Ninguno de los campos  pueden estar vacios";
        return false;
      } else if (validarE === false) {
        document.querySelector("#pResultado").innerHTML +=
          "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número";
      } else {
        nuevaEmpresa.push(empresa);
      }

      console.log(nuevaEmpresa);
      break;
  }
}

document.querySelector("#btnVolverLogin").addEventListener("click", volverLogin);

function volverLogin() {
  cambiarPantalla("Login");
}
/*---------------------[HABILIAR DESABILITAR EMPRESAS (ADMIN)-------------------------*/

document.querySelector("#itemHabilitarEmpresas").addEventListener("click", habitarDesabilitarEmpresas);

function habitarDesabilitarEmpresas() {
  document.querySelector("#navPrincipal").style.display = "block";
  cambiarPantalla("HabilitarDesabilitarEmpresa");
  armarMenu("admin");

  let arrayBuscarEmpresas = [];
  tablaHabilitarEmpresas(nuevaEmpresa);
  document.querySelector("#btnBuscarEmpresa").addEventListener("click", buscarEmpresa);

  function buscarEmpresa() {
    let campoIngresado = document.querySelector("#txtBusqueda").value;
    let campooIngresadoEnMayus = campoIngresado.toLowerCase();

    let razonsocialEcontrada = false;
    let nombreFantasiaEcontrada = false;
    arrayBuscarEmpresas = [];
    let mensaje = "";

    if (campooIngresadoEnMayus.length > 0) {
      for (let i = 0; i < nuevaEmpresa.length; i++) {
        let empresa = nuevaEmpresa[i];
        let razonSocialMayus = empresa["razonSocial"].toLowerCase();
        let nombreFantasiaMayus = empresa["nombreFantasia"].toLowerCase();
        if (razonSocialMayus.indexOf(campooIngresadoEnMayus) !== -1) {
          razonsocialEcontrada = true;
          arrayBuscarEmpresas.push(empresa);
        } else if (
          nombreFantasiaMayus.indexOf(campooIngresadoEnMayus) !== -1 &&
          !razonsocialEcontrada
        ) {
          nombreFantasiaEcontrada = true;
          arrayBuscarEmpresas.push(empresa);
        }
      }
    }

    if (!nombreFantasiaEcontrada && !razonsocialEcontrada) {
      mensaje = "No hay resultados que coincidan con su búsqueda";
    }

    document.querySelector("#pMensaje").innerHTML = mensaje;

    if (arrayBuscarEmpresas.length > 0) {
      tablaHabilitarEmpresas(arrayBuscarEmpresas);
    }
  }

  function tablaHabilitarEmpresas(_array) {
    let mostrarHabilitacio = "";

    document.querySelector("#tblHablitarEmpresas").innerHTML = "";
    for (let i = 0; i < _array.length; i++) {
      const empresa = _array[i];
      if (empresa.habilitacion === true) {
        mostrarHabilitacio = "Habilitado";
      } else {
        mostrarHabilitacio = "Desabilitado";
      }
      document.querySelector("#tblHablitarEmpresas").innerHTML += `<tr>
            <td>${empresa.rut}</td>
            <td>${empresa.razonSocial}</td>
            <td>${empresa.nombreFantasia}</td>
            <td>${mostrarHabilitacio}</td>
            <td><input type="button" value="Habilitar/Desabilitar" class="btnHabilitarEmpresa" data-empresa="${empresa.idE}"</input></td>`;
    }
    let botones = document.querySelectorAll(".btnHabilitarEmpresa");
    for (let i = 0; i < botones.length; i++) {
      const boton = botones[i];
      boton.addEventListener("click", hablitarEmpresa);
    }
  }

  function hablitarEmpresa() {
    let idEmpresaHabilitar = Number(this.getAttribute("data-empresa"));

    for (let i = 0; i < nuevaEmpresa.length; i++) {
      const empresa = nuevaEmpresa[i];
      if (empresa.idE === idEmpresaHabilitar) {
        if (empresa.habilitacion === false) {
          empresa.habilitacion = true;
        } else {
          empresa.habilitacion = false;
        }
      }
    }

    tablaHabilitarEmpresas(nuevaEmpresa);
  }
}

/*---------------------[Crear Tipo De Vehiculos (ADMIN)-------------------------*/

document.querySelector("#itemCrearVehiculos").addEventListener("click", CrearTipoVehiculos);

function CrearTipoVehiculos() {
  document.querySelector("#navPrincipal").style.display = "block";
  cambiarPantalla("CrearVehiculos");
  armarMenu("admin");

  document.querySelector("#tblCrearVehiculos").innerHTML = "";
  for (let i = 0; i < nuevoVehiculo.length; i++) {
    const vehiculos = nuevoVehiculo[i];
    document.querySelector("#tblCrearVehiculos").innerHTML += `<tr>
              <td>${vehiculos.idV}</td>
              <td>${vehiculos.tipo}</td>
              <td>${vehiculos.nombre}</td>
            `;
  }
}

document.querySelector("#btnCrearVehiculo").addEventListener("click", agregarVehiculo);

function agregarVehiculo() {
  let campoNombreVehiculo = document.querySelector("#txtNombreVehiculo").value;
  let campoTipoVehiculo = document.querySelector("#txtCrearVehiculo").value;
  let mensaje = "";
  let cantidadDeVehiculos = nuevoVehiculo.length;

  if (campoNombreVehiculo.trim() === "" || campoTipoVehiculo === "Seleccione") {
    mensaje = "Debe completar un campo de texto";
  } else {
    let vehiculo = new Vehiculo(
      cantidadDeVehiculos + 1,
      campoTipoVehiculo,
      campoNombreVehiculo
    );
    nuevoVehiculo.push(vehiculo);
    mensaje = `El vehiculo ${campoNombreVehiculo} fue cargado con exito`;
  }

  document.querySelector("#pMensajeCrearVehiculos").innerHTML = mensaje;

  CrearTipoVehiculos();
}

/*---------------------------------[Informacion estadistica Admin]------------------------------------------------------------------*/

document.querySelector("#itemInfoEstadisticaAdmin").addEventListener("click", crearTablaEstadisticaAdmi);

let arrayDistanciaRecorridaPorEmpresa = []

function crearTablaEstadisticaAdmi() {
  armarMenu("admin");
  cambiarPantalla("EstadisticasAdmin");

  document.querySelector("#tblInformacionEstadistica").innerHTML = ""
  for (let j = 0; j < nuevaEmpresa.length; j++) {
    const empresaEncarda = nuevaEmpresa[j];


    for (let i = 0; i < solicitudesDeEnvio.length; i++) {
      const solicitudes = solicitudesDeEnvio[i];

      if (solicitudes.empresaAsignada === empresaEncarda.idE && solicitudes.estado === "Finalizada") {
        arrayDistanciaRecorridaPorEmpresa.push(solicitudes.distancia)
        document.querySelector("#tblInformacionEstadistica").innerHTML += `<tr>
      <td>${empresaEncarda.nombreFantasia}</td>
      <td>${arrayDistanciaRecorridaPorEmpresa[j]}</td>`




      }


    }
  }
}
/*---------------------[Crear Solicitud de envio (Persona)-------------------------*/

document.querySelector("#itemSolicitudEnvio").addEventListener("click", cambiarSolicitud);

function cambiarSolicitud() {
  armarMenu("persona");
  cambiarPantalla("SolicitudEnvio");
}

document.querySelector("#btnAgregarSolicitud").addEventListener("click", crearSolicitud);

function crearSolicitud() {

  
  document.querySelector("#pMensajeSolicitud").innerHTML = "";
  let campoVehiculoAEscoger = document.querySelector("#slcTipoVehiculo").value;
  let campoDistanciaKilometros = document.querySelector("#txtKilometros").value;
  let campoComentario = document.querySelector("#txtComentario").value;
  let imagenMercaderia = document.querySelector("#fileImagenMercaderia").files[0].name;
  let cantidadDeSolicitudes = solicitudesDeEnvio.length;
  let estado = "Pendiente";
  let usuarioAutor = usuarioActivo;


  if (
    validarDatosSolicitud(
      campoVehiculoAEscoger,
      campoDistanciaKilometros,
      campoComentario,
      imagenMercaderia,
      usuarioAutor
    )
  ) {
    let solicitud = new solicitudDeEnvio(
      cantidadDeSolicitudes + 1,
      campoVehiculoAEscoger,
      campoDistanciaKilometros,
      campoComentario,
      imagenMercaderia,
      estado,
      usuarioAutor,
      undefined,
    );

    solicitudesDeEnvio.push(solicitud);
    document.querySelector("#pMensajeSolicitud").innerHTML = "Solicutd cargada con exito";
    vaciarInputsSolicitud();
  }
}

function validarDatosSolicitud(
  validarVehiculo,
  validarDistancia,
  validarComentario,
  validarImagen,
  validarAutor
) {
  let datosAprobados = true;

  if (validarVehiculo === "seleccione") {
    document.querySelector("#pMensajeSolicitud").innerHTML +=
      "Seleccione Vehiculo<br>";
    datosAprobados = false;
  }

  if (isNaN(validarDistancia)) {
    document.querySelector("#pMensajeSolicitud").innerHTML +=
      "Digite un numero<br>";
    datosAprobados = false;
  } else if (validarDistancia <= 0) {
    document.querySelector("#pMensajeSolicitud").innerHTML +=
      "Distancia Incorrecta<br>";
    datosAprobados = false;
  }

  if (validarComentario.trim() === "") {
    document.querySelector("#pMensajeSolicitud").innerHTML +=
      "Ingrese Descripcion<br>";
    datosAprobados = false;
  }

  if (validarImagen === undefined) {
    document.querySelector("#pMensajeSolicitud").innerHTML +=
      "Ingrese Imagen<br>";
    datosAprobados = false;
  }

  if (validarAutor === undefined) {
    document.querySelector("#pMensajeSolicitud").innerHTML +=
      "Ingrese Autor<br>";
    datosAprobados = false;
  }
  return datosAprobados;
}

function vaciarInputsSolicitud() {
  document.querySelector("#txtComentario").value = "";
  document.querySelector("#txtKilometros").value = "";
  document.querySelector("#fileImagenMercaderia").value = "";
  document.querySelector("#slcTipoVehiculo").value = "seleccione";
}

/*---------------------Lista de envios (Persona)-------------------------*/

document.querySelector("#itemListaEnvios").addEventListener("click", crearTablaEnvios);

function crearTablaEnvios() {
  armarMenu("persona");
  cambiarPantalla("ListaEnvios");

  document.querySelector("#tblEnvios").innerHTML = "";
  for (let i = 0; i < solicitudesDeEnvio.length; i++) {
    const envios = solicitudesDeEnvio[i];
    if (envios.autor === usuarioActivo) {
      document.querySelector("#tblEnvios").innerHTML += `<tr>
            <td><img src="./assets/img/${envios.imagen}"</td>
            <td>${envios.estado}</td>
            <td>${envios.descrpicion}</td>
            <td>${envios.descrpicion}</td>
            `;
    }
  }
}

/*--------------------------[Estadisticas Persona]--------------------------------------------------*/

document.querySelector("#itemInfoEstadistica").addEventListener("click", estadistasPersona)



function estadistasPersona() {
  armarMenu("persona")
  cambiarPantalla("EstadisticasPersona")
  let enviosPendientes = 0
  let enviosEnTransito = 0
  let enviosFinalizados = 0


  for (let i = 0; i < solicitudesDeEnvio.length; i++) {
    const envios = solicitudesDeEnvio[i];
    if (envios.autor === usuarioActivo) {
      if (envios.estado === "Pendiente") {
        enviosPendientes++
      } if (envios.estado === "En Transito") {
        enviosEnTransito++
      } if (envios.estado === "Finalizada") {
        enviosFinalizados++
      }

    }

  }

  let enviosTomados = enviosEnTransito + enviosFinalizados
  let enviosTotales = enviosPendientes + enviosTomados
  let porcentaje = (enviosTomados / enviosTotales) * 100

  document.querySelector("#pPorcentaje").innerHTML = `Porcentaje de solicitudes pendientes: %${porcentaje}`
  document.querySelector("#pCantidadEnviosPendiente").innerHTML = `Cantidad de envios pendientes:${enviosPendientes}`
  document.querySelector("#pCantidadEnviosTransito").innerHTML = `Cantidad de envios en transito: ${enviosEnTransito}`
  document.querySelector("#pCantidadEnviosFinalizada").innerHTML = `Cantidad de envios finalizados: ${enviosFinalizados}`


}



/*--------------------------[---Ver Listado de Solicitudes Pendiente [Empresa]-----------------------------------------------------------------------------------*/


document.querySelector("#itemSolicitudesPendientes").addEventListener("click", solicitudesPendientes)



function solicitudesPendientes() {
  armarMenu("empresa")
  cambiarPantalla("SolicitudesPendientes")


  let solicitudesPendientesHtml = ""
  let contenido = ``

  for (let i = 0; i < solicitudesDeEnvio.length; i++) {
    const solicitud = solicitudesDeEnvio[i];

    for (let j = 0; j < nuevaEmpresa.length; j++) {
      const vehiculoEmpresa = nuevaEmpresa[j];

      let usuarios = obtenerObjeto(nuevasPersonas, "idP", solicitud.autor)


      if (vehiculoEmpresa.idE === usuarioActivo) {

        if (vehiculoEmpresa.vehiculo === solicitud.tipoDeVehiculo && solicitud.estado === "Pendiente") {

          contenido = `<div>
                            <h2>${usuarios.nombre} ${usuarios.apellido}</h2>
                            
                              <img src="./assets/Img/${solicitud.imagen}">

                              <p>${solicitud.distancia} Km</p>

                              <p>${solicitud.descrpicion}</p>

                              <p>${solicitud.estado} para ser tomado</p>

                       <input type="button" value="Levantar pedido" class="btnCambiarEstado" data-estado="${solicitud.idS}">

                          </div>
                          `



          solicitudesPendientesHtml += contenido


        }

      }




    }

    document.querySelector("#seccionSolicitudesPendientes .contendioSolicitudesPendientes").innerHTML = solicitudesPendientesHtml

  }

  let botonesCambiarEstado = document.querySelectorAll(".btnCambiarEstado");
  for (let i = 0; i < botonesCambiarEstado.length; i++) {
    const botones = botonesCambiarEstado[i];
    botones.addEventListener("click", cambiarDeEstado);
  }

  function cambiarDeEstado() {
    let idParaCambiarEstado = Number(this.getAttribute("data-estado"));
    let solicitudCambiar = obtenerObjeto(solicitudesDeEnvio, "idS", idParaCambiarEstado);


    if (solicitudCambiar.estado === "Pendiente") {
      solicitudCambiar.estado = "En Transito";
      solicitudCambiar.empresaAsignada = usuarioActivo


      document.querySelector("#msgExitoso").innerHTML = ` La solicitud numero ${solicitudCambiar.idS} fue tomada con exito`;
      solicitudesPendientes()
      solicitudesFinalizadasArmar()
    }
  }



}




/*------------------------[Ver listado de solicitued tomadas como FINALIZADAS ]------------------------------------------------------------------*/

document.querySelector("#itemSolicitudesTomadas").addEventListener("click", solicitudesFinalizadasArmar);

let arrayMisPedidosEntransito = []

function solicitudesFinalizadasArmar() {

  cambiarPantalla("SolicitudesTomadas");
  armarMenu("empresa");
  arrayMisPedidosEntransito = []

  document.querySelector("#pMensajeFinalizar").innerHTML = ""
  document.querySelector("#slcFinalizarPedido").innerHTML = ""
  document.querySelector("#tblSolicitudesTomadas").innerHTML = ""
  for (let i = 0; i < solicitudesDeEnvio.length; i++) {
    const envios = solicitudesDeEnvio[i];

    let personas = obtenerObjeto(nuevasPersonas, "idP", envios.autor)

    if (usuarioActivo === envios.empresaAsignada && envios.estado === "En Transito") {
      arrayMisPedidosEntransito.push(envios)

      document.querySelector("#tblSolicitudesTomadas").innerHTML += `<tr> 
    <td><img src="./assets/img/${envios.imagen}"</td>
    <td>${envios.distancia}</td>
    <td>${personas.nombre}</td>
    <td>${personas.apellido}</td>
    <td>${envios.estado}</td>`




    }

  }


  for (let i = 0; i < arrayMisPedidosEntransito.length; i++) {
    const pedidosAmostrar = arrayMisPedidosEntransito[i];
    document.querySelector("#slcFinalizarPedido").innerHTML += `<option value="${pedidosAmostrar.idS}">Numero de Pedido en pantalla:${i + 1}</option>`


  }

  if (arrayMisPedidosEntransito <= 0) {
    document.querySelector("#pMensajeFinalizar").innerHTML = "No tiene solicitudes tomadas"


  }


}

document.querySelector("#btnFinalizar").addEventListener("click", finalizarPedidos)

function finalizarPedidos() {

  let pedidoAfinalizar = Number(document.querySelector('#slcFinalizarPedido').value)
  for (let i = 0; i < solicitudesDeEnvio.length; i++) {
    const unaSolicitud = solicitudesDeEnvio[i];

    if (pedidoAfinalizar === unaSolicitud.idS) {
      unaSolicitud.estado = "Finalizada"
      document.querySelector("#pMensajeFinalizar").innerHTML = "Envio finalizado con exito"
      solicitudesFinalizadasArmar()

    }

  }

}

/*------------------------------[Estadisticas empresa]---------------------------------------------------------*/

/*no funciona correctamente*/

document.querySelector("#itemInfoEstadistcaEmpresa").addEventListener("click", estadisticaEmpresa)

let cantidadDeSolicitudes = 0
let arrayPedidos = []
let maximo = 0
let personaMasEntregas
let corresponde


function estadisticaEmpresa() {
  cambiarPantalla("EstadisticasEmpresa")
  armarMenu("empresa")
  let cantidadDeSolicitudes = 0

  for (let i = 0; i < nuevasPersonas.length; i++) {
    const persona = nuevasPersonas[i];
    for (let j = 0; j < solicitudesDeEnvio.length; j++) {
      const solicitud = solicitudesDeEnvio[j];
        if(solicitud.autor === persona.idP && usuarioActivo === solicitud.empresaAsignada) {
          cantidadDeSolicitudes = cantidadDeSolicitudes + 1;
          

        }
    

    } if (cantidadDeSolicitudes > maximo) {
      arrayPedidos.splice(0, arrayPedidos.length) /*Primero eliminar array 2 cambiar el valor de maximo */
      arrayPedidos.push(nuevasPersonas[i])
      maximo = cantidadDeSolicitudes

    } else if (cantidadDeSolicitudes === maximo) {
      arrayPedidos.push(nuevasPersonas[i])
    }
  }
  for (let i = 0; i < arrayPedidos.length; i++) {
    const pedidos = arrayPedidos[i];
     
      document.querySelector("#datosTabla").innerHTML = `<tr>
      <td>${pedidos.nombre}</td>
      <td>${maximo}</td>`
    
   
    
  }
}

/*----------------------------------------Bienvendido---------------------------------------------------*/

document.querySelector("#linkUsuarioConectado").addEventListener("click", pantallaDeBienvenida);

function pantallaDeBienvenida() {
  cambiarPantalla("Bienvenida")
  document.querySelector("#pMensaje").innerHTML = "Bienvendido"


}


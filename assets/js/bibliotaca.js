function cambiarSeccion(idSeccion) {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i];
        seccion.style.display = "none"; //con la propiedad display de css(style) con valor "none" ese elemento deja de visualizarse en la app
    }
    document.querySelector("#" + idSeccion).style.display = "block";
}


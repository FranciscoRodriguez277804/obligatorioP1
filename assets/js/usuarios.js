class Persona {
    constructor(_id, _documento, _nombre, _apellido, _usuario, _pass){
        this.idP = _id;
        this.documento = _documento;
        this.nombre = _nombre;
        this.apellido = _apellido;
        this.usuario = _usuario;
        this.pass = _pass;
    }
    
};

let nuevasPersonas = [
    new Persona  (1, "4914011-8", "Francisco" , "Rodriguez", "Panchesquer" ,"Panchesquer1"),
    new Persona  (2, "4599267-4", "Gabriel" , "Toledo", "Gabotol" ,"Gabotol1"),
    new Persona  (3, "5391386-8", "Jorge" , "Tabarez", "Hertules" ,"Hertules"), 
    new Persona  (4, "3299437-8", "Mario" , "Hernandez", "Fulanito" ,"Hola123"),
];

class Empresas {
    constructor(_id, _rut, _razonSocial, _nombreFantasia, _usuario, _pass , _habilitacion, _vehiculo){
        this.idE = _id;
        this.rut = _rut;
        this.razonSocial =_razonSocial;
        this.nombreFantasia = _nombreFantasia;
        this.usuario = _usuario;
        this.pass = _pass
        this.habilitacion = _habilitacion;
        this.vehiculo = _vehiculo;
    }
};

let nuevaEmpresa = [
    new Empresas  (1, "123456789123", "Normisur S.A" ,"Cellular Center", "Charly" , "Dueño3", true, "Camioneta"),
    new Empresas  (2, "21014400014", "Sendsatr S.A", "Envios Locos", "Nico", "Nico123",true, "Moto"),
    new Empresas  (3, "21015400016", "Arroz S.A", "Los Chinos", "Andres", "Andres123",true, "Camion"),
    new Empresas  (4, "583610789123", "Laguitos S.A" ,"NormpoMar", "Richard" , "Richar123", false, "Moto"),
    new Empresas  (5, "21045789142", "Timepoz S.A", "Tiempos", "Gonzalo", "Gonzalo123", false, "Camioneta" )
    
];


class Vehiculo {
    constructor(_idV, _tipo, _nombre){
        this.idV = _idV;
        this.tipo = _tipo;
        this.nombre = _nombre
    }
}

let nuevoVehiculo = [
    new Vehiculo (1, "Moto", "Yumbo"),
    new Vehiculo (2, "Camioneta", "Berlingo"),
    new Vehiculo (3, "Camion", "JAC")

]


class solicitudDeEnvio{
    constructor(_idS ,_tipoDeVehiculo, _unaDistancia, _unaDescrpicion, _unaImagen, _unEstado, _unAutor,_empresaAsignada){
        this.idS= _idS;
        this.tipoDeVehiculo = _tipoDeVehiculo;
        this.distancia = _unaDistancia; 
        this.descrpicion = _unaDescrpicion;
        this.imagen = _unaImagen;
        this.estado = _unEstado;
        this.autor = _unAutor;
        this.empresaAsignada = _empresaAsignada;  
    }
}


let solicitudesDeEnvio = [
    new solicitudDeEnvio(1, "Moto", 15, "Entregar a Portero", 'Imagen1.jpg', "Pendiente", 1, undefined),
    new solicitudDeEnvio(2, "Camion", 80, "Pedido ya Pago", 'Imagen2.jpg', "Pendiente", 2, 1),
    new solicitudDeEnvio(3, "Camioneta", 35, "Son Varios Bultos", 'Imagen3.jpg', "En Transito", 3, 2),
    new solicitudDeEnvio(4, "Camion", 7, "Entregar a Portero", 'Imagen1.jpg', "Finalizada", 4, 4),
    new solicitudDeEnvio(5, "Camion", 7, "Entregar a Portero", 'Imagen1.jpg', "Finalizada", 2, 4),
  
       
]



//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
    init_Mapa1();
    init_Mapa2();
    navarraExtent();
    pamplonaExtent();
}


//FUNCION PARA INICIALIZAR EL MAPA 1
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    mapa1 = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        target: 'Mapa1'
    });
}

//FUNCION PARA INICIALIZAR EL MAPA 2
function init_Mapa2() {
    //Crear mapa en el elemento DOM
    mapa2 = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        target: 'Mapa2'
    });
}


//FUNCION PARA RESTRINGIR EL MAPA 1 A LAS COORDENADAS DE NAVARRA
function navarraExtent() {
    var izquierda = Number('-2.5');
    var abajo = Number('42');
    var derecha = Number('-0.725');
    var arriba = Number('43.315');
    //el tipo extent representa una pareja de coordenadas
    var nuevoExtent = ol.proj.transformExtent([izquierda, abajo, derecha, arriba], 'EPSG:4326', 'EPSG:3857');
    //creo una nueva vista con los mismo parametros que antes salvo centro y extent
    //-	Centro: vamos a centrar el mapa en la coordenada del centro
    //del rectángulo especificado por el usuario
    //-	Extent: asignamos la variable nuevoExtent
    var nuevaView = new ol.View({
        zoom: 8.5,
        minZoom: 8.5,
        //media de long y media de lat
        //donde pone nuevoExtent ponia solo extent 
        center: [0.5 * (nuevoExtent[0] + nuevoExtent[2]), 0.5 * (nuevoExtent[1] + nuevoExtent[3])],
        extent: nuevoExtent
    });
    //asigno al mapa la nueva vista definida
    mapa1.setView(nuevaView);
}

//FUNCION PARA RESTRINGIR EL MAPA 2 A LAS COORDENADAS DE PAMPLONA
function pamplonaExtent() {
    var izquierda = Number('-1.7');
    var abajo = Number('42.77296');
    var derecha = Number('-1.596');
    var arriba = Number('42.84');
    //el tipo extent representa una pareja de coordenadas
    var nuevoExtent = ol.proj.transformExtent([izquierda, abajo, derecha, arriba], 'EPSG:4326', 'EPSG:3857');
    //creo una nueva vista con los mismo parametros que antes salvo centro y extent
    //-	Centro: vamos a centrar el mapa en la coordenada del centro
    //del rectángulo especificado por el usuario
    //-	Extent: asignamos la variable nuevoExtent
    var nuevaView = new ol.View({
        zoom: 12,
        minZoom: 12,
        //media de long y media de lat
        //donde pone nuevoExtent ponia solo extent 
        center: [0.5 * (nuevoExtent[0] + nuevoExtent[2]), 0.5 * (nuevoExtent[1] + nuevoExtent[3])],
        extent: nuevoExtent
    });
    //asigno al mapa la nueva vista definida
    mapa2.setView(nuevaView);
}
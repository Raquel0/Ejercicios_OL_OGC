//cargar el mapa en el manejador del evento onload
function init_Mapa1() {
    mapa = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'watercolor'
                })
            })
        ],
        view: new ol.View({
            zoom: 6,
            minZoom: 6,
            center: [-230000, 5250000]
        }),
        target: 'Mapa1'
    });
}

//MANEJADOR para el evento del boton actualizar
//se raliza una restriccion de la vista
function updateExtent() {
    var izquierda = Number(document.getElementById('izq1').value);
    var abajo = Number(document.getElementById('aba1').value);
    var derecha = Number(document.getElementById('der1').value);
    var arriba = Number(document.getElementById('arr1').value);
    //el tipo extent representa una pareja de coordenadas
    var nuevoExtent = ol.proj.transformExtent([izquierda, abajo, derecha, arriba], 'EPSG:4326', 'EPSG:3857');
    //creo una nueva vista con los mismo parametros que antes salvo centro y extent
    //-	Centro: vamos a centrar el mapa en la coordenada del centro
    //del rectángulo especificado por el usuario
    //-	Extent: asignamos la variable nuevoExtent
    var nuevaView = new ol.View({
        zoom: 6,
        minZoom: 6,
        //media de long y media de lat
        //donde pone nuevoExtent ponia solo extent 
        center: [0.5 * (nuevoExtent[0] + nuevoExtent[2]), 0.5 * (nuevoExtent[1] + nuevoExtent[3])],
        extent: nuevoExtent
    });
    //asigno al mapa la nueva vista definida
    mapa.setView(nuevaView);
}
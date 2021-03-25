//MAPA BASE DE OL
function init() {
    mapa = new ol.Map({
        target: 'Mapa1',
        layers: [new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                params: {
                    LAYERS: 'basic'
                }

            })
        })],
        view: new ol.View({
            projection: 'EPSG:4326',
            zoom: 5,
            center: [1, 40]
        })
    });
    //EVENTO PARA CUANDO EL MAPA TERMINA DE MOVERSE, LLAMA A LA FUNCION ACTUALIZAEXTENT
    mapa.on('moveend', actualizaExtent);
    //EVENTO PARA CUANDO SE HACE CLICK EN EL MAPA, LLAMA A LA FUNCION ACTUALIZA CLICK
    mapa.on('click', actualizaClick, this);
}
//ACTUALIZA LA EXTENSION DE LO QUE SE VE
function actualizaExtent() {
    //COJO LOS DATOS DE LA VISTA ACTUAL EN FROMA ARRAY DE [X,Y,X,Y]
    //DE LAS ESQUINAS INF IZQ Y SUP DCHA
    //ADEMAS PONGO QUE SEA CON 2 DECIMALES Y LO LLEVO AL HTML
    var extent = mapa.getView().calculateExtent(mapa.getSize());
    document.getElementById("infizq").innerHTML = extent[0].toFixed(2) + "," + extent[1].toFixed(2)
    document.getElementById("supdcha").innerHTML = extent[2].toFixed(2) + "," + extent[3].toFixed(2)
}

//DATOS DEL CLICK
function actualizaClick(evento) {
    //COJO LAS COORDENADAS GEOGR DEL LUGAR DONDE SE HA PRODUCIDO EL EVENTO
    //LAS LLEVO AL FORM DEL HTML DONDE SE VA A MOSTRAR
    var coordenada = evento.coordinate;
    document.getElementById("coord").innerHTML = coordenada[0].toFixed(2) + "," + coordenada[1].toFixed(2)
    //COJO LAS COORDENADAS PIXEL DEL LUGAR DONDE SE HA PRODUCIDO EL EVENTO
    //LAS LLEVO AL FORM DEL HTML DONDE SE VA A MOSTRAR
    var pixel = mapa.getPixelFromCoordinate(coordenada);
    document.getElementById("pixel").innerHTML = pixel[0].toFixed(0) + "," + pixel[1].toFixed(0)

}
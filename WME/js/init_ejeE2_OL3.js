//CARGO UN MAPA BASE DE OPEN LAYERS
function init() {
    mapa = new ol.Map({
        view: new ol.View({
            center: ol.proj.fromLonLat([1, 40]),
            zoom: 5
        }),
        target: 'Mapa1',
        layers: [new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://demo.mapserver.org/cgi-bin/wms',
                params: {
                    'LAYERS': 'bluemarble'
                }
            })
        })]
    })

    //CAPA INVISIBLE VACÍA QUE GENERO PARA GUARDAR EL ELEMENTO QUE QUIERA VISUALIZAR
    //MIENTRAS CARGA. LO COLOCO EN EL DIV "loading"
    overlay = new ol.Overlay({
        element: document.getElementById("loading")
    });
    //AÑADO MI OVERLAY NUEVO AL MAPA
    mapa.addOverlay(overlay);
    //ME FIJO EN LA CAPA DE LA POSICION 0 DEL ARRAY DE CAPAS
    //CUANDO COMIENZA A CARGAR UTILIZO LA FUNCION comienzaCarga
    //CUANDO TERMINA DE CARGAR UTILIZO LA FUNCION terminaCarga
    mapa.getLayers().getArray()[0].getSource().on('tileloadstart', comienzaCarga);
    mapa.getLayers().getArray()[0].getSource().on('tileloadend', terminaCarga);
}

//FUNCION PARA CARGAR UN GIF EN EL CENTRO DE LA VISUALIZACION
function comienzaCarga() {
    //ME COLOCO EN EL CENTRO DEL MAPA
    var centro = mapa.getView().getCenter();
    //var elementoOverlay = document.getElementById("loading")
    //DIGO QUE LA POSICION DEL OVERLAY VA A SER EL CENTRO QUE OBTUVE DEL MAPA
    overlay.setPosition(centro);
    //CARGO EL ELEMENTO GIF Y LE ASIGNO SU SITIO EN EL HTML
    var codigoHTML = "<img src='./res/RaGif11.gif'>"
    overlay.getElement().innerHTML = codigoHTML;
}

//FUNCION PARA PONER POSICION INDEFINIDA AL OVERLAY
function terminaCarga() {
    overlay.setPosition(undefined)
}
function init() {
    init_Mapa1();
    init_Mapa2();
    init_Eventos();

}
// PARA QUE LOS MAPAS QUEDEB NIEN SINCRONIZADOS
//ES MEJOR MISMO ZOON Y CENTRO
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    mapa1 = new ol.Map({
        target: 'Mapa1',
        view: new ol.View({
            center: ol.proj.fromLonLat([1, 40]),
            zoom: 4
        }),
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        })]
    })
}

function init_Mapa2() {
    //Crear mapa en el elemento DOM
    mapa2 = new ol.Map({
        target: 'Mapa2',
        view: new ol.View({
            center: ol.proj.fromLonLat([1, 40]),
            zoom: 4
        }),
        layers: [new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'terrain'
            })
        })]
    })
}

function init_Eventos() {
    //OBTENGO LA VISTA DE CADA MAPA
    var vista1 = mapa1.getView();
    var vista2 = mapa2.getView();
    //CUANDO CAMBIA LA RESOLCUION O EL CENTRO SE LLAMA LA FUNCION
    //SINCRONIZAR ZOOM/CENTRO
    vista1.on('change:resolution', sincronizarZoom, this)
    vista2.on('change:resolution', sincronizarZoom, this)
    vista1.on('change:center', sincronizarCentro, this)
    vista2.on('change:center', sincronizarCentro, this)
}

//FUNCION PARA IGUALAR EL ZOOM DE LA VISTA 1 A LA 2 Y VICEVERSA
function sincronizarZoom(evento) {
    //SI ESTA OCURRIENDO EN EL MAPA 1, OBTENGO SU ZOOM
    if (evento.target == mapa1.getView()) {
        //SE LA APLICO AL MAPA 2
        mapa2.getView().setZoom(mapa1.getView().getZoom());
    }
    //SI OCURRE EN EL MAPA DOS
    //COJO EL ZOOM DEL 2 Y SE LA APLICO AL 1
    else {
        mapa1.getView().setZoom(mapa2.getView().getZoom());
    }
}
//FUNCION PARA IGUALAR EL CENTRO DE LA VISTA 1 A LA 2 Y VICEVERSA
function sincronizarCentro(evento) {
    if (evento.target == mapa1.getView()) {
        mapa2.getView().setCenter(mapa1.getView().getCenter());
    } else {
        mapa1.getView().setCenter(mapa2.getView().getCenter());
    }
}
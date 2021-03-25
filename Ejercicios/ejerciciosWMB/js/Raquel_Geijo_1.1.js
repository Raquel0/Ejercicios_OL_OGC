//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
    init_Mapa1();
    init_Mapa2();
}


//FUNCION PARA INICIALIZAR EL MAPA DE ARRIBA
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    mapa1 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
                title: 'capa1'
            })
        ],
        target: 'Mapa1'
    });
}

//FUNCION PARA INICIALIZAR EL MAPA ABAJO
function init_Mapa2() {
    mapa2 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                title: 'capa1'
            })
        ],
        target: 'Mapa2'
    });

}
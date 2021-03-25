//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
    init_Mapa1();
    init_Mapa2();
}

//FUNCION PARA INICIALIZAR EL MAPA DE ARRIBA
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    var bingApiKey = "AoqHQ_lF0XVJw-wQgHZa-nD_s49vCYuKDLzXriH-cgFPpI0l8bVw_C__Af5BNLnM";

    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 4,
            center: [-223293, 5247800],
        }),
        target: 'Mapa1',
        layers: [new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: bingApiKey,
                    imagerySet: 'CanvasGray'
                }),
                title: 'CanvasGray'
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
                opacity: 0.5
            })
        ]
    });
}

//FUNCION PARA INICIALIZAR EL MAPA DE ABAJO
function init_Mapa2() {
    //Crear mapa en el elemento DOM
    var bingApiKey = "AoqHQ_lF0XVJw-wQgHZa-nD_s49vCYuKDLzXriH-cgFPpI0l8bVw_C__Af5BNLnM";

    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 4,
            center: [-223293, 5247800],
        }),
        target: 'Mapa2',
        layers: [new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
            }),
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: bingApiKey,
                    imagerySet: 'CanvasGray'
                }),
                title: 'CanvasGray',
                opacity: 0.5
            })
        ]
    });
}
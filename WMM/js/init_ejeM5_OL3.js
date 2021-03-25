function init() {
    init_Mapa1_nTiles();
    init_Mapa2_1Tile();
}

//CARGAR EL MAPA CON TESELAS
//BLOQUES DE 256*256 PIXELES
function init_Mapa1_nTiles() {
    //Crear mapa en el elemento DOM
    var mapa1 = new ol.Map({
        //TARGET
        target: 'Mapa1',
        //LAYER GROUP
        layers: [new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                params: {
                    LAYERS: 'basic'
                }

            })
        })],
        //VIEW
        view: new ol.View({
            //CAMBIO DE PROYECCION, ESTE SERVIDOR NO DA PROYECCION EPSG:3857
            projection: 'EPSG:4326',
            zoom: 5,
            center: [1, 40]
        })
    });
}

//CARGAR TODO EL MAPA DE GOLPE
function init_Mapa2_1Tile() {
    //Crear mapa en el elemento DOM
    var mapa1 = new ol.Map({
        //TARGET
        target: 'Mapa2',
        //LAYER GROUP
        layers: [new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                params: {
                    LAYERS: 'basic',
                    TILED: 'false'
                }
            })
        })],
        //VIEW
        view: new ol.View({
            projection: 'EPSG:4326',
            zoom: 5,
            center: [1, 40]
        })
    });
}
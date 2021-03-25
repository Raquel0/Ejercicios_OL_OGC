function init() {
    //Crear mapa en el elemento DOM
    var mapa = new ol.Map({
        target: 'Mapa1',
        view: new ol.View({
            zoom: 4,
            projection: 'EPSG:4326',
            center: [-100, 42]
        }),
        layers: [
            //CAPA WMS
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                    params: {
                        LAYERS: 'basic'
                    }
                })
            }),
            //CAPA VECTORIAL DE UN ARCHIGO GeoJSON
            new ol.layer.Vector({
                //OJO: SOURCE DE TIPO CLUSTER
                source: new ol.source.Vector({
                    url: './res/states.json',
                    format: new ol.format.GeoJSON()
                })
            })
        ]
    });
}
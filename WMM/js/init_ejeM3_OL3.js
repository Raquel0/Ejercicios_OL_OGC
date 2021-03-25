function init() {
    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 5,
            center: ol.proj.fromLonLat([-3, 42])

        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'Mapa1',
    });
    //transformacion de coordenadas al sistema que quiero para usarl la imagen
    var extentImagen = ol.proj.transformExtent([-6.80527, 35.10721816, -0.61306, 37.94758957], 'EPSG:4326', 'EPSG:3857');
    var nuevaCapa = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './res/S2A_OPER_BWI_MSIL1C_PDMC_20160514T220104_R094_V20160514T110529_20160514T110529.png',
            imageExtent: extentImagen
        })
    });
    mapa.addLayer(nuevaCapa);

    var extentImagen2 = ol.proj.transformExtent([-2.53, 41.88, -0.66, 43.35], 'EPSG:4326', 'EPSG:3857');
    var nuevaCapa = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './res/IDENA-mapaBase_orto.png',
            imageExtent: extentImagen2
        })
    });
    mapa.addLayer(nuevaCapa);

}
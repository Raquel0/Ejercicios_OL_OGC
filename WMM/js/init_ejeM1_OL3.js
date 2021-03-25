function init() {
    //Crear mapa en el elemento DOM
    var bingApiKey = "AoqHQ_lF0XVJw-wQgHZa-nD_s49vCYuKDLzXriH-cgFPpI0l8bVw_C__Af5BNLnM";

    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 4,
            center: [-223293, 5247800]
        }),
        target: 'Mapa1',
        layers: [new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: bingApiKey,
                imagerySet: 'CanvasGray'
            }),
            title: 'CanvasGray'
        })]
    });
}
function init() {
    init_Mapa1();
    init_Mapa2();
}

function init_Mapa1() {
    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 5,
            center: [1252000, 7240000]
        }),
        layers: [new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            }),
            preload: Infinity
        })],
        target: 'Mapa1'
    });
}


function init_Mapa2() {
    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 5,
            center: [1252000, 7240000]
        }),
        layers: [new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            }),
        })],
        target: 'Mapa1'
    });
}
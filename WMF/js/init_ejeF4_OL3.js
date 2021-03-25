//INICIALIZO UN MAPA CON DOS CAPAS
//un mapa base obtenido de OSM y una capa vectorial obtenida a partir de una llamada
//GetFeature a un servidor WFS
function init() {
    //Crear mapa en el elemento DOM
    var mapa = new ol.Map({
        target: 'Mapa1',
        view: new ol.View({
            zoom: 5,
            center: ol.proj.fromLonLat([0, 42])
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    format: new ol.format.WFS(),
                    url: 'http://geoservices.brgm.fr/geologie?request=GetFeature&service=WFS&typename=ms:MINES_PT&version=1.1.0&srsName=EPSG:3857',
                    strategy: ol.loadingstrategy.all
                })
            })
        ]
    });
}
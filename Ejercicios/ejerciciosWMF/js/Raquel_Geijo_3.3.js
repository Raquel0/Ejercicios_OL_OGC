//IMPORTAR FEATURES DESDE UN ARCHIVO JSON
//CADA FEATURE REPRESENTA UN PAÍS
function init() {
    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 2,
            center: [0, 0]
        }),
        target: 'Mapa1',
        layers: [
            //CAPA DE MAPA BSAE
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            //CAPA VECTORIAL CON LAS FEATURES DEL ARCHIVO JSON
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: './res/countries.json',
                    format: new ol.format.GeoJSON(),
                    title: 'ciudades'
                })
            })
        ]
    });
}
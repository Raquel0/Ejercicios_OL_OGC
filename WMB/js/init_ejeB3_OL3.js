function init() {
    //Comenzar estableciendo algunas opciones del mapa
    var map = new ol.Map({
        view: new ol.View({
            zoom: 4,
            projection: 'EPSG:3857',
            maxZoom: 6,
            minZoom: 3,
            rotation: 0.34,
            center: [-10800000, 4510000]
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'Mapa1'
    });
    //MOSTRAR COORDENADAS DEL RATON
    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(2),
        projection: 'EPSG:4326'
    });
    map.addControl(mousePositionControl);

}
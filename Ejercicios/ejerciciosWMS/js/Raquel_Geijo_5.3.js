function init() {
    //Crear mapa en el elemento DOM
    var bingApiKey = "AoqHQ_lF0XVJw-wQgHZa-nD_s49vCYuKDLzXriH-cgFPpI0l8bVw_C__Af5BNLnM";
    mapa = new ol.Map({
        view: new ol.View({
            zoom: 4,
            center: [-223293, 5247800]
        }),
        target: 'Mapa1',
        layers: [
            //CAPA MAPA BASE BING
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: bingApiKey,
                    imagerySet: 'CanvasGray',
                    opacity: 0.8,
                }),
                title: 'CanvasGray'
            }),
            //CAPA DE FEATURES DE CIUDADES DEL MUNDO
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: './res/world_cities.json',
                    format: new ol.format.GeoJSON()
                }),
            })
        ]
    });
}

function changeProp() {
    //DEFINICION DE PROPIEDADES
    //propiedad tamaño
    var radio = Number(document.getElementById("size").value);
    //relleno
    var fill = new ol.style.Fill({
        color: 'rgba(255,255,255,0.8)'
    });
    //propiedad contorno
    var colores = ['#ff0000', '#ffff00', '#40ff00', '#00bfff', '#8000ff', '#ff0040'];
    var stroke = new ol.style.Stroke({
        color: colores[Number(document.getElementById("colorSelection").value)]
    });
    var nuevoEstilo =
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: radio
            })
        });
    //ARRAY DE CAPAS
    var arrayCapas = mapa.getLayers().getArray();
    arrayCapas[1].setStyle(nuevoEstilo);
    /*    
    //QUITO LA CAPA ANTERIOR
    mapa.removeLayer(mapa.getLayers().getArray()[1]);
    //AÑADO LA CAPA CON LAS NUEVAS PROPIEDADES
    mapa.addLayer(
        new ol.layer.Vector({
            source: new ol.source.Vector({
                url: './res/world_cities.json',
                format: new ol.format.GeoJSON
            }),
            //NO APLICO UN ESTILO FIJO. CARGO EL ESTILO QUE SE DEFINE CON LAS ELECCIONES
            style: nuevoEstilo
        })
    );
*/
}
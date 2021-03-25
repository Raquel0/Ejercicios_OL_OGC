//MAPA BASO CON UNA CAPA OSM Y OTRA VECTORIAL
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
                }),
                //HASTA AQUI CARGAR CAPAS COMO SIEMPRE: OL Y JSON
                //NO APLICO UN ESTILO FIJO. LLAMO A UNA FUNCION
                style: aplicaEstilo
            })
        ]
    });
}

//DEFINICION DEL FORMATO DE ESTILO QUE SE VA A PONER CUANDO LLAMA A LA FUNCION APLICAESTILO
function aplicaEstilo(feature) {

    //COLORES QUE VOY A AOLICAR EN FUNCION DE UN PARAMETRO
    var colores = ['rgba(102, 0, 41, 0.5)', 'rgba(53, 0, 61,0.5)', 'rgba(230, 0, 92,0.5)', 'rgba(255, 77, 148,0.5)', 'rgba(255, 128, 179,0.5)', 'rgba(255, 179, 209,0.5)', 'rgba(255, 230, 240,0.5)'];
    var rango = []
    if (feature.get('DP0010001') < 1000000) {
        rango = 0;
    } else if (feature.get('DP0010001') < 3000000) {
        rango = 1;
    } else if (feature.get('DP0010001') < 5000000) {
        rango = 2;
    } else if (feature.get('DP0010001') < 8000000) {
        rango = 3;
    } else if (feature.get('DP0010001') < 10000000) {
        rango = 4;
    } else if (feature.get('DP0010001') < 20000000) {
        rango = 5;
    } else {
        rango = 6;
    }

    var stroke = new ol.style.Stroke({
        color: '#262626',
        width: 1.25
    });

    //RELLENO
    var fill = new ol.style.Fill({
        color: colores[rango]
    });

    //ESTILO QUE SE VA A APLICAR CUANDO HAGA LA LLAMADA DESDE EL MAPA
    var nuevoEstilo =
        new ol.style.Style({
            //RELLENO BLANCO CON TRANSPARENCIA QUE HABIA DEFINIDO ANTES
            fill: fill,
            //BORDE EN FUNCION DE LA POBLACION
            stroke: stroke,
        });
    //MANDO EL ESTILO AL MAPA YA CONSTRUIDO
    return nuevoEstilo;
}
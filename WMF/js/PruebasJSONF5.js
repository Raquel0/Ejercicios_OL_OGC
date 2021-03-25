//IMPORTAR FEATURES DESDE UN ARCHIVO JSON
//CADA FEATURE REPRESENTA UNA CIUDAD CON EL ESTILO POR DEFECTO
function init() {
    var mapa = new ol.Map({
        view: new ol.View({
            zoom: 8,
            center: ol.proj.transform([-3.55727334406955, 37.195149967178295], 'EPSG:4326', 'EPSG:3857')
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
                    url: './res/panoramicasPRUEBAS3857.geojson',
                    format: new ol.format.GeoJSON(),
                    title: 'ciudades'
                })
            })
        ]
    });
    //guardo en la variable select lo que ocurre con ol.interaction.Select
    //al hacer click ol.events.condition.click en un elemento de la capa 
    //de features mapa.getLayers().getArray()[1]
    var select = new ol.interaction.Select({
        condition: ol.events.condition.click,
        layers: [mapa.getLayers().getArray()[1]]
    });
    //EVENTO DE SELECCION A FEATURES
    //CUANDO HAGA CLICK SE EJECUTA LA FUNCION cambiarEstilo
    mapa.addInteraction(select);
    select.on('select', cambiarEstilo, this);

    //propiedad relleno
    var fill = new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    });
    //propiedad contorno
    var stroke = new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    });
    //caracter�sticas del estilo normal
    estiloNormal = [
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                //RADIO DEL CIRCULO PEQUE�O CUANDO NO ESTA SELECCIONADO
                radius: 5
            }),
            fill: fill,
            stroke: stroke
        })
    ];
    //caracter�sticas del estilo seleccionado
    estiloSeleccionado = [
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                //RADIO DEL CIRCULO GRANDE CUANDO ESTA SELECCIONADO
                radius: 10
            }),
            fill: fill,
            stroke: stroke
        })
    ];

}

function cambiarEstilo(evento) {
    //cuando deja de estar seleccionado un elemento (feature)
    //lo guardo en desesectedFeature y si es true le pongo
    //el estilo para elemento deseleccionado
    var deselectedFeature = evento.deselected[0];
    if (deselectedFeature) {
        deselectedFeature.setStyle(estiloNormal);
    }
    //cuando esta seleccionado un elemento (feature)
    //lo guardo en selectedFeature y si es true le pongo
    //el estilo para elemento seleccionado
    var selectedFeature = evento.selected[0];
    if (selectedFeature) {
        selectedFeature.setStyle(estiloSeleccionado)
    }
}
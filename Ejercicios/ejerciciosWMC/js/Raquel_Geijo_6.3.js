//IMPORTAR FEATURES DESDE UN ARCHIVO JSON
//CADA FEATURE REPRESENTA UNA CIUDAD CON EL ESTILO POR DEFECTO
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
                    url: './res/world_cities.json',
                    format: new ol.format.GeoJSON(),
                    title: 'ciudades'
                })
            })
        ]
    });
    //OPCION PARA PERMITIR SELECCIONAR UNA FEATURE ol.interaction.Select
    //1º EVENTO DE SELECCION A FEATURES
    var select = new ol.interaction.Select({
        //guardo en la variable select lo que ocurre con ol.interaction.Select
        //al hacer click ol.events.condition.click en un elemento de la capa 
        //de iconos mapa.getLayers().getArray()[1]
        condition: ol.events.condition.click,
        layers: [mapa.getLayers().getArray()[1]]
    });
    //2º AÑADO EL EVENTO DE UN CLICK AL MAPA
    mapa.addInteraction(select);
    //1º DEFINO LA INTERACCION DE TRASLADAR
    translateInteraction = new ol.interaction.Translate({
        features: select.getFeatures()
    });
    //2º AÑADO LA INTERACCION AL MAPA
    mapa.addInteraction(translateInteraction);

    //CUANDO TENGO TODO CREADO Y AÑADIDO AL MAPA LE DIGO QUE HAGA LAS COSAS
    select.on('select', translateInteraction, this);

}
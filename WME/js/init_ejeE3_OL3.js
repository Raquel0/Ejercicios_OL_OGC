//FUNCION PARA CARGAR UN MAPA BASE DE OL Y UNA CAPA DE FEATURES JSON
function init() {
    mapa = new ol.Map({
        target: 'Mapa1',
        view: new ol.View({
            zoom: 4,
            projection: 'EPSG:4326',
            center: [0, 42]
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                    params: {
                        LAYERS: 'basic'
                    }
                })
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    format: new ol.format.GeoJSON(),
                    url: './res/world_cities.json'
                })
            })
        ]
    });
    //DE LA CAPA QUE ESTA EN LA POSICION 1 DEL ARRAY DE CAPAS
    //CUANDO OCURRE CADA EVENTO ADDFEATURE, LLAMO A LA FUNCIO INCREMENTA NUMERO
    mapa.getLayers().getArray()[1].getSource().on('addfeature', incrementaNumero);


    //Definimos el numero de features añadidas como global
    numFeatures = 0;

    //CREO EL EVENTO DE SELECCION A FEATURES
    //CUANDO HAGA 1 CLICK SOBRE LA CAPA DE POSICION 1 DEL ARRAY DE CAPAS
    //OPCION PARA PERMITIR SELECCIONAR UNA FEATURE ol.interaction.Select
    interaccionSelect = new ol.interaction.Select({
        //guardo en la variable interaccionSelect lo que ocurre con ol.interaction.Select
        //al hacer click ol.events.condition.click en un elemento de la capa 
        //de iconos mapa.getLayers().getArray()[1]
        condition: ol.events.condition.singleClick,
        layers: [mapa.getLayers().getArray()[1]]
    });
    //AÑADO EL EVENTO DE SELECCION AL MAPA
    //EVENTO DE SELECCION A FEATURES
    mapa.addInteraction(interaccionSelect);
    //CUANDO OCURRE EL EVENTO QUE ACABO DE DEFINIR
    //LLAMA A LA FUNCION ELIMINAFEATURE
    interaccionSelect.on('select', eliminaFeature, this);
}

//CONTADOR QUE IRA CRECIENDO CUANDO CARGO FEATURES
//LO MUESTRO EN EL FORM DEL HTML QUE SE LLAMA CUENTA
function incrementaNumero() {
    numFeatures++;
    document.getElementById("cuenta").innerHTML = numFeatures.toString()
}
//RESTAR AL CONTADOR Y QUITAR LA FEATURE,SE USA AL SELSCCIONAR CON UN CLICK
function eliminaFeature(evento) {
    //RECOJO LA INFORMACION DE LA FEATURE SELECCIONADA
    var featureSeleccionada = evento.selected[0];
    //SI ESTA SELECCIONADA, LA BORRO Y LIMPIO LA VARIABLE FEATURESELECCIONADA
    if (featureSeleccionada) {
        mapa.getLayers().getArray()[1].getSource().removeFeature(featureSeleccionada);
        interaccionSelect.getFeatures().clear();
        //MENOS UNO EN EL CONTADOR QUE SE MUESTRA EN EL FORM
        numFeatures--;
        //ACTUALIZO EL CONTADOR DEL FORM
        document.getElementById("cuenta").innerHTML = numFeatures.toString()
    }
}
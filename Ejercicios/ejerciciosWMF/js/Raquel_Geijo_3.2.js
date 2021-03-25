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
    //VARIABLE OVERLAY QUE REPRESENTA AL CONTENEDOR DIV CON ID OVERLAY EN EL HTML
    //COMO EST� VACIO NO SE VISUALIZA NADA
    overlay = new ol.Overlay({
        element: document.getElementById("overlay")
    });
    //a�adir el overlay al mapa
    mapa.addOverlay(overlay);
    //OPCION PARA PERMITIR SELECCIONAR UNA FEATURE ol.interaction.Select
    var select = new ol.interaction.Select({
        //guardo en la variable select lo que ocurre con ol.interaction.Select
        //al hacer click ol.events.condition.click en un elemento de la capa 
        //de iconos mapa.getLayers().getArray()[1]
        condition: ol.events.condition.click,
        layers: [mapa.getLayers().getArray()[1]]
    });
    //EVENTO DE SELECCION A FEATURES
    //CUANDO HAGA CLICK SE EJECUTA LA FUNCION creaPopUp
    mapa.addInteraction(select);
    select.on('select', creaPopUp, this);
}

//FUNCION QUE CREA LOS POPUPS
function creaPopUp(evento) {
    //RECOJO LA INFORMACION DE LA FEATURE SELECCIONADA
    var selectedFeature = evento.selected[0];
    if (selectedFeature) {
        ////LE DIGO QUE LA POSICION DEL POPUP SERA AL LADO DE LA FEATURE SELECCIONADA
        var posicion = selectedFeature.getGeometry().getExtent();
        overlay.setPosition([0.5 * posicion[0] + 0.5 * posicion[2], 0.5 * posicion[1] + 0.5 * posicion[3]])
        var pais = selectedFeature.get("CNTRY_NAME");
        var ciudad = selectedFeature.get("CITY_NAME");

        //CONSTRUIR EL TEXTO A MOSTRAR DENTRO DE LA PROPIEDAD INNERHTML DEL CONTENEDOR OVERLAY
        var texto = "<p><strong>Pais:</strong> " + pais + "<br/>"
        texto = texto + "<strong>Ciudad:</strong>" + ciudad + "</p>"
        document.getElementById("overlay").innerHTML = texto;
    } else {
        overlay.setPosition(undefined);
    }
}
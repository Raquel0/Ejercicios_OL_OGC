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
    var select = new ol.interaction.Select({
        //guardo en la variable select lo que ocurre con ol.interaction.Select
        //al hacer click ol.events.condition.click en un elemento de la capa 
        //de iconos mapa.getLayers().getArray()[1]
        condition: ol.events.condition.click,
        layers: [mapa.getLayers().getArray()[1]]
    });
    //EVENTO DE SELECCION A FEATURES
    //CUANDO HAGA CLICK SE EJECUTA LA FUNCION
    mapa.addInteraction(select);
    select.on('select', actualizaClick, this);
}

//DATOS DEL CLICK
function actualizaClick(evento) {
    //RECOJO LA INFORMACION DE LA FEATURE SELECCIONADA
    var selectedFeature = evento.selected[0];
    //SI HAY ALGUNA SELECCIONADA, SE EJECUTA ESTE TROZO
    if (selectedFeature) {
        //EXTRAIGO DEL JSON JUSTO LOS CAMPOS QUE QUIERO
        var pais = selectedFeature.get("CNTRY_NAME");
        var ciudad = selectedFeature.get("CITY_NAME");
        var poblacion = selectedFeature.get("POP_CLASS");

        //CONSTRUIR EL TEXTO A MOSTRAR DENTRO DE LA PROPIEDAD
        //INNERHTML DEL CONTENEDOR CORRESPONDIENTE
        document.getElementById("pais").innerHTML = pais;
        document.getElementById("ciudad").innerHTML = ciudad;
        document.getElementById("poblacion").innerHTML = poblacion;
    }
}
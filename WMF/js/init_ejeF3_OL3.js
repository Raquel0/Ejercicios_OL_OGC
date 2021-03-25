//INICIALIZO EL MAPA CON UNA CAPA BASE Y LLAMO A LAS FUNCIONES POSTERIORES
function init() {
    mapa = new ol.Map({
        view: new ol.View({
            zoom: 2,
            center: [0, 0]
        }),
        target: 'Mapa1',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ]
    });
    crearCapaPuntos();
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

//CREAR PUNTOS ALEATORIOS Y ASIGNAR UN ICONO TAMBIEN ALEATORIO
function crearCapaPuntos() {
    // Create some random features
    var icons = [
        "caiman.png",
        "serpiente.png",
        "tortuga.png",
        "huevos.png"
    ];
    // Creamos puntos al azar COMO EL EJERCICIO ANTERIOR
    var arrayPuntos = [];
    for (var i = 0; i < 150; i++) {
        //icon es un indice (numero aleatorio) que voy a usar para elegir un icono aleatorio del array
        var icon = Math.floor(Math.random() * icons.length);
        //COORDENADAS
        var px = Math.random() * 360 - 180;
        var py = Math.random() * 170 - 85;
        //GEOMETRIA DENTRO DE FEATURE
        // Creamos una posici�n: longitud latitud y la transformamos en la proyecci�n del mapa.
        var puntoFeature = new ol.Feature(new ol.geom.Point(ol.proj.transform([px, py], 'EPSG:4326', 'EPSG:3857')));
        //CARACTERISTICAS NUEVAS AL FEATURE PUNTO: ID Y UNA IMAGEN ALEATORIA
        puntoFeature.setId(i);
        var estilo = new ol.style.Style({
            image: new ol.style.Icon({
                src: './res/' + icons[icon]
            })
        });
        puntoFeature.setStyle(estilo);
        arrayPuntos.push(puntoFeature);
    }
    //CAPA VECTORIA Y A�adimos las caracter�sticas a la capa
    mapa.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            features: arrayPuntos
        })
    }))
}

//FUNCION QUE CREA LOS POPUPS
function creaPopUp(evento) {
    //RECOJO LA INFORMACION DE LA FEATURE SELECCIONADA
    var selectedFeature = evento.selected[0];
    if (selectedFeature) {
        ////LE DIGO QUE LA POSICION DEL POPUP SERA AL LADO DE LA FEATURE SELECCIONADA
        var posicion = selectedFeature.getGeometry().getExtent();
        overlay.setPosition([0.5 * posicion[0] + 0.5 * posicion[2], 0.5 * posicion[1] + 0.5 * posicion[3]])
        //document.getElementById("overlay").style.visibility = "visible";
        var centro = ol.extent.getCenter(selectedFeature.getGeometry().getExtent());
        //CONSTRUIR EL TEXTO A MOSTRAR DENTRO DE LA PROPIEDAD INNERHTML DEL CONTENEDOR OVERLAY
        var texto = "<p><strong>Caracter�stica:</strong> " + selectedFeature.getId() + "<br/>"
        texto = texto + "<strong>Ubicaci�n:</strong>" + centro + "</p>"
        document.getElementById("overlay").innerHTML = texto;
    } else {
        overlay.setPosition(undefined);
    }
}
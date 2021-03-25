function init() {
    var mapa = new ol.Map({
        //TARGET
        target: 'Mapa1',
        //LAYER GROUP
        layers: [new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                    params: {
                        LAYERS: 'ground_01'
                    }

                })
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: './res/states.json',
                    format: new ol.format.GeoJSON()
                }),
            })
        ],
        //VIEW
        view: new ol.View({
            //CAMBIO DE PROYECCION, ESTE SERVIDOR NO DA PROYECCION EPSG:3857
            projection: 'EPSG:4326',
            zoom: 4,
            center: [-100, 42]
        })
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

    // ************************************
    // ****** SI COMENTO DESDE AQUI  ****** 
    select.on('select', cambiarEstilo, this);

    //DEFINO LAS PROPIEDADES INICIALES
    //propiedad relleno
    var fill0 = new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    });
    //propiedad contorno
    var stroke0 = new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    });

    //DEFINO LAS PROPIEDADES NUEVAS
    //propiedad relleno
    var fill1 = new ol.style.Fill({
        color: 'rgba(255,100,100,0.4)'
    });
    //propiedad contorno
    var stroke1 = new ol.style.Stroke({
        color: '#ff0040',
        width: 3
    });
    //DEFINO LOS ESTILOS
    estiloNormal = [
        new ol.style.Style({
            fill: fill0,
            stroke: stroke0
        })
    ];

    estiloSeleccionado = [
        new ol.style.Style({
            fill: fill1,
            stroke: stroke1
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
    // ******    HASTA AQUI TODO, Y DEJO SOLO EL PRINCIPIO       ****** 
    // ****** FUNCIONA PERFECTAMENTE CON LOS COLORES POR DEFECTO ****** 
}
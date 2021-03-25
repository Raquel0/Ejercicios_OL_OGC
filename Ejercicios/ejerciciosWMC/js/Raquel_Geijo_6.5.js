//CADA FEATURE REPRESENTA UNA CIUDAD CON EL ESTILO POR DEFECTO
function init() {
    mapa = new ol.Map({
        view: new ol.View({
            zoom: 4,
            center: ol.proj.fromLonLat([1, 40])
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
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    title: 'MisCiudades',
                }),
            })
        ]
    });
    //EVENTO DE SELECCION A FEATURES
    var select = new ol.interaction.Select({
        condition: ol.events.condition.click,
        layers: [mapa.getLayers().getArray()[1]]
    });
    //CUANDO HAGA CLICK SE EJECUTA LA FUNCION cambiarCapa
    mapa.addInteraction(select);
    select.on('select', cambiarCapa, this);

    //DEFINICION DE PROPIEDADES
    //relleno
    var fill = new ol.style.Fill({
        color: 'rgba(255,100,100,0.4)'
    });
    //propiedad contorno
    var stroke = new ol.style.Stroke({
        color: 'rgba(255,100,100,0.9)'
    });

    nuevoEstilo =
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 10
            })
        });
}

function cambiarCapa(evento) {
    arrayCapas = mapa.getLayers().getArray();
    MisCiudades = arrayCapas[2]
    selected = evento.selected[0];
    feature = selected.clone();
    MisCiudades.getSource().addFeature(feature);
    MisCiudades.setStyle(nuevoEstilo);
    //para ver si realmente me cambia de capa la seleccion
    //mapa.getLayers().getArray()[1].setVisible(false);
}
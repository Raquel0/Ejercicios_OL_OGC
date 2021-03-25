//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
    init_Mapa1();
    init_Mapa2();
    init_Mapa3();
}
//FUNCIONES PARA INICIALIZAR LOS 3 MAPAS
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    mapa1 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            //open layer mapa base
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                title: 'OpenStreetMaps'
            }),

        ],
        target: 'Mapa1'
    });
}

function init_Mapa2() {
    //Crear mapa en el elemento DOM
    mapa2 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            //orto
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    //faltaba el guion de cgi-bin
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
                title: 'WMS'
            }),

        ],
        target: 'Mapa2'
    });
}

function init_Mapa3() {
    //Crear mapa en el elemento DOM
    mapa3 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            //poblacion
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: "http://sedac.ciesin.columbia.edu/geoserver/wms",
                    params: {
                        'LAYERS': 'gpw-v3:gpw-v3-population-density_2000'
                    },
                    visible: false
                }),
                title: 'Population Density'
            })
        ],
        target: 'Mapa3'
    });
}


//FUNCIONES PARA LOS CHECKBOXES. PONER Y QUITAR MAPAS
function updateCheckCapa1() {
    var seleccionado = document.getElementById('checkcapa1').checked;
    var arrayCapas = mapa1.getLayers().getArray();
    arrayCapas[0].setVisible(seleccionado);
}

function updateCheckCapa2() {
    var seleccionado = document.getElementById('checkcapa2').checked;
    var arrayCapas = mapa2.getLayers().getArray();
    arrayCapas[0].setVisible(seleccionado);
}

function updateCheckCapa3() {
    var seleccionado = document.getElementById('checkcapa3').checked;
    var arrayCapas = mapa3.getLayers().getArray();
    arrayCapas[0].setVisible(seleccionado);
}
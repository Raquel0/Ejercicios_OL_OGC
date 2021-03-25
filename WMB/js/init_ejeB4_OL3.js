//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
    init_Mapa1();
    init_Mapa2();
}


//FUNCION PARA INICIALIZAR EL MAPA DE LA IZQUIERDA
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    mapa1 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                title: 'capa1'
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
                title: 'capa2',
                opacity: 0.5
            })
        ],
        target: 'Mapa1'
    });
}

//FUNCION PARA INICIALIZAR EL MAPA DE LA DERECHA
function init_Mapa2() {
    mapa2 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 4
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                title: 'capa1'
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
                title: 'capa2',
                visible: false
            })
        ],
        target: 'Mapa2'
    });

}

//FUNCIONES PARA LOS CHECKBOXES. PONER Y QUITAR CAPAS
function updateCheckCapa1() {
    var seleccionado = document.getElementById('checkcapa1').checked;
    var arrayCapas = mapa1.getLayers().getArray();
    arrayCapas[0].setVisible(seleccionado);
}

function updateCheckCapa2() {
    var seleccionado = document.getElementById('checkcapa2').checked;
    var arrayCapas = mapa1.getLayers().getArray();
    arrayCapas[1].setVisible(seleccionado);
}

//FUNCION PARA RADIOBUTTON. ELEGIR UNA CAPA Y OTRA, NUNCA LAS DOS A LA VEZ
function updateRadio1() {
    var seleccionado = document.getElementById('radiocapa1').checked;
    var arrayCapas = mapa2.getLayers().getArray();
    arrayCapas[0].setVisible(seleccionado);
    arrayCapas[1].setVisible(!seleccionado);
}
//CARGAR LOS MAPAS EN CAPAS
function init_Mapa1() {
    //Crear mapa en el elemento DOM
    //CIUDADO: Se crea como variable global para que los eventos puedan modificarlo
    mapa1 = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 5
        }),
        layers: [
            //open layer mapa base
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                zIndex: 2,
                title: 'OpenStreetMaps'
            }),
            //orto
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    //faltaba el guion de cgi-bin
                    url: 'http://demo.mapserver.org/cgi-bin/wms',
                    params: {
                        'LAYERS': 'bluemarble'
                    },
                }),
                zIndex: 1,
                title: 'WMS'
            }),
            //poblacion
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: "http://sedac.ciesin.columbia.edu/geoserver/wms",
                    params: {
                        'LAYERS': 'gpw-v3:gpw-v3-population-density_2000'
                    },
                    visible: false
                }),
                zIndex: 0,
                title: 'Population Density'
            })
        ],
        target: 'Mapa1'
    });

}

//LLEVAR CAPA A ARRIBA DEL TODO CAMBIANDO ZINDEX
function topLayer() {
    //variable layerName en la que guardamos
    //el valor del elemento seleccionado en la lista desplegable
    var layerName = document.getElementById('sLayerSelection').value;
    //array llamado arrayCapas que contiene todas las capas del mapa
    var arrayCapas = mapa1.getLayers().getArray();
    //variale numberLayers que contiene el número de capas del array
    var numberLayers = arrayCapas.length;
    //variable currentZIndex en la que guardaremos el valor del zIndex
    //de la capa que queremos llevar arriba del todo (lo dejamos vacío,
    //ya que todavía no sabemos cuál será
    var currentZIndex;
    //recorrer cada elemento del array. Para cada elemento del array
    //consultaremos su título y veremos si coincide con layerName.
    //Si coincide es que ya la hemos encontrado y podemos obtener su ZIndex
    for (var i = 0; i < numberLayers; i++) {
        if (arrayCapas[i].get('title') == layerName) {
            currentZIndex = arrayCapas[i].getZIndex();
        }
    }
    //realizar un segundo recorrido del array. Para cada elemento volveremos
    //a consultar el título de la capa. Queremos hacer dos cosas
    //**Si es la capa que queremos llevar arriba, le cambiaremos su
    //ZIndex a numberLayers-1.
    //**Si no es la capa que queremos llevar arriba pero anteriormente
    //estaba, tendremos que decrementar su zIndex
    for (var i = 0; i < numberLayers; i++) {
        if (arrayCapas[i].get('title') == layerName) {
            arrayCapas[i].setZIndex(numberLayers - 1);
        } else if (arrayCapas[i].getZIndex() > currentZIndex) {
            arrayCapas[i].setZIndex(arrayCapas[i].getZIndex() - 1);
        }
    }
}


//LLEVAR CAPA A ABAJO DEL TODO CAMBIANDO ZINDEX
function bottomLayer() {
    //variable layerName en la que guardamos
    //el valor del elemento seleccionado en la lista desplegable
    var layerName = document.getElementById('sLayerSelection').value;
    //array llamado arrayCapas que contiene todas las capas del mapa
    var arrayCapas = mapa1.getLayers().getArray();
    //variale numberLayers que contiene el número de capas del array
    var numberLayers = arrayCapas.length;
    //variable currentZIndex en la que guardaremos el valor del zIndex
    //de la capa que queremos llevar arriba del todo (lo dejamos vacío,
    //ya que todavía no sabemos cuál será
    var currentZIndex;
    //recorrer cada elemento del array. Para cada elemento del array
    //consultaremos su título y veremos si coincide con layerName.
    //Si coincide es que ya la hemos encontrado y podemos obtener su ZIndex
    for (var i = 0; i < numberLayers; i++) {
        if (arrayCapas[i].get('title') == layerName) {
            currentZIndex = arrayCapas[i].getZIndex();
        }
    }
    //realizar un segundo recorrido del array. Para cada elemento volveremos
    //a consultar el título de la capa. Queremos hacer dos cosas
    //**Si es la capa que queremos llevar abajo, le cambiaremos su
    //ZIndex a 0.
    //**Si no es la capa que queremos llevar abajo pero anteriormente
    //estaba, tendremos que incrementar su zIndex
    for (var i = 0; i < numberLayers; i++) {
        if (arrayCapas[i].get('title') == layerName) {
            arrayCapas[i].setZIndex(0);
        } else if (arrayCapas[i].getZIndex() < currentZIndex) {
            arrayCapas[i].setZIndex(arrayCapas[i].getZIndex() + 1);
        }
    }
}

//SUBIR CAPA UNA POSICION
function raiseLayer() {
    //elemento seleccionado en la lista desplegable
    var layerName = document.getElementById('sLayerSelection').value;
    //array que contiene las capas
    var arrayCapas = mapa1.getLayers().getArray();
    //numero total de capas del array
    var numberLayers = arrayCapas.length;
    //indice de la capa a mover
    var currentZIndex;
    //obtengo nombre y posicion de la capa seleccionada
    for (var i = 0; i < numberLayers; i++) {
        if (arrayCapas[i].get('title') == layerName) {
            currentZIndex = arrayCapas[i].getZIndex();
        }
    }
    //Si no está arriba del todo
    //**si es la capa elegida la subo una posicion
    //**si la capa esta en la posicion +1, se asigno la posicion de mi capa
    if (currentZIndex < numberLayers - 1) {
        for (var i = 0; i < numberLayers; i++) {
            if (arrayCapas[i].get('title') == layerName) {
                arrayCapas[i].setZIndex(currentZIndex + 1);
            } else if (arrayCapas[i].getZIndex() == currentZIndex + 1) {
                arrayCapas[i].setZIndex(currentZIndex);
            }
        }
    }
}

//BAJAR CAPA UNA POSICION
function lowerLayer() {
    //elemento seleccionado en la lista desplegable
    var layerName = document.getElementById('sLayerSelection').value;
    //array que contiene las capas
    var arrayCapas = mapa1.getLayers().getArray();
    //numero total de capas del array
    var numberLayers = arrayCapas.length;
    //indice de la capa a mover
    var currentZIndex;
    //obtengo nombre y posicion de la capa seleccionada
    for (var i = 0; i < numberLayers; i++) {
        if (arrayCapas[i].get('title') == layerName) {
            currentZIndex = arrayCapas[i].getZIndex();
        }
    }
    //Si no está abajo del todo
    //**si es la capa elegida la bajo una posicion
    //**si la capa esta en la posicion -1, se asigno la posicion de mi capa
    if (currentZIndex > 0) {
        for (var i = 0; i < numberLayers; i++) {
            if (arrayCapas[i].get('title') == layerName) {
                arrayCapas[i].setZIndex(currentZIndex - 1);
            } else if (arrayCapas[i].getZIndex() == currentZIndex - 1) {
                arrayCapas[i].setZIndex(currentZIndex);
            }
        }
    }
}
//INICIALIZO EL MAPA CON UNA CAPA BASE Y LLAMO A LAS FUNCIONES POSTERIORES
//SE CREA EL MAPA COMO VARIABLE GLOBAL PARA PODER A�ADIR LUEGO CAPAS
function init() {
    mapa = new ol.Map({
        view: new ol.View({
            zoom: 2,
            center: [-2719935, 3385243]
        }),
        target: 'Mapa1',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'toner'
                }),
                opacity: 0.5
            })
        ]
    });
    crearCapaPuntos();
    crearCapaLineas();
    crearCapaPoligonos();
}

//contendr� 50 puntos localizados aleatoriamente en el mapa
function crearCapaPuntos() {
    //ARRAY VACIO DE PUNTOS
    var arrayPuntos = [];
    //50 ITERACIONES
    for (var i = 0; i < 50; i++) {
        //GENERO COORDENADAS LONG LAT ALEATORIAS
        var px = Math.random() * 360 - 180;
        var py = Math.random() * 180 - 90;
        //SE GENERA UNA GEOMETRIA DE TIPO PUNTO A PARTIR DE LAS COORDENADAS
        //PREVIA TRANSFORMACION A LA PROYECCION DEL MAPA
        var punto = new ol.geom.Point(ol.proj.transform([px, py], 'EPSG:4326', 'EPSG:3857'));
        // GENERA UN FATURE DE TIPO PUNTO Y SE A�ADE EL ARRAY DE PUNTOS
        var puntoFeature = new ol.Feature(punto);
        arrayPuntos.push(puntoFeature);
    }
    //UNA VEZ QUE EL VECTOR ESTA RELLENADO, CREAMOS UNA CAPA VECTORIAL NUEVA
    //A LA QUE SE A�ADEN LOS PUNTOS Y SE SE A�ADE AL MAPA
    var capaPuntos = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: arrayPuntos
        })
    });
    mapa.addLayer(capaPuntos);
}

//contendr� 10 l�neas localizadas aleatoriamente en el mapa
function crearCapaLineas() {
    //CREO UN ARRAY VACIO
    var arrayLineas = [];
    //10 ITERACIONES
    for (var i = 0; i < 10; i++) {
        //4 COORDENADAS ALEATORIAS PORQUE PARA UNA LINEA NECESITO DOS PUNTOS
        var px1 = Math.random() * 240 - 120;
        var py1 = Math.random() * 100 - 50;
        var px2 = Math.random() * 240 - 120;
        var py2 = Math.random() * 100 - 50;
        //SE GENERA UNA GEOMETRIA DE TIPO linea A PARTIR DE LAS COORDENADAS
        //PREVIA TRANSFORMACION A LA PROYECCION DEL MAPA
        var linea = new ol.geom.LineString([ol.proj.transform([px1, py1], 'EPSG:4326', 'EPSG:3857'), ol.proj.transform([px2, py2], 'EPSG:4326', 'EPSG:3857')]);
        // GENERA UN FATURE DE TIPO LINEA Y SE A�ADE EL ARRAY DE ANTES
        var lineaFeature = new ol.Feature(linea);
        arrayLineas.push(lineaFeature);
    }
    //UNA VEZ QUE EL VECTOR ESTA RELLENADO, CREAMOS UNA CAPA VECTORIAL NUEVA
    //A LA QUE SE A�ADEN LOS FEATURES DE LINEA Y SE SE A�ADE AL MAPA		
    mapa.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            features: arrayLineas
        })
    }))
}

//contendr� 2 pol�gonos localizados aleatoriamente en el mapa
function crearCapaPoligonos() {
    var arrayPoligonos = [];
    //CADA POLIGONO ESTA FORMADO POR UN NUMERO ALEATORIO DE PUNTOS
    for (var i = 0; i < 2; i++) {
        var numPuntos = Math.floor(Math.random() * 4) + 3;
        var arrayPuntos = [];
        //GENERO COORDENADAS
        for (var j = 0; j < numPuntos; j++) {
            var px = Math.random() * 360 - 180;
            var py = Math.random() * 180 - 90;
            arrayPuntos.push(ol.proj.transform([px, py], 'EPSG:4326', 'EPSG:3857'));
        }
        //GEOMETRIA
        var poligono = new ol.geom.Polygon([arrayPuntos]);
        //FEATURE
        var poligonoGeometria = new ol.Feature(poligono);
        arrayPoligonos.push(poligonoGeometria);
    }
    //CAPA VECTORIAL
    mapa.addLayer(new ol.layer.Vector({
        source: new ol.source.Vector({
            features: arrayPoligonos
        })
    }))
}
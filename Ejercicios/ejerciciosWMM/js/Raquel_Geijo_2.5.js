//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
    init_Mapa1();
    init_Mapa2();
    init_Mapa3();
    init_Mapa4();
}

//FUNCIONES PARA INICIALIZAR LOS 4 MAPAS
function init_Mapa1() {
    //genero el mapa pero todavia no tiene layer
    mapa1 = new ol.Map({
        view: new ol.View({
            zoom: 8,
            minZoom: 8,
            center: [-180000, 5250000]
        }),
        target: 'Mapa1'
    });
    tileMapa1();
}

function init_Mapa2() {
    //genero el mapa pero todavia no tiene layer
    mapa2 = new ol.Map({
        view: new ol.View({
            zoom: 8,
            minZoom: 8,
            center: [-180000, 5250000],
        }),
        target: 'Mapa2'
    });
    tileMapa2();
}

function init_Mapa3() {
    //genero el mapa pero todavia no tiene layer
    mapa3 = new ol.Map({
        view: new ol.View({
            zoom: 8,
            minZoom: 8,
            center: [-180000, 5250000]
        }),
        target: 'Mapa3'
    });
    tileMapa3();
}

function init_Mapa4() {
    //Crear mapa en el elemento DOM
    mapa4 = new ol.Map({
        view: new ol.View({
            zoom: 8,
            minZoom: 8,
            center: [-180000, 5250000]
        }),
        target: 'Mapa4'
    });
    tileMapa4();
}

function tileMapa1() {
    //de 0 a 8, un total de 9 niveles de reolucion. PARA MODIFICAR tileGrid es
    //NECESARIO tambien ESPECIFICAR TODAS LAS RESOLUCIONES DEL MAPA que queremos
    //generar en los DISTINTOS NIVELES DE ZOOM

    //array de resoluciones cada vez más pequeñas a partir de la 
    //resolucion máxima cuyo zoom es 0
    resolutions = [mapa1.getView().getResolution()];
    for (var i = 1; i <= 8; i++) {
        resolutions.push(resolutions[i - 1] / 2);
    }

    //propiedad tileGrid
    var tileGrid = new ol.tilegrid.TileGrid({
        //obtengo la extension del mapa
        extent: mapa1.getView().getProjection().getExtent(),
        //fijando un tamaño de tile de 512x512 píxeles
        tileSize: [512, 512],
        //array de resoluciones generado antes
        resolutions: resolutions
    });

    //ahora si, añado una capa a mi mapa, siempre son arrays aunque sean de un elemento solo
    mapa1.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://idena.navarra.es/ogc/wms',
            params: {
                LAYERS: 'REFERE_Pol_Navarra'
            },
            tileGrid: tileGrid
        })
    }));
    //modificado el nivel de zoom de la vista para forzar al nivel
    //más alto al cargar el mapa    
    mapa1.getView().setZoom(8);
}

function tileMapa2() {
    //array de resoluciones cada vez más pequeñas a partir de la 
    //resolucion máxima cuyo zoom es 0
    resolutions = [mapa2.getView().getResolution()];
    for (var i = 1; i <= 8; i++) {
        resolutions.push(resolutions[i - 1] / 2);
    }

    //propiedad tileGrid
    var tileGrid = new ol.tilegrid.TileGrid({
        //obtengo la extension del mapa
        extent: mapa2.getView().getProjection().getExtent(),
        //fijando un tamaño de tile de 512x512 píxeles
        tileSize: [64, 64],
        //array de resoluciones generado antes
        resolutions: resolutions
    });

    //ahora si, añado una capa a mi mapa, siempre son arrays aunque sean de un elemento solo
    mapa2.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://idena.navarra.es/ogc/wms',
            params: {
                LAYERS: 'IDENA:MTNa5_BTA_fondo'
            },
            tileGrid: tileGrid
        })
    }));
    //modificado el nivel de zoom de la vista para forzar al nivel
    //más alto al cargar el mapa    
    mapa2.getView().setZoom(8);
}

function tileMapa3() {
    //array de resoluciones cada vez más pequeñas a partir de la 
    //resolucion máxima cuyo zoom es 0
    resolutions = [mapa3.getView().getResolution()];
    for (var i = 1; i <= 8; i++) {
        resolutions.push(resolutions[i - 1] / 2);
    }

    //propiedad tileGrid
    var tileGrid = new ol.tilegrid.TileGrid({
        //obtengo la extension del mapa
        extent: mapa3.getView().getProjection().getExtent(),
        //fijando un tamaño de tile de 512x512 píxeles
        tileSize: [64, 64],
        //array de resoluciones generado antes
        resolutions: resolutions
    });

    //ahora si, añado una capa a mi mapa, siempre son arrays aunque sean de un elemento solo
    mapa3.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://idena.navarra.es/ogc/wms',
            params: {
                LAYERS: 'IDENA:mapa_relieve_color'
            },
            tileGrid: tileGrid
        })
    }));
    //modificado el nivel de zoom de la vista para forzar al nivel
    //más alto al cargar el mapa    
    mapa3.getView().setZoom(8);
}

function tileMapa4() {
    //array de resoluciones cada vez más pequeñas a partir de la 
    //resolucion máxima cuyo zoom es 0
    resolutions = [mapa4.getView().getResolution()];
    for (var i = 1; i <= 8; i++) {
        resolutions.push(resolutions[i - 1] / 2);
    }

    //propiedad tileGrid
    var tileGrid = new ol.tilegrid.TileGrid({
        //obtengo la extension del mapa
        extent: mapa4.getView().getProjection().getExtent(),
        //fijando un tamaño de tile
        tileSize: [128, 128],
        //array de resoluciones generado antes
        resolutions: resolutions
    });

    //ahora si, añado una capa a mi mapa, siempre son arrays aunque sean de un elemento solo
    mapa4.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://idena.navarra.es/ogc/wms',
            params: {
                LAYERS: 'IDENA:AGROAL_Pol_DOPIdiazabal'
            },
            tileGrid: tileGrid
        })
    }));
    //modificado el nivel de zoom de la vista para forzar al nivel
    //más alto al cargar el mapa    
    mapa4.getView().setZoom(8);
}
function init() {
    //genero el mapa pero todavia no tiene layer
    mapa = new ol.Map({
        //VIEW
        view: new ol.View({
            center: [-15000, 6700000],
            //zoom inicial, resolucion maxima que vendrá determinada
            //por mapa.getView().getResolution()
            zoom: 0,
            //zoom maximo que permito
            maxZoom: 8
        }),
        //TARGET
        target: 'Mapa1',
        //FALTA LAYER QUE LO HAGO AL FINAL
    });

    //de 0 a 8, un total de 9 niveles de reolucion. Para modificar tileGrid es
    //necesatio tambien especificar todas las resoluciones dle mapa que queremos
    //generar en los distintos niveles de zoom

    //array de resoluciones cada vez más pequeñas a partir de la 
    //resolucion máxima cuyo zoom es 0
    resolutions = [mapa.getView().getResolution()];
    for (var i = 1; i <= 8; i++) {
        resolutions.push(resolutions[i - 1] / 2);
    }

    //propiedad tileGrid
    var tileGrid = new ol.tilegrid.TileGrid({
        //obtengo la extension del mapa
        extent: mapa.getView().getProjection().getExtent(),
        //fijando un tamaño de tile de 512x512 píxeles
        tileSize: [512, 512],
        //array de resoluciones generado antes
        resolutions: resolutions
    });

    //ahora si, añado un capa a mi mapa, siempre son arrays aunque sean de un elemento solo
    mapa.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://demo.mapserver.org/cgi-bin/wms',
            params: {
                'LAYERS': 'bluemarble'
            },
            tileGrid: tileGrid
        })
    }));
    //modificado el nivel de zoom de la vista para forzar al nivel
    //más alto al cargar el mapa    
    mapa.getView().setZoom(8);
}

//modificar la resolucion usando un menu desplegable y un boton
function cambiarResolution() {

    //obtengo el valor de la eleccion en el menu desplegable como elemento numerico
    var sizeTile = Number(document.getElementById("listResolution").value);
    //borro la capa existente para generar una con las carateristicas nuevas
    mapa.removeLayer(mapa.getLayers().getArray()[0]);

    //construyo las caracteristicas nuevas de la propiedad tileGrid
    var nuevaTileGrid = new ol.tilegrid.TileGrid({
        //extension del mapa
        extent: mapa.getView().getProjection().getExtent(),
        //tamaño de cada tesela es el seleccionado ej: 32x32
        tileSize: [sizeTile, sizeTile],
        //mismo array de resoluciones cada vez más pequeñas a partir de la 
        //resolucion máxima cuyo zoom es 0
        resolutions: resolutions
    });
    //capa nueva con la propiedad actualizada tileGrid
    mapa.addLayer(new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://demo.mapserver.org/cgi-bin/wms',
            params: {
                'LAYERS': 'bluemarble'
            },
            tileGrid: nuevaTileGrid
        })
    }));
    //se añade al mapa creado al principio vacio		

}
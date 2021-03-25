function init() {
    //Crear mapa en el elemento DOM
    var mapa = new ol.Map({
        target: 'Mapa1',
        view: new ol.View({
            zoom: 8,
            center: ol.proj.transform([-3.55727334406955, 37.195149967178295], 'EPSG:4326', 'EPSG:3857')
        }),
        layers: [
            //CAPA WMS
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            //CAPA VECTORIAL DE UN ARCHIGO GeoJSON
            new ol.layer.Vector({
                //OJO: SOURCE DE TIPO CLUSTER
                source: new ol.source.Cluster({
                    //todas las features que est�n
                    //a menos de 10 p�xeles de distancia
                    //se agrupen en una sola feature
                    distance: 10,
                    source: new ol.source.Vector({
                        url: './res/panoramicasPRUEBAS3857.geojson',
                        format: new ol.format.GeoJSON()
                    })
                })
            })
        ]
    });
}
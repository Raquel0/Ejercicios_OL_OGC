function init() {
    //Crear mapa en el elemento DOM
    //mostrar en qu� sitios hay una mayor cantidad de features
    //Dado que nuestro GeoJSON muestra ciudades del mundo
    //una temperatura alta indicar� una concentraci�n alta de ciudades
    var mapa = new ol.Map({
        target: 'Mapa1',
        view: new ol.View({
            zoom: 4,
            projection: 'EPSG:4326',
            center: [0, 42]
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
                    params: {
                        LAYERS: 'basic'
                    }
                })
            }),
            //OJO: SOURCE DE TIPO Heatmap
            //el GeoJSON contiene ciudades
            new ol.layer.Heatmap({
                source: new ol.source.Vector({
                    url: './res/world_cities.json',
                    format: new ol.format.GeoJSON()
                }),
                //en el fichero de datos a mayor POP_RANK menor poblaci�n
                //la propiedad weight, que asigna un peso (valor entre 0 y 1)
                //a cada feature. A mayor peso, mayor temperatura. De esta manera,
                //podemos asociar a la propiedad weight una funci�n
                /*
                -	0 (baja temperatura) si POP_RANK = 7, 
                -	1/7 si POP_RANK = 6,
                -	 �
                -	1 (alta temperatura) si POP_RANK = 1
                */
                weight: function (feature) {
                    var pop_rank = feature.get('POP_RANK');
                    return (-1 / 6) * pop_rank + 7 / 6
                }
            })
        ]
    });

}
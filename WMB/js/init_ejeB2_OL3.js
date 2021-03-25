function init() {
	var mapa = new ol.Map({});
	//nuevo objeto ol.map en la variable mapa
	//Para que el mapa pueda ser visualizado
	//necesitamos al menos 3 componentes: una vista,
	//una o más capas y un elemento HTML al que incorporar el mapa.

	//crear nueva vista
	view = new ol.View({
		//(EPSG:3857) 
		center: [-15000, 6700000],
		zoom: 5
	});
	//crear una capa de Open Street Maps
	layer1 = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	//crear  OTRA capa WMS OL
	layer2 = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'http://demo.mapserver.org/cgi-bin/wms',
			params: {
				'LAYERS': 'bluemarble'
			},
		}),
		opacity: 0.5
	})

	//junto las capas en formato array
	//en este caso se ve la segunda sobre la primera por la opacidad
	grupo = new ol.layer.Group({
		layers: [layer1, layer2]
	})
	//herramientas openlayers
	mapa.setView(view);
	mapa.setLayerGroup(grupo);
	//se muestra en el div de etiqueta Mapa1
	mapa.setTarget('Mapa1');

}
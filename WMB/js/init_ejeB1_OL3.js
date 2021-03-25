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
	//crear una capa
	layer1 = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	grupo = new ol.layer.Group({
		layers: [layer1]
	})
	//herramientas openlayers
	mapa.setView(view);
	mapa.setLayerGroup(grupo);
	mapa.setTarget('Mapa1');

}
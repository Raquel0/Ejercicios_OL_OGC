function init() {
	var mapa = new ol.Map({
		view: new ol.View({
			zoom: 8,
			center: [-223293, 5247800]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'Mapa1'
	});

	var nuevaCapa = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'http://idena.navarra.es/ogc/wms',
			params: {
				LAYERS: 'IDENA:AGROAL_Pol_DOPIdiazabal'
			}
		}),
		opacity: 0.85
	});
	mapa.addLayer(nuevaCapa);
}
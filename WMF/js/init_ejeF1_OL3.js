function init() {
	init_mapa();
}

//FUNCION PARA INICIALIZAR EL MAPA BASE WATERCOLOR Y AÑADIR UNA CAPA DE VERTIDOS DE PETROLEO
function init_mapa() {
	var map = new ol.Map({
		view: new ol.View({
			zoom: 4,
			projection: 'EPSG:4326',
			center: [-1, 40]
		}),
		target: 'Mapa1',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.Stamen({
					layer: 'watercolor'
				}),
				opacity: 0.5
			}),
		]
	});

	var capaKML = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: './res/Oil_Spills.kml',
			format: new ol.format.KML(),
			projection: 'EPSG:4326',
		}),
	});
	map.addLayer(capaKML);
}
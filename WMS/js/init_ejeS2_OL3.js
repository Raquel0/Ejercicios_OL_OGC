function init() {
	mapa = new ol.Map({
		target: 'Mapa1',
		view: new ol.View({
			zoom: 5,
			projection: 'EPSG:4326',
			center: [-1, 42]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),
				opacity: 0.5
			}),
			new ol.layer.Vector({
				source: new ol.source.Vector({
					url: './res/world_cities.json',
					format: new ol.format.GeoJSON
				}),
				//HASTA AQUI CARGAR CAPAS COMO SIEMPRE: OL Y JSON
				//NO APLICO UN ESTILO FIJO. LLAMO A UNA FUNCION
				style: aplicaEstilo
			})
		]
	});

}

//DEFINICION DEL FORMATO DE ESTILO QUE SE VA A PONER CUANDO LLAMA A LA FUNCION APLICAESTILO
function aplicaEstilo(feature) {
	var radios = [11, 10, 9, 8, 7, 6, 5];
	var colores = ['#CC0000', '#AA2200', '#884400', '#666600', '#448800', '#22AA00', '#00CC00'];
	//BLANCO CLARITO
	var fill = new ol.style.Fill({
		color: 'rgba(255,255,255,0.4)'
	});
	//CAMBIO EL ESTILO DEL BORDE EN FUNCION DE LA POBLACION
	var stroke = new ol.style.Stroke({
		color: colores[feature.get('POP_RANK') - 1],
		width: 1.25
	});
	var nuevoEstilo =
		new ol.style.Style({
			image: new ol.style.Circle({
				fill: fill,
				stroke: stroke,
				//APLICO EL MISMO CAMBIO AL RADIO EN VEZ DE AL ESTILO DEL BORDE
				radius: radios[feature.get('POP_RANK') - 1]
			})
		});
	return nuevoEstilo;
}
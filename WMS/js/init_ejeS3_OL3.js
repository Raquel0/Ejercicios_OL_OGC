function init() {
	/*var nuevoEstilo = new ol.style.Style({
		text: new ol.style.Text({
			text:
		})
	})*/

	var mapa = new ol.Map({
		target: 'Mapa1',
		view: new ol.View({
			zoom: 4,
			center: [-10000000, 5000000]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			}),
			new ol.layer.Vector({
				source: new ol.source.Vector({
					url: './res/states.json',
					format: new ol.format.GeoJSON()
				}),
				//HASTA AQUI CARGAR CAPAS COMO SIEMPRE: OL Y JSON
				//NO APLICO UN ESTILO FIJO. LLAMO A UNA FUNCION
				style: cambiarEstilo
			})
		]
	});
}

//DEFINICION DEL FORMATO DE ESTILO QUE SE VA A PONER CUANDO LLAMA A LA FUNCION APLICAESTILO
function cambiarEstilo(feature) {
	var nuevoEstilo = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: '#3399CC',
			width: 1.25
		}),
		fill: new ol.style.Fill({
			color: 'rgba(255,255,255,0.4)'
		}),
		//TEXTO NUEVO QUE SE VA A AÑADIR. SE CORRESPONDE AL CAMPO NAME10, LO VEO EN EL JSON
		text: new ol.style.Text({
			text: feature.get('NAME10'),
			/*fill: new ol.style.Fill({
				color: '#000000'
			})*/
		})
	});
	return nuevoEstilo;

}
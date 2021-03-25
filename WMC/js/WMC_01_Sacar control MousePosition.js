function init() {
	//Crear mapa en el elemento DOM
	//CUIDADO: Se crea como variable global para que los eventos puedan modificarlo
	mapa = new ol.Map({
		target: 'Mapa1',
		view: new ol.View({
			projection: 'EPSG:4326',
			zoom: 2,
			center: [0, 0]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			}),
		]
	});

	//EN EL MAPA, CUANDO OCURRE POINTERMOVE, APLICAR LA FUNCION AL EVENTO PINTERMOVE
	//CUANDO? en el momento pintermove, QUE?event.coordinate, DONDE? mapa.on
	mapa.on('pointermove', function (evento) {
		var coordenada = evento.coordinate; //del evento pointermove del raton cojo coordinate
		document.getElementById("long").innerHTML = coordenada[0];
		document.getElementById("lat").innerHTML = coordenada[1];

	})
}
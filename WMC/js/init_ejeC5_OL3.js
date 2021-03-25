function init() {
	//Crear mapa en el elemento DOM
	//CUIDADO: Se crea como variable global para que los eventos puedan modificarlo
	mapa = new ol.Map({
		target: "Mapa1",
		view: new ol.View({
			zoom: 2,
			center: ol.proj.fromLonLat([1, 40])
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		]
	});
	var capaVectorial = new ol.layer.Vector({
		source: new ol.source.Vector()
	});
	mapa.addLayer(capaVectorial);

	drawControlPolygon = new ol.interaction.Draw({
		type: 'Polygon',
		source: capaVectorial.getSource()
	});
	drawControlLineString = new ol.interaction.Draw({
		type: 'LineString',
		source: capaVectorial.getSource()
	});
	if (document.getElementById("path").checked) {
		mapa.addInteraction(drawControlLineString);
	} else {
		mapa.addInteraction(drawControlPolygon);
	}

	drawControlPolygon.on('drawstart', limpiarFeatures);
	drawControlLineString.on('drawstart', limpiarFeatures);
	drawControlPolygon.on('drawend', calcularArea, this);
	drawControlLineString.on('drawend', calcularLongitud, this);
}

function limpiarFeatures() {
	mapa.getLayers().getArray()[1].getSource().clear();
}

function calcularArea(event) {
	var medida = Math.round(event.feature.getGeometry().getArea() / 1000000);
	document.getElementById("Measure").innerHTML = medida + "km2"
}

function calcularLongitud(event) {
	var medida = Math.round(event.feature.getGeometry().getLength() / 1000);
	document.getElementById("Measure").innerHTML = medida + "km"
}

function changeHandler() {
	if (document.getElementById("path").checked) {
		mapa.removeInteraction(drawControlPolygon);
		mapa.addInteraction(drawControlLineString);
	} else {
		mapa.removeInteraction(drawControlLineString);
		mapa.addInteraction(drawControlPolygon);
	}
}
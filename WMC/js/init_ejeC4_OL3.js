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

	//crea features de forma aleatoria y las añade al mapa con una funcion
	crearFeatures();

	//ACCION DE SELECCIONAR CON UN CLICK SEGUN LO QUE TENGO SELECCIONADO EN CADA DESPLEGABLE CON SU ID
	var selectInteraction = new ol.interaction.Select({
		condition: ol.events.condition.click,
		filter: function (feature, layer) {
			return document.getElementById("sFilter").value == "ALL" || document.getElementById("sFilter").value == feature.getGeometry().getType();
		}
	});
	//AÑADO LA INERACCION DE SELECCIONAR ELEMENTOS AL MAPA
	mapa.addInteraction(selectInteraction);
	//Definimos las interacciones globales para poder eliminarlas/añadirlas más tarde
	//DEFINO LA INTERACCION DE MODIFICAR
	modifyInteraction = new ol.interaction.Modify({
		features: selectInteraction.getFeatures()
	});
	//DEFINO LA INTERACCION DE TRASLADAR
	translateInteraction = new ol.interaction.Translate({
		features: selectInteraction.getFeatures()
	});
	//SEGUN LO QUE ESTE SELECCIONADO AÑADO AL MAPA LA INTERACCION QUE CORRESPONDE
	if (document.getElementById("oFilter").value == "Modify") {
		mapa.addInteraction(modifyInteraction);
	} else {
		mapa.addInteraction(translateInteraction);
	}
}

//FUNCION QUE CREA PUNTOS LINEAS Y POLIFONOS ALEATORIOS
function crearFeatures() {
	var arrayFeatures = [];
	//Comienzo metiendo 10 puntos
	for (var i = 0; i < 10; i++) {
		var px = Math.random() * 360 - 180;
		var py = Math.random() * 180 - 90;
		var punto = new ol.geom.Point(ol.proj.transform([px, py], 'EPSG:4326', 'EPSG:3857'));
		var puntoFeature = new ol.Feature(punto);
		arrayFeatures.push(puntoFeature);
	}
	//Meto 5 lineas
	for (var i = 0; i < 5; i++) {
		var px1 = Math.random() * 240 - 120;
		var py1 = Math.random() * 100 - 50;
		var px2 = Math.random() * 240 - 120;
		var py2 = Math.random() * 100 - 50;
		var linea = new ol.geom.LineString([ol.proj.transform([px1, py1], 'EPSG:4326', 'EPSG:3857'), ol.proj.transform([px2, py2], 'EPSG:4326', 'EPSG:3857')]);
		var lineaFeature = new ol.Feature(linea);
		arrayFeatures.push(lineaFeature);
	}
	//Meto 2 poligonos
	for (var i = 0; i < 2; i++) {
		var numPuntos = Math.floor(Math.random() * 4) + 3;
		var arrayPuntos = [];
		for (var j = 0; j < numPuntos; j++) {
			var px = Math.random() * 360 - 180;
			var py = Math.random() * 180 - 90;
			arrayPuntos.push(ol.proj.transform([px, py], 'EPSG:4326', 'EPSG:3857'));
		}
		var poligono = new ol.geom.Polygon([arrayPuntos]);
		var poligonoGeometria = new ol.Feature(poligono);
		arrayFeatures.push(poligonoGeometria);
	}
	var capaVectorial = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: arrayFeatures
		})
	});
	mapa.addLayer(capaVectorial);
}

//CAMBIO LA OPERACION QUE HAY EN EL MAPA SI CAMBIA LA SELECCION DEL MENU DESPLEGABLE
function cambiarOperacion() {
	if (document.getElementById("oFilter").value == "Modify") {
		mapa.removeInteraction(translateInteraction);
		mapa.addInteraction(modifyInteraction);
	} else {
		mapa.removeInteraction(modifyInteraction);
		mapa.addInteraction(translateInteraction);
	}
}
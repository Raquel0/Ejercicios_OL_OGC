function init() {
	//Crear mapa en el elemento DOM
	//UNA CAPA DE OSM CON SU VIEW
	mapa = new ol.Map({
		target: 'Mapa1',
		view: new ol.View({
			zoom: 5,
			center: [4500000, 7500000]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		]
	});
	//CAPA VECTORIAL NUEVA VACÍA
	var capaVectorial = new ol.layer.Vector({
		source: new ol.source.Vector()
	});
	//AÑADO LA CAPA VECTORIAL NUEVA VACIA AL MAPA
	mapa.addLayer(capaVectorial);
	//Vamos a añadir interacción de dibujar en la capa vectorial
	//DEFINO LA ACCION DE DIBUJAR. QUE SEAN POLIGONOS Y
	//LOS GUARDA EN LA CAPA VECTORIAL VACIA
	drawInteraction = new ol.interaction.Draw({
		type: 'Polygon',
		source: capaVectorial.getSource()
	})

	//CREO UNA CAPA DE SELECCION, UN CLICK
	selectInteraction = new ol.interaction.Select({
		//TIPO DE EVENTO
		condition: ol.events.condition.click,
		//EL CLICK SOBRE LA CAPA VECTORIAL
		layers: [capaVectorial],
		//CONTENIDO Y BORDE DEL POLIGONO
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255,255,31,0.8)'
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(255,154,31,0.9)',
				width: 4
			})
		})
	});

	//COJO DEL FORMULARIO EL CONTENIDO DEL CAMPO INTERACCION (DESPLEGABLE: DIBUJAR O SELECCIONAR)
	//SEGUN LA SELECCION UTILIZO UNA INTERACCION DIFERENTE
	var accion = document.getElementById("interaccion").value;
	if (accion == "dibujar") {
		mapa.addInteraction(drawInteraction);
	} else {
		mapa.addInteraction(selectInteraction);
	}

}

function cambiarInteraccion() {
	//CUANDO SE ACTIVA EL EVENTO DE CAMBIO
	//COJO EL CONTENIDO DEL CAMPO INTERACCION OTRA VEZ
	var accion = document.getElementById("interaccion").value;
	if (accion == "dibujar") {
		//COJO TODAS LAS INTERACCIONES, QUITO TODAS LAS INTERACCIONES QUE HAYA DE SELECCIONAR (PUEDE HABER VARIAS)
		var arrayInteracciones = mapa.getInteractions().getArray();
		for (var i = 0; i < arrayInteracciones.length; i++) {
			if (arrayInteracciones[i] instanceof ol.interaction.Select) {
				mapa.removeInteraction(arrayInteracciones[i]);
			}
		}
		//PONGO LA INTERACCION DE DIBUJAR
		mapa.addInteraction(drawInteraction);
	} else {
		//LO MISMO PERO CON EL CAMBIO INVERSO
		var arrayInteracciones = mapa.getInteractions().getArray();
		for (var i = 0; i < arrayInteracciones.length; i++) {
			if (arrayInteracciones[i] instanceof ol.interaction.Draw) {
				mapa.removeInteraction(arrayInteracciones[i]);
			}
		}
		mapa.addInteraction(selectInteraction);
	}
}
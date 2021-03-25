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
				source: new ol.source.TileWMS({
					url: "http://vmap0.tiles.osgeo.org/wms/vmap0",
					params: {
						LAYERS: 'basic'
					}
				})
			})
		]
	});
	//Hacemos que se comprueben todos los checkboxes
	updateAttribution();
	updateFullScreen();
	updateMousePosition();
	updateOverviewMap();
	updateRotate();
	updateScaleLine();
	updateZoom();
	updateZoomSlider();
	updateZoomToExtent();
}

//CUADRITO DE INFROMACION
function updateAttribution() {
	if (document.getElementById("Attribution").checked) {
		//creo la atribucion y la añado al mapa
		var control = new ol.control.Attribution();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		//busca los controles de este tipo y los quita
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.Attribution) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//PANTALLA COMPLETA
function updateFullScreen() {
	if (document.getElementById("FullScreen").checked) {
		var control = new ol.control.FullScreen();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.FullScreen) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//COORDENADAS POR LAS QUE VA PASANDO EL RATON
function updateMousePosition() {
	if (document.getElementById("MousePosition").checked) {
		var control = new ol.control.MousePosition();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.MousePosition) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//MINI MAPA DE SITUACION
function updateOverviewMap() {
	if (document.getElementById("OverviewMap").checked) {
		var control = new ol.control.OverviewMap({
			collapsed: false,
			layer: mapa.getLayers().getArray()[0]
		});
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.OverviewMap) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//LLEVAR LA ROTACION A LA POSICION ORIOGINAL
function updateRotate() {
	if (document.getElementById("Rotate").checked) {
		var control = new ol.control.Rotate({
			autoHide: false
		});
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.Rotate) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//BARRA DE ESCALA
function updateScaleLine() {
	if (document.getElementById("ScaleLine").checked) {
		var control = new ol.control.ScaleLine();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.ScaleLine) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//BOTONES DE MAS O MENOS ZOOM
function updateZoom() {
	if (document.getElementById("Zoom").checked) {
		var control = new ol.control.Zoom();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.Zoom) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//BARRITA DE ZOOM PARA DESLIZAR
function updateZoomSlider() {
	if (document.getElementById("ZoomSlider").checked) {
		var control = new ol.control.ZoomSlider();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.ZoomSlider) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}

//ZOOM EXTENSION
function updateZoomToExtent() {
	if (document.getElementById("ZoomToExtent").checked) {
		var control = new ol.control.ZoomToExtent();
		mapa.addControl(control);
	} else {
		var arrayControles = mapa.getControls().getArray();
		for (var i = 0; i < arrayControles.length; i++) {
			if (arrayControles[i] instanceof ol.control.ZoomToExtent) {
				mapa.removeControl(arrayControles[i]);
			}
		}
	}
}
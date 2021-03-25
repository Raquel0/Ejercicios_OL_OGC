function init_Mapa1() {
	mapa = new ol.Map({
		view: new ol.View({
			zoom: 2,
			center: [-223293, 5247800]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			}),
			//mapa acuarela
			new ol.layer.Tile({
				source: new ol.source.Stamen({
					layer: 'watercolor'
				})
			})
		],
		target: 'Mapa1',
	});
}

//FUNCION PARA ACERCAR ZOOM CAMBIANDO ANIMACION CON RADIOBUTTON
function zoomIn() {
	var vista = mapa.getView();
	var zoomActual = vista.getZoom();


	if (document.getElementById("animacion1").checked) {
		vista.animate({
			zoom: vista.getZoom() + 1,
			duration: 2000,
			easing: ol.easing.easeIn
		});
	}
	if (document.getElementById("animacion2").checked) {
		vista.animate({
			zoom: vista.getZoom() + 1,
			duration: 2000,
			easing: ol.easing.easeOut
		});
	}
	if (document.getElementById("animacion3").checked) {
		vista.animate({
			zoom: vista.getZoom() + 1,
			duration: 2000,
			easing: ol.easing.inAndOut
		});
	}
	if (document.getElementById("animacion4").checked) {
		vista.animate({
			zoom: vista.getZoom() + 1,
			duration: 2000,
			easing: ol.easing.linear
		});
	}

}

//FUNCION PARA ALEJAR ZOOM CAMBIANDO ANIMACION CON RADIOBUTTON
function zoomOut() {
	var vista = mapa.getView();
	var zoomActual = vista.getZoom();

	if (document.getElementById("animacion1").checked) {
		vista.animate({
			zoom: vista.getZoom() - 1,
			duration: 2000,
			easing: ol.easing.easeIn
		});
	}
	if (document.getElementById("animacion2").checked) {
		vista.animate({
			zoom: vista.getZoom() - 1,
			duration: 2000,
			easing: ol.easing.easeOut
		});
	}
	if (document.getElementById("animacion3").checked) {
		vista.animate({
			zoom: vista.getZoom() - 1,
			duration: 2000,
			easing: ol.easing.inAndOut
		});
	}
	if (document.getElementById("animacion4").checked) {
		vista.animate({
			zoom: vista.getZoom() - 1,
			duration: 2000,
			easing: ol.easing.linear
		});
	}

}

//FUNCION PAR ACAMBIAR OPACIDAD
//OJO: mucha opacidad = poca transparencia
// valores entre 0 y 1, por eso opacidad/100
function updateOpacity() {
	var opacidad = Number(document.getElementById("Opacity").value);
	mapa.getLayers().getArray()[1].setOpacity(opacidad / 100);
}
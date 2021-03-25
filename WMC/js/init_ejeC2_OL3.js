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

	//OBTENGO EL ARRAY DE CONTROLES IGUAL QUE HAGO CON EL DE CAPAS ORTAS VECES
	var arrayControles = mapa.getControls().getArray();
	//QUITO CONTROLES VIEJOS SI LOS HUBIESE
	for (var i = 0; i < arrayControles.length; i++) {
		mapa.removeControl(arrayControles[i]);
	}
	//DEFINICION DEL CONTROL PARA PANTALLA COMPLETA
	var control1 = new ol.control.FullScreen({
		//le digo que el control lo quiero en el elemento div fuera del mapa con id FullScreen
		target: document.getElementById("FullScreen"),
		label: 'AA',
		className: 'fuera'
	});
	//AÑADO EL CONTROL AL MAPA
	mapa.addControl(control1);

	//DEFINICION DEL CONTROL PARA ROTACION
	var control2 = new ol.control.Rotate({
		//le digo que el control lo quiero en el elemento div fuera del mapa con id Rotate

		target: document.getElementById("Rotate"),
		autoHide: false,
		label: 'R',
		className: 'fuera'
	});
	//AÑADO EL CONTROL AL MAPA
	mapa.addControl(control2);

	//DEFINICION DEL CONTROL PARA ZOOM EXTENSION
	var control3 = new ol.control.ZoomToExtent({
		//le digo que el control lo quiero en el elemento div fuera del mapa con id ZoomToExtent
		target: document.getElementById("ZoomToExtent"),
		label: 'ZE',
		className: 'fuera'
	});
	//AÑADO EL CONTROL AL MAPA
	mapa.addControl(control3);
}
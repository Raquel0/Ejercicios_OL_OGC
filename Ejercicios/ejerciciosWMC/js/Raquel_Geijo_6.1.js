function init() {
	//Crear mapa en el elemento DOM
	//CUIDADO: Se crea como variable global para que los eventos puedan modificarlo
	mapa = new ol.Map({
		//mapa base con su target view y layers
		target: "Mapa1",
		view: new ol.View({
			zoom: 4,
			center: ol.proj.fromLonLat([1, 40])
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),

			}),
		]
	});
	var mousePositionControl = new ol.control.MousePosition({
		coordinateFormat: ol.coordinate.createStringXY(4),
		projection: 'EPSG:4326',
		target: document.getElementById("raton"),
		undefinedHTML: '&nbsp;'
	});
	mapa.addControl(mousePositionControl);
}
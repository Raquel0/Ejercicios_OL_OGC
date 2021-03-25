function init() {
	//Crear mapa en el elemento DOM
	//CUIDADO: Se crea como variable global para que los eventos puedan modificarlo
	mapa = new ol.Map({
		target: "Mapa1",
		view: new ol.View({
			zoom: 4,
			center: ol.proj.fromLonLat([1, 40])
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),

			}),
			new ol.layer.Vector({
				source: new ol.source.Vector({
					url: './res/world_cities.json',
					format: new ol.format.GeoJSON()
				})
			})
		]
	});
	mapa.on('postrender', actualizaInformacion)
}

function actualizaInformacion() {
	var source = mapa.getLayers().getArray()[1].getSource();
	var extent = mapa.getView().calculateExtent(mapa.getSize());
	var features = source.getFeaturesInExtent(extent);
	document.getElementById("numCiudades").innerHTML = features.length
}
//FUNCION A LA QUE LLAMA EL EVENTO ONLOAD
function init() {
	init_Mapa1();
	navarraExtent();
}

//FUNCION PARA INICIALIZAR EL MAPA
function init_Mapa1() {
	//Crear mapa en el elemento DOM
	mapa1 = new ol.Map({
		view: new ol.View({}),
		layers: [
			//mapa base
			new ol.layer.Tile({
				source: new ol.source.OSM({}),
				title: 'capa0',
				visible: true
			}),

			new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://idena.navarra.es/ogc/wms',
					params: {
						LAYERS: 'IDENA:MTNa5_BTA_fondo'
					},
				}),
				title: 'capa1',
				visible: false
			}),

			new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://idena.navarra.es/ogc/wms',
					params: {
						LAYERS: 'REFERE_Pol_Navarra'
					},
				}),
				title: 'capa2',
				visible: false
			}),
			new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://idena.navarra.es/ogc/wms',
					params: {
						LAYERS: 'IDENA:mapa_relieve_color'
					},
				}),
				title: 'capa3',
				visible: false
			}),
			new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://idena.navarra.es/ogc/wms',
					params: {
						LAYERS: 'ortofoto_5000_2017'
					},
				}),
				title: 'capa4',
				visible: false
			}),
		],
		target: 'Mapa1'
	});
}

//FUNCION PARA RADIOBUTTON. ELEGIR UNA CAPA Y OTRA, NUNCA LAS DOS A LA VEZ
function updateRadio1() {
	var arrayCapas = mapa1.getLayers().getArray();
	var selecCapa1 = document.getElementById('radiocapa1').checked
	var selecCapa2 = document.getElementById('radiocapa2').checked
	var selecCapa3 = document.getElementById('radiocapa3').checked
	var selecCapa4 = document.getElementById('radiocapa4').checked

	arrayCapas[1].setVisible(selecCapa1);
	arrayCapas[2].setVisible(selecCapa2);
	arrayCapas[3].setVisible(selecCapa3);
	arrayCapas[4].setVisible(selecCapa4);

}

//FUNCION PARA RESTRINGIR EL MAPA 1 A LAS COORDENADAS DE NAVARRA
function navarraExtent() {
	var izquierda = Number('-2.5');
	var abajo = Number('42');
	var derecha = Number('-0.725');
	var arriba = Number('43.315');
	//el tipo extent representa una pareja de coordenadas
	var nuevoExtent = ol.proj.transformExtent([izquierda, abajo, derecha, arriba], 'EPSG:4326', 'EPSG:3857');
	//creo una nueva vista con los mismo parametros que antes salvo centro y extent
	//-	Centro: vamos a centrar el mapa en la coordenada del centro
	//del rectángulo especificado por el usuario
	//-	Extent: asignamos la variable nuevoExtent
	var nuevaView = new ol.View({
		zoom: 8.5,
		minZoom: 8.5,
		//media de long y media de lat
		//donde pone nuevoExtent ponia solo extent 
		center: [0.5 * (nuevoExtent[0] + nuevoExtent[2]), 0.5 * (nuevoExtent[1] + nuevoExtent[3])],
		extent: nuevoExtent
	});
	//asigno al mapa la nueva vista definida
	mapa1.setView(nuevaView);
}
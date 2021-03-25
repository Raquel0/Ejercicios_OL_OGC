 function init() {
 	init_Mapa1();
 	navarraExtent();
 }

 //CARGAR LOS MAPAS EN CAPAS
 function init_Mapa1() {
 	//Crear mapa en el elemento DOM
 	//CIUDADO: Se crea como variable global para que los eventos puedan modificarlo
 	mapa1 = new ol.Map({
 		view: new ol.View({}),
 		layers: [
 			//mapa base
 			new ol.layer.Tile({
 				source: new ol.source.TileWMS({
 					url: 'http://idena.navarra.es/ogc/wms',
 					params: {
 						LAYERS: 'IDENA:AGROAL_Pol_DOPIdiazabal'
 					},
 				}),
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
 				visible: true
 			}),

 			new ol.layer.Tile({
 				source: new ol.source.TileWMS({
 					url: 'http://idena.navarra.es/ogc/wms',
 					params: {
 						LAYERS: 'REFERE_Pol_Navarra'
 					},
 				}),
 				title: 'capa2',
 				visible: true
 			}),
 			new ol.layer.Tile({
 				source: new ol.source.TileWMS({
 					url: 'http://idena.navarra.es/ogc/wms',
 					params: {
 						LAYERS: 'IDENA:mapa_relieve_color'
 					},
 				}),
 				title: 'capa3',
 				visible: true
 			}),
 			new ol.layer.Tile({
 				source: new ol.source.TileWMS({
 					url: 'http://idena.navarra.es/ogc/wms',
 					params: {
 						LAYERS: 'ortofoto_5000_2017'
 					},
 				}),
 				title: 'capa4',
 				visible: true
 			})
 		],
 		target: 'Mapa1'
 	});

 }

 //LLEVAR CAPA A ARRIBA DEL TODO CAMBIANDO ZINDEX
 function topLayer() {
 	//variable layerName en la que guardamos
 	//el valor del elemento seleccionado en la lista desplegable
 	var layerName = document.getElementById('sLayerSelection').value;
 	//array llamado arrayCapas que contiene todas las capas del mapa
 	var arrayCapas = mapa1.getLayers().getArray();
 	//variale numberLayers que contiene el n�mero de capas del array
 	var numberLayers = arrayCapas.length;
 	//variable currentZIndex en la que guardaremos el valor del zIndex
 	//de la capa que queremos llevar arriba del todo (lo dejamos vac�o,
 	//ya que todav�a no sabemos cu�l ser�
 	var currentZIndex;
 	//recorrer cada elemento del array. Para cada elemento del array
 	//consultaremos su t�tulo y veremos si coincide con layerName.
 	//Si coincide es que ya la hemos encontrado y podemos obtener su ZIndex
 	for (var i = 0; i < numberLayers; i++) {
 		if (arrayCapas[i].get('title') == layerName) {
 			currentZIndex = arrayCapas[i].getZIndex();
 		}
 	}
 	//realizar un segundo recorrido del array. Para cada elemento volveremos
 	//a consultar el t�tulo de la capa. Queremos hacer dos cosas
 	//**Si es la capa que queremos llevar arriba, le cambiaremos su
 	//ZIndex a numberLayers-1.
 	//**Si no es la capa que queremos llevar arriba pero anteriormente
 	//estaba, tendremos que decrementar su zIndex
 	for (var i = 0; i < numberLayers; i++) {
 		if (arrayCapas[i].get('title') == layerName) {
 			arrayCapas[i].setZIndex(numberLayers - 1);
 		} else if (arrayCapas[i].getZIndex() > currentZIndex) {
 			arrayCapas[i].setZIndex(arrayCapas[i].getZIndex() - 1);
 		}
 	}
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
 	//del rect�ngulo especificado por el usuario
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

 //FUNCION PAR ACAMBIAR OPACIDAD
 //OJO: mucha opacidad = poca transparencia
 // valores entre 0 y 1, por eso opacidad/100
 function updateOpacity() {
 	//obtengo el valor de opacidad
 	var opacidad = Number(document.getElementById("Opacity").value);
 	//variable layerName en la que guardamos
 	//el valor del elemento seleccionado en la lista desplegable
 	var layerName = document.getElementById('sLayerSelection').value;
 	//array llamado arrayCapas que contiene todas las capas del mapa
 	var arrayCapas = mapa1.getLayers().getArray();
 	//variale numberLayers que contiene el n�mero de capas del array
 	var numberLayers = arrayCapas.length;
 	//variable currentZIndex en la que guardaremos el valor del zIndex
 	//de la capa que queremos llevar arriba del todo (lo dejamos vac�o,
 	//ya que todav�a no sabemos cu�l ser�
 	var currentZIndex;
 	//recorrer cada elemento del array. Para cada elemento del array
 	//consultaremos su t�tulo y veremos si coincide con layerName.
 	//Si coincide es que ya la hemos encontrado y podemos obtener su ZIndex
 	for (var i = 0; i < numberLayers; i++) {
 		if (arrayCapas[i].get('title') == layerName) {
 			currentZIndex = arrayCapas[i].getZIndex();
 		}
 	}
 	//realizar un segundo recorrido del array. Para cada elemento volveremos
 	//a consultar el t�tulo de la capa. Queremos hacer dos cosas
 	//**Si es la capa que quiero. Cambio opacidad segun seleccion
 	//**Si no es la capa que quiero. poner opacidad a 100
 	for (var i = 0; i < numberLayers; i++) {
 		if (arrayCapas[i].get('title') == layerName) {
 			mapa1.getLayers().getArray()[i].setOpacity(opacidad / 100);
 		} else if (arrayCapas[i].getZIndex() != currentZIndex) {
 			mapa1.getLayers().getArray()[i].setOpacity(100);
 		}
 	}
 }
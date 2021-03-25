function init_Mapa1() {
	//Crear mapa en el elemento DOM
	//CIUDADO: Se crea como variable global para que los eventos puedan modificarlo
	mapa1 = new ol.Map({
		view: new ol.View({
			center: [-15000, 6700000],
			zoom: 5
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://demo.mapserver.org/cgi-bin/wms',
					params: {
						'LAYERS': 'bluemarble',
						'TILED': true
					},
				}),
			})
		],
		target: 'Mapa1'
	});
	//una vez que el movimiento del mapa haya terminado,
	//debemos cambiar los elementos <span> asociados al Centro y al Zoom
	//mapa1.on('evento a monitorizar', funcion manejadora);
	mapa1.on('moveend', changeListener);
}

//FUNCION MANEJADORA del evento moveend
function changeListener() {
	//una vez que el movimiento del mapa haya terminado,
	//debemos cambiar los elementos <span> asociados al Centro y al Zoom
	//nueva variable con los datos obtenidos del mapa
	var nuevoCentro = mapa1.getView().getCenter();
	//proyeccion a geograficas EPSG:4326
	nuevoCentro = ol.proj.toLonLat(nuevoCentro);
	//lo introduzco a los elementos span con innerHTML
	//.toFixed(3)  numero de decimales
	document.getElementById("center").innerHTML = "(" + nuevoCentro[0].toFixed(3) + " lon , " + nuevoCentro[1].toFixed(3) + " lat)";
	//nueva variable con los datos obtenidos del mapa
	var nuevoZoom = mapa1.getView().getZoom();
	//lo introduzco a los elementos span con innerHTML
	document.getElementById("zoom").innerHTML = nuevoZoom + " level";
}

//FUNCION MANEJADORA del botón MoveByPx 
function moveByPx() {
	//window.alert('hola')
	//recojo los datos de desplazamiento del cuadro de texto
	//Para ello accedemos a la propiedad “value” de las cajas
	//de texto id=”xPix1” e id=”yPix1”
	var x = Number(document.getElementById('xPix1').value);
	var y = Number(document.getElementById('yPix1').value);
	//recojo el valor del centro en coordenadas EPSG
	var centro = mapa1.getView().getCenter();
	//lo transformo a coordenadas pixel
	var pixeles = mapa1.getPixelFromCoordinate(centro);
	//sumo el valor de desplazamiento a las coord pixel
	pixeles[0] = pixeles[0] + x;
	pixeles[1] = pixeles[1] + y;
	//el resultado lo vuelvo a convertir a coordenadas EPSG
	centro = mapa1.getCoordinateFromPixel(pixeles);
	//cambio el valor del tengro a mi valor nuevo
	mapa1.getView().setCenter(centro);
}

//FUNCION MANEJADORA del boton moveByLonLat
function moveByLonLat() {
	//recojo los datos numericos del cuaro de texto, OJO SON GRADOS
	var lon = Number(document.getElementById('lon2').value);
	var lat = Number(document.getElementById('lat2').value);
	//obtengo el valor del centro en coordenadas WEB EPSG:3857
	var centro = mapa1.getView().getCenter();
	//hago la proyeccion para tener geograficas EPSG:4326
	//long lat y poder sumarle los grados
	//son este tipo de coordenadas las que visualiza changeListener
	var nuevoCentro = ol.proj.transform(centro, 'EPSG:3857', 'EPSG:4326');
	//sumo el desplazamiento en grados a las coord del centro en long lat
	nuevoCentro[0] = nuevoCentro[0] + lon;
	nuevoCentro[1] = nuevoCentro[1] + lat;
	//vuelvo a las coord EPSG:3857 para poder dibujar el mapa con su proyeccion
	nuevoCentro = ol.proj.transform(nuevoCentro, 'EPSG:4326', 'EPSG:3857');
	//cambio el centro al nuevo valor
	mapa1.getView().setCenter(nuevoCentro);

}

//FUNCION MANEJADORA del boton moveTo
//mover el centro del mapa a una coordenada concreta (hacer panning)
function moveTo() {
	//recojo los datos numericos del cuaro de texto
	var lon = Number(document.getElementById('lon1').value);
	var lat = Number(document.getElementById('lat1').value);
	//corrijo las coord long y lat segun pryeccion del mapa
	var nuevoCentro = ol.proj.fromLonLat([lon, lat]);
	//recojo los datos numericos del cuaro de texto
	var nuevoZoom = Number(document.getElementById('zoom1').value);
	//cambio la vista actual por la que he recogido de los datos
	//compruebo si el checkbox de id dragging1 esta marcado
	if (document.getElementById("dragging1").checked) {
		//si true, cambio la vista con una animacion
		mapa1.getView().animate({
			zoom: nuevoZoom,
			center: nuevoCentro
		});
	} else {
		//si false, cambio la vista normal
		mapa1.getView().setCenter(nuevoCentro);
		mapa1.getView().setZoom(nuevoZoom);
	};
}
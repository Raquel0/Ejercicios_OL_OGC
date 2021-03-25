function init_Mapa1() {
	//Crear mapa en el elemento DOM
	//CIUDADO: Se crea como variable global para que los eventos puedan modificarlo
	var bingApiKey = "AoqHQ_lF0XVJw-wQgHZa-nD_s49vCYuKDLzXriH-cgFPpI0l8bVw_C__Af5BNLnM";

	mapa1 = new ol.Map({
		view: new ol.View({
			zoom: 4,
			center: [-223293, 5247800]
		}),
		target: 'Mapa1',
		layers: [new ol.layer.Tile({
			source: new ol.source.BingMaps({
				key: bingApiKey,
				imagerySet: 'CanvasGray'
			}),
			title: 'CanvasGray'
		})]
	});
	mapa1.on('moveend', changeListener);
	//OBTENGO LA INFORMACION DE CUANDO EMPIEZA Y TERMINA DE CARGAR EL MAPA
	//A CADA MOMENTO LE ASIGNO UN EVENTO
	mapa1.getLayers().getArray()[0].getSource().on('tileloadstart', comienzaCarga);
	mapa1.getLayers().getArray()[0].getSource().on('tileloadend', terminaCarga);
}

//FUNCION PARA CARGAR UN GIF
function comienzaCarga() {
	var img = document.getElementById("loading");
	//cambio la ruta
	img.src = './res/RaGif10.gif';
}

//FUNCION PARA PONER POSICION INDEFINIDA AL OVERLAY
function terminaCarga() {
	var img = document.getElementById("loading");
	//cambio la ruta
	img.src = './res/tik.png';
}

//FUNCION MANEJADORA del evento moveend
function changeListener() {
	//una vez que el movimiento del mapa haya terminado,
	//debemos cambiar los elementos <span> asociados al Centro y al Zoom
	//nueva variable con los datos obtenidos del mapa
	var nuevoCentro = mapa1.getView().getCenter();
	//proyeccion a geograficas
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
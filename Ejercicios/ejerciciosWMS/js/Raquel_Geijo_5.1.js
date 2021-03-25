//UN MAPA CON DOS CAPAS
//UNA CAPA DE OSM Y OTRA VECTORIAL CON EL ARCHIVO JSON DE CIUDADES
function init() {
	mapa = new ol.Map({
		target: 'Mapa1',
		view: new ol.View({
			zoom: 5,
			projection: 'EPSG:4326',
			center: [-1, 42]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),
				opacity: 0.5
			}),
			new ol.layer.Vector({
				source: new ol.source.Vector({
					url: './res/world_cities.json',
					format: new ol.format.GeoJSON
				}),
				//HASTA AQUI CARGAR CAPAS COMO SIEMPRE: OL Y JSON
				//NO APLICO UN ESTILO FIJO. LLAMO A UNA FUNCION
				style: aplicaEstilo
			})
		]
	});

}

//DEFINICION DEL FORMATO DE ESTILO QUE SE VA A PONER CUANDO LLAMA A LA FUNCION APLICAESTILO
function aplicaEstilo(feature) {
	//DISTINTOS RADIOS QUE VOY A UTILIZAR PARA PARAMETRIZAR OTROS VALORES
	var radios = [11, 10, 9, 8, 7, 6, 5];
	//HAGO LA VARIABLE TEXTO VACIA
	var texto = []
	//SI CUMPLE LA CONDICION QUE QUIERO, INTRODUZCO LOS VALORES EN LA VARIABLE QUE HABIA HECHO VACIA
	if (feature.get('POP_RANK') >= 5) {
		texto = feature.get('POP_RANK')
	}
	//COLORES QUE VOY A AOLICAR EN FUNCION DE UN PARAMETRO
	var colores = ['#80ff00', '#80ff00', '#4d9900', '#4d9900', '#ff99b3', '#ff99b3', '#0073e6'];
	//RELLENO BLANCO CON ALGO DE TRANSPARENCIA
	var fill = new ol.style.Fill({
		color: 'rgba(255,255,255,0.4)'
	});
	//CAMBIO EL ESTILO DEL BORDE EN FUNCION DE LA POBLACION
	var stroke = new ol.style.Stroke({
		//hay 7 colores, posicines de 0-6
		//pop rank -1 es para que coja de los valores posibles de pop rank 1-7
		//un color segun su posicion en el array de colores 0-6
		color: colores[feature.get('POP_RANK') - 1],
		width: 1.25
	});

	//ESTILO QUE SE VA A APLICAR CUANDO HAGA LA LLAMADA DESDE EL MAPA
	var nuevoEstilo =
		new ol.style.Style({
			//FORMATO DE CADA CIRCULITO
			image: new ol.style.Circle({
				//RELLENO BLANCO CON TRANSPARENCIA QUE HABIA DEFINIDO ANTES
				fill: fill,
				//BORDE EN FUNCION DE LA POBLACION
				stroke: stroke,
				//APLICO EL MISMO CAMBIO AL RADIO EN VEZ DE AL ESTILO DEL BORDE
				radius: radios[feature.get('POP_RANK') - 1],
			}),
			text: new ol.style.Text({
				//PARA PODER MOSTRARLO TENGO QUE PONERLO EN TEXTO
				text: texto.toString()
			}),
		});
	//MANDO EL ESTILO AL MAPA YA CONSTRUIDO
	return nuevoEstilo;
}
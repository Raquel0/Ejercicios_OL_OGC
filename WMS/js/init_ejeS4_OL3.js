function init() {
	//Crear mapa en el elemento DOM
	var mapa = new ol.Map({
		target: 'Mapa1',
		view: new ol.View({
			zoom: 4,
			projection: 'EPSG:4326',
			center: [0, 42]
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
					params: {
						LAYERS: 'basic'
					}
				})
			}),
			new ol.layer.Vector({
				source: new ol.source.Cluster({
					//EN UNA FUENTE VECTORIAL, CON DISTANCE 30 LE DIGO QUE LO QUE HAYA A MENOS DE 30 PIX DE DISTANCIA LO AGRUPA
					distance: 30,
					source: new ol.source.Vector({
						url: './res/world_cities.json',
						format: new ol.format.GeoJSON()
					})
				}),
				style: cambiarEstilo
			})
		]
	});
}

function cambiarEstilo(feature) {
	//EL NUMERO DE CARACTERISTICAS QUE HAY EN LA CARACTERISTICA FEATURE (DE MAPA, NO DE FICHERO) AGRUPADAS
	var numeroFeatures = feature.get('features').length;
	var nuevoEstilo = new ol.style.Style({
		image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: 'rgba(255,255,255,0.4)'
			}),
			stroke: new ol.style.Stroke({
				color: '#3399CC',
				width: 1.25
			}),
			//El radio crece linealmente. radio= 5 (cuando nº features = 1) radio= 15 (cuando nº features = 21)...
			radius: numeroFeatures / 2 + 4.5
		}),
		//EL NUMERO DE CARACTERISTICAS LO TRANSFORMA A NUMERO ANTES ASI QUE PARA PODER ESCRIBIRLO, VUELVO A PONERLO EN TEXTO
		text: new ol.style.Text({
			text: numeroFeatures.toString(),
		})
	});
	return nuevoEstilo;
}
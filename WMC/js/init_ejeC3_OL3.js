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
				source: new ol.source.OSM()
			})
		]
	});
	//CREO DOS CAPAS VECTORIALES VACÍAS SOBRE LAS QUE VOY A DIBUJAR Y LAS AÑADO AL MAPA
	var capaVectorial1 = new ol.layer.Vector({
		source: new ol.source.Vector()
	});
	var capaVectorial2 = new ol.layer.Vector({
		source: new ol.source.Vector()
	});
	//AÑADO DOS CAPAS NUEVAS DE TIPO VECTORIAL AL MAPA
	mapa.addLayer(capaVectorial1);
	mapa.addLayer(capaVectorial2);

	//SI EL ELEMENTO CON ID CORRESPONDIENTE E LA CAPA 1 ESTA SELECCIONADO
	if (document.getElementById("rbA").checked) {
		//ENCIENDO LOS CONTROLES PARA DIBUJAR POLIGONOS SOBRE LA CAPA 1
		drawControl = new ol.interaction.Draw({
			type: 'Polygon',
			source: capaVectorial1.getSource()
		});
		//DEJO DE VISUALIZAR LA CAPA EM LA QUE NO ESTOY
		mapa.getLayers().getArray()[2].setVisible(false);
	}

	//EL ELEMENTO CON ID CORRESPONDIENTE E LA CAPA 2 ESTA SELECCIONADO
	else {
		//ENCIENDO LOS CONTROLES PARA DIBUJAR POLIGONOS SOBRE LA CAPA 2
		drawControl = new ol.interaction.Draw({
			type: 'Polygon',
			source: capaVectorial2.getSource()
		});
		mapa.getLayers().getArray()[1].setVisible(false);
	}
	//DEJO DE VISUALIZAR LA CAPA EM LA QUE NO ESTOY
	mapa.addInteraction(drawControl);

}

//FUNCION A LA QUE LLAMO CON EL EVENTO ONCHANGE DE LA CAPA 1
function layerAChanged() {
	//SI EL RADIO DE LA CAPA 1 ESTA SELECCIONADO
	if (document.getElementById("rbA").checked) {
		//BORRO LOS CONTROLES DE INTERACCION QUE PUEDA HABER DE ANTES
		mapa.removeInteraction(drawControl);
		//AÑADO UN CONTORL NUEVO DE DIBUJAR POLIGONOS SOBRE LA CAPA 1 QUE ES VECTORIAL
		drawControl = new ol.interaction.Draw({
			type: 'Polygon',
			source: mapa.getLayers().getArray()[1].getSource()
		});
		//AÑADO LA INTERACCION A MI MAPA Y PONGO VISIBLE LA CAPA QUE CORRESPONDA
		mapa.addInteraction(drawControl);
		mapa.getLayers().getArray()[1].setVisible(true);
		mapa.getLayers().getArray()[2].setVisible(false);
	}
}

//FUNCION A LA QUE LLAMO CON EL EVENTO ONCHANGE DE LA CAPA 2
function layerBChanged() {
	//SI EL RADIO DE LA CAPA 2 ESTA SELECCIONADO
	if (document.getElementById("rbB").checked) {
		//BORRO LOS CONTROLES DE INTERACCION QUE PUEDA HABER DE ANTES
		mapa.removeInteraction(drawControl);
		//AÑADO UN CONTORL NUEVO DE DIBUJAR POLIGONOS SOBRE LA CAPA 2 QUE ES VECTORIAL
		drawControl = new ol.interaction.Draw({
			type: 'Polygon',
			source: mapa.getLayers().getArray()[2].getSource()
		});
		//AÑADO LA INTERACCION A MI MAPA Y PONGO VISIBLE LA CAPA QUE CORRESPONDA
		mapa.addInteraction(drawControl);
		mapa.getLayers().getArray()[1].setVisible(false);
		mapa.getLayers().getArray()[2].setVisible(true);
	}
}
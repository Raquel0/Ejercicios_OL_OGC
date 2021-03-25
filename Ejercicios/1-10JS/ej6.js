function cambiar() {
	//CON EL ID accedo a la ruta actual de la imagen que se muestra
	//y lo guardo en imgActual
	var imgActual = document.getElementById("imagen");

	//comprobar si dicha URL contiene el nombre de la imagen
	//-1 si NO contiene el nombre de la imagen o un número mayor
	//o igual que cero si lo contiene.
	if (imgActual.src.indexOf("click.png") > -1) {
		imgActual.src = "mapa.jpg";
	} else {
		imgActual.src = "click.png";
	}
}
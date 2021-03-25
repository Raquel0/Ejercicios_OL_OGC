function colocaImagen() {
	//obtengo la informaci�n sobre la seleccion
	var selec = document.getElementById("fuente").value;
	//hago referenci a la ruta
	var img = document.getElementById("imagen");
	//cambio la ruta
	img.src = selec;

}
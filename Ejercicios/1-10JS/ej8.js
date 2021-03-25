conta = 0;

function cambiarTexto() {
	conta++;

	var datosSalida = document.getElementById("texto");
	datosSalida.innerHTML = "Has hecho click " + conta + " veces";
}
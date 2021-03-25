//inicializo la lista vacia como variable global
lista = ["elemento1", "elemento2"];

//funcion para mostrar la lista
function muestraLista() {
	var datosSalida = document.getElementById("array");
	var i = 0;
	for (i = 0; i < (lista.length); i++) {
		datosSalida.innerHTML += "<li>" + lista[i] + "</li>";
	}

}
//mi boton tiene un evento, cuando hago click ocurre lo que haya en mostrarTabla
function mostrarTabla() {
	//accedo al elemento que se llama numero y la propiedad . value me saca el contenido de la caja de texto
	var mensaje = Number(document.getElementById("numero").value);
	/**
	 *Verificar los valores de los cuadros de texto. Si no es un
	 * valor numerico, entre 1 y 9
	 */
	if (mensaje < 1 || mensaje > 9) {
		alert("El número no está entre 1 y 9");
	} else {
		//como el numero si esta entre 1 y 9 hago la tabla de multiplicar
		//inicializo la variable body y le asigno pinta de titulo
		var body = "<h1>Tabla de multiplicar del " + mensaje + "</h1>";
		//tabla de multiplicar como tal
		for (i = 0; i <= 9; i++) {
			body = body + "<p>" + mensaje + " x " + i + " = " + i * mensaje + "</p>";
		}
		//convierto x en una referencia al div del html
		var x = document.getElementById("solucion");
		//relleno el elemento del html al que hice referencia con var x
		x.innerHTML = body
	}

}
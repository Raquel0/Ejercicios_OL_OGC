//el boton añadir del HTML tiene un evento, cuando haga click ocurre lo que haya en anadirDatos()
//<input id="anadir" type="button" value="Añadir" onclick="anadirDatos()"/>

function anadirDatos() {
	//accedo al elemento que se llama nombre 
	var mensaje = document.getElementById("nombre").value;

	if (document.getElementById("mujer").checked) {
		mensaje += " es una mujer";
	}
	if (document.getElementById("hombre").checked) {
		mensaje += " es un hombre";
	}

	//obtengo lo que contiene value, aqui no necesito un for porque 
	//edad ya tiene su value asignado
	var seleccinado_lista = document.getElementById("edad").value;
	mensaje += " y es " + seleccinado_lista

	var datosSalida = document.getElementById("datos");
	datosSalida.innerHTML = mensaje;
}
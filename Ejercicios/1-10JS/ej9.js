function Init() {
	var fecha = new Date();
	var datosSalida = document.getElementById("fecha_hora");
	var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	datosSalida.innerHTML = "Hoy es " + fecha.getDay() + " de " + months[fecha.getMonth()] + " del a�o " + fecha.getFullYear();
}
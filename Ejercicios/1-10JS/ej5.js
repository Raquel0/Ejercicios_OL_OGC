function sumar() {
	num1 = Number(document.getElementById("numero1").value);
	num2 = Number(document.getElementById("numero2").value);

	var datosSalida = document.getElementById("texto");
	datosSalida.innerHTML = num1 + num2;
}

function restar() {
	num1 = Number(document.getElementById("numero1").value);
	num2 = Number(document.getElementById("numero2").value);

	var datosSalida = document.getElementById("texto");
	datosSalida.innerHTML = num1 - num2;
}

function multiplicar() {
	num1 = Number(document.getElementById("numero1").value);
	num2 = Number(document.getElementById("numero2").value);

	var datosSalida = document.getElementById("texto");
	datosSalida.innerHTML = num1 * num2;
}

function dividir() {
	num1 = Number(document.getElementById("numero1").value);
	num2 = Number(document.getElementById("numero2").value);

	var datosSalida = document.getElementById("texto");
	datosSalida.innerHTML = num1 / num2;
}
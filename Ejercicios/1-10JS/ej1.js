//variable que se llama body de tipo string que con todo el contenido
body = "<h1>Tabla de multiplicacr del 8</h1>";

//para hacer lo mismo las 10 veces uso un for
for (i = 0; i <= 9; i++) {
	body = body + "<p>8 x " + i + " = " + i * 8 + "</p>";
}
document.write(body);
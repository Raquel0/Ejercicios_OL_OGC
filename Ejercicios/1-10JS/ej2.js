//variable que se llama body de tipo string que con todo el contenido
body = "<h1>Números menores que 100 que son múltiplos de 2 y de 3</h1>";

//para hacer lo mismo las 100 veces uso un for
for (i = 0; i <= 100; i++) {
	//dos formas de hacer lo mismo
	/*if(i%2==0){
		if(i%2==0){
			body = body + "<p>" + i + "</p>";
		}
	}*/
	if (i % 2 == 0 && i % 3 == 0) {
		body = body + "<p>" + i + "</p>";
	}
}
document.write(body);
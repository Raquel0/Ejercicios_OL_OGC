//Crear mapa en el elemento DOM
//CIUDADO: Se crea como variable global para que los eventos puedan modificarlo
function init_Mapa1() {
    mapa = new ol.Map({
        view: new ol.View({
            center: [-15000, 6700000],
            zoom: 5
        }),
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        })],
        target: 'Mapa1'
    });
}

//evento onchange del checkbox MousePosition
//**Si checked incorporar un control de posición de ratón
//**Si no “checked” eliminar el control de posición de ratón
function updateMousePosition() {
    if (document.getElementById("MousePosition").checked) {
        mapa.addControl(new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(2)
        }));
    } else {
        //Si no está “checked” debemos eliminar el control del mapa.
        //Sin embargo, al igual que con las capas, no sabemos cuántos
        //controles hay añadidos ni qué posición ocupa el que deseamos
        //eliminar. Por eso, vamos a obtener un array con todos loscontroles
        //controles que aparecen en el mapa y vamos a recorrer dicho array
        //analizando qué tipo de control es. Para eso, podemos utilizar la
        //instrucción “instanceof”. Por ejemplo, “arrayControles[0] instanceof
        //ol.control.MousePosition” nos devolverá un valor booleano
        var arrayControls = mapa.getControls().getArray();
        for (var i = 0; i < arrayControls.length; i++) {
            if (arrayControls[i] instanceof ol.control.MousePosition) {
                //**True si el primer control del mapa es un control de tipo
                //MousePosition
                //**False si el primer control del mapa no es un control de tipo
                //MousePosition
                //Con esta comprobación, podemos ir recorriendo y, en cuanto lo
                //encontremos, procedemos a su eliminación
                mapa.removeControl(arrayControls[i]);
            }
        }
    }
}

//evento onchange del checkbox Zoom Button
//**Si checked incorporar un control
//**Si no “checked” eliminar el control
function updateZoomButton() {
    if (document.getElementById("ZoomButton").checked) {
        mapa.addControl(new ol.control.ZoomToExtent({}));
    } else {
        //array con todos los controles que aparecen en el mapa
        //analizar qué tipo de control es con instrucción “instanceof”
        var arrayControls = mapa.getControls().getArray();
        for (var i = 0; i < arrayControls.length; i++) {
            if (arrayControls[i] instanceof ol.control.ZoomToExtent) {
                //**True si el primer control del mapa es un control del tipo que busco
                //**False si el primer control del mapa no es un control de tipo que busco
                //en cuanto lo encontremos, procede a su eliminación
                mapa.removeControl(arrayControls[i]);
            }
        }
    }
}

//evento onchange del checkbox Zoom Panel
//**Si checked incorporar un control
//**Si no “checked” eliminar el control
function updateZoomPanel() {
    if (document.getElementById("ZoomPanel").checked) {
        mapa.addControl(new ol.control.Zoom({}));
    } else {
        //array con todos los controles que aparecen en el mapa
        //analizar qué tipo de control es con instrucción “instanceof”
        var arrayControls = mapa.getControls().getArray();
        for (var i = 0; i < arrayControls.length; i++) {
            if (arrayControls[i] instanceof ol.control.Zoom) {
                //**True si el primer control del mapa es un control del tipo que busco
                //**False si el primer control del mapa no es un control de tipo que busco
                //en cuanto lo encontremos, procede a su eliminación
                mapa.removeControl(arrayControls[i]);
            }
        }
    }
}
 function init() {
     init_Mapa1();
 }

 //INICIALIZAR MAPA CON UNA CAPA BASE DE BING
 function init_Mapa1() {
     //Crear mapa en el elemento DOM
     var bingApiKey = "AoqHQ_lF0XVJw-wQgHZa-nD_s49vCYuKDLzXriH-cgFPpI0l8bVw_C__Af5BNLnM";
     //LO DECLARO COMO VARIABLE GLOBAL PARA PODER AÑADIR LAS IMAGENES MAS ADELANTE
     mapa1 = new ol.Map({
         view: new ol.View({
             zoom: 4,
             center: [-223293, 5247800],
         }),
         target: 'Mapa1',
         layers: [new ol.layer.Tile({
             source: new ol.source.BingMaps({
                 key: bingApiKey,
                 imagerySet: 'CanvasGray'
             }),
             title: 'CanvasGray'
         })]
     });
 }

 //MENU DESPLEGABLE
 function anadirImagen() {
     //el valor del elemento seleccionado en la lista desplegable
     var layerName = document.getElementById('imageSelection').value;
     if (layerName == 'capa0') {
         anadirImagen0();
     }
     if (layerName == 'capa1') {
         anadirImagen1();
     }
 }

 //FUNCION PARA AÑADIR LA IMAGEN 1 COMO CAPA
 function anadirImagen0() {
     //transformacion de coordenadas al sistema que quiero para usarl la imagen
     var extentImagen0 = ol.proj.transformExtent([-6.80527, 35.10721816, -0.61306, 37.94758957], 'EPSG:4326', 'EPSG:3857');
     var nuevaCapa = new ol.layer.Image({
         source: new ol.source.ImageStatic({
             url: './res/S2A_OPER_BWI_MSIL1C_PDMC_20160514T220104_R094_V20160514T110529_20160514T110529.png',
             imageExtent: extentImagen0
         })
     });
     mapa1.addLayer(nuevaCapa);
 }

 //FUNCION PARA AÑADIR LA IMAGEN 2 COMO CAPA
 function anadirImagen1() {
     var extentImagen1 = ol.proj.transformExtent([-2.53, 41.88, -0.66, 43.35], 'EPSG:4326', 'EPSG:3857');
     var nuevaCapa = new ol.layer.Image({
         source: new ol.source.ImageStatic({
             url: './res/IDENA-mapaBase_orto.png',
             imageExtent: extentImagen1
         })
     });
     mapa1.addLayer(nuevaCapa);
 }
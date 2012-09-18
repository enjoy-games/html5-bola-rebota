/*
                                ESPAÑOL

  Este archivo es parte de 'html5-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-bola-rebota' es software libre: usted puede redistribuirlo y/o
  modificarlo bajo los términos de la Licencia Pública General GNU publicada por
  la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,o (a
  su elección) cualquier versión posterior.

  'html5-bola-rebota' se distribuye con la esperanza de que sea útil, pero SIN
  GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de APTITUD PARA
  UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia Pública General
  GNU para obtener una información más detallada.

  Debería haber recibido una copia de la Licencia Pública General GNU junto a
  'html5-bola-rebota'. En caso contrario, consulte
  <http://www.gnu.org/licenses/>.


                                ENGLISH

  This file is part of 'html5-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-bola-rebota' is free software: you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by the Free
  Software Foundation, either version 3 of the License, or (at your option) any
  later version.

  'html5-bola-rebota' is distributed in the hope that it will be useful, but
  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
  details.

  You should have received a copy of the GNU General Public License along with
  'html5-bola-rebota'. If not, see <http://www.gnu.org/licenses/>.

*/
;


// CLASE cámara.

function Camara2D(imagenes, elementos) {


// PROPIEDADES.    --------//

	// Activa o desactiva modo debug.
	this.debugMode = true;

	// Referencia al almacén de imágenes.
	this.img = imagenes;

	// Referencia al almacén de elementos.
	this.elementos = elementos;

	// Medidas de gráficos.
	this.ancho = 800; this.alto = 600;

	// Referencia al elemento gráfico canvas.
	this.canvasGameScreen = document.getElementById('canvasGameScreen');

	// Objeto que efectúa operaciones de dibujo 2d en canvas.
	this.contextGameScreen = this.canvasGameScreen.getContext('2d');

	// Buffer para técnica de double buffering.
	this.canvasBufferScreen = document.createElement('canvas');

	// Objeto que efectúa operaciones de dibujo 2d en el buffer.
	this.contextBufferScreen = this.canvasBufferScreen.getContext('2d');

	// Resolución del elemento canvas.
	this.canvasGameScreen.width = this.ancho;
	this.canvasGameScreen.height = this.alto;

	// Resolución del buffer.
	this.canvasBufferScreen.width = this.canvasGameScreen.width;
	this.canvasBufferScreen.height = this.canvasGameScreen.height;


// MÉTODOS.    --------//

	// Actualiza el gráfico canvas.
	this.actualizar = function() {

		// Mostrar texto de licencia.
		if( elementos['estados'].licencia ) {

			var texto = new Array();
			texto[0] = 'Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>';
			texto[1] = '';
			texto[2] = "'html5-bola-rebota' es software libre: usted puede redistribuirlo y/o";
			texto[3] = 'modificarlo bajo los términos de la Licencia Pública General GNU publicada por';
			texto[4] = 'la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,o (a';
			texto[5] = 'su elección) cualquier versión posterior.';
			texto[6] = '';
			texto[7] = "'html5-bola-rebota' se distribuye con la esperanza de que sea útil, pero SIN";
			texto[8] = 'GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de APTITUD PARA';
			texto[9] = 'UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia Pública General';
			texto[10] = 'GNU para obtener una información más detallada.';
			texto[11] = '';
			texto[12] = 'Debería haber recibido una copia de la Licencia Pública General GNU junto a';
			texto[13] = "'html5-bola-rebota'. En caso contrario, consulte";
			texto[14] = '<http://www.gnu.org/licenses/>.';
			texto[15] = '';

			this.contextBufferScreen.fillStyle = '#FFFFFF';
			this.contextBufferScreen.fillRect(0, 0, this.canvasGameScreen.width, this.canvasGameScreen.height);

			this.contextBufferScreen.font = "normal 18px verdana";
			this.contextBufferScreen.fillStyle = '#000000';
			this.contextBufferScreen.textBaseline = 'top';

			this.contextBufferScreen.drawImage(this.img['gplv3-127x51'], 50, 30);
			var i;
			for(i = 0; i < texto.length; i++) {
				this.contextBufferScreen.fillText(texto[i], 25, 90+i*20);
			}

			this.contextBufferScreen.fillStyle = '#000099'; 
			this.contextBufferScreen.fillText('Pulsa una tecla para continuar.', 30, 90+i*20);

		// Mostrar pantalla de menú.
		} else if( elementos['estados'].menu ) {

			this.contextBufferScreen.drawImage(this.img['menu'], 0, 0);

		// Mostrar pantalla de juego.
		} else if( elementos['estados'].juego ) {

		// FONDO.    --------//

			this.contextBufferScreen.drawImage(this.img['juego'], 0, 0);


		// BOLA.    --------//

			// Dibuja la pelota en la pantalla.
			this.contextBufferScreen.drawImage(
				this.img['bola'],
				this.elementos['bola'].x,
				this.elementos['bola'].y
			);

			// Depuración de pelota.
			if( this.debugMode ) {

				// Posición de la caja.
				var x = this.elementos['bola'].x + 19;
				var y = this.elementos['bola'].y + 19;

				// Alto del texto en medida pt.
				var height = 10;

				// Datos a mostrar.
				var x_pos = Math.round(this.elementos['bola'].x * 100) / 100;
				var y_pos = Math.round(this.elementos['bola'].y * 100) / 100;
				var vel_x = Math.round(this.elementos['bola'].vel_x * 100) / 100;
				var vel_y = Math.round(this.elementos['bola'].vel_y * 100) / 100;

				// Lineas de información.
				var lines = Array();
				lines[0] = "x=" + x_pos + ",y=" + y_pos;
				lines[1] = "vel_x=" + vel_x + "";
				lines[2] = "vel_y=" + vel_y + "";

				// Tamaño y fuente.
				this.contextBufferScreen.font = height + "pt Calibri";

				// Obtiene el ancho de la primera línea.
				var metrics = this.contextBufferScreen.measureText("x=000.00,y=000.00");
				var width = metrics.width;

				// Dibuja la caja.
				this.contextBufferScreen.beginPath();
				this.contextBufferScreen.fillStyle = "#d0efff";
				this.contextBufferScreen.fillRect(
					x - 2,
					y - height - 2,
					width + 4,
					lines.length*height + 4
				);

				// Dibuja el texto.
				this.contextBufferScreen.beginPath();
				this.contextBufferScreen.fillStyle = "#555555";
				for( var i = 0; i < lines.length; i++ )
					this.contextBufferScreen.fillText(lines[i], x, y + i*height);

			}


		// CONTADOR JUGADOR.     --------//

			// Tamaño y fuente.
			this.contextBufferScreen.font = "60pt Calibri";

			// Dibuja el texto.
			this.contextBufferScreen.beginPath();
			this.contextBufferScreen.fillStyle = "#ffffff";
			this.contextBufferScreen.textBaseline = 'top';
			this.contextBufferScreen.fillText(
				this.elementos['pala_jugador'].puntos,
				27,
				56
			);


		// CONTADOR IA.     --------//

			// Tamaño y fuente.
			this.contextBufferScreen.font = "60pt Calibri";

			// Dibuja el texto.
			this.contextBufferScreen.beginPath();
			this.contextBufferScreen.fillStyle = "#ffffff";
			this.contextBufferScreen.textBaseline = 'top';
			this.contextBufferScreen.fillText(
				this.elementos['pala_ia'].puntos,
				730,
				56
			);

		// Mostrar texto de ganador.
		} else if( elementos['estados'].ganador ) {

			// Alto del texto en medida pt.
			var height = 40;

			// Tamaño y fuente.
			this.contextBufferScreen.font = height + "pt Calibri";

			// Texto a mostrar.
			var texto = "Has ganado";

			// Obtiene el ancho del texto a mostrar.
			var width = this.contextBufferScreen.measureText(texto).width;

			// Posición de la caja.
			var x = 800/2 - width/2;
			var y = 600/2;

			// Dibuja la caja.
			this.contextBufferScreen.beginPath();
			this.contextBufferScreen.fillStyle = "#9ff781";
			this.contextBufferScreen.textBaseline = 'top';
			this.contextBufferScreen.fillRect(
				x,
				y,
				width,
				height + 25
			);

			// Dibuja el texto.
			this.contextBufferScreen.beginPath();
			this.contextBufferScreen.fillStyle = "#38610b";
			this.contextBufferScreen.fillText(
				"Has ganado",
				x,
				y
			);

		// Mostrar texto de perdedor.
		} else if( elementos['estados'].perdedor ) {

		// Mostrar pantalla de pausa.
		} else if( elementos['estados'].pausa ) {
			// TODO
		}


	// VOLCADO DEL BUFFER AL CANVAS VISIBLE.    --------//

		// Pasa el contenido del buffer al canvas.
		this.contextGameScreen.drawImage(this.canvasBufferScreen, 0, 0);
	};

	// Ajusta el tamaño del canvas a cualquier resolución de pantalla.
	this.ajustarGameScreen = function() {
		// Proporción de ancho / alto deseada.
		var widthToHeight = this.ancho / this.alto; // 320px*240px

		// Ancho y alto actuales de la ventana.
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		// Proporción de ancho / alto actual.
		var newWidthToHeight = newWidth / newHeight;

		// Si hay mas ancho del deseado...
		if (newWidthToHeight > widthToHeight) {
			// Se ajusta al alto.
			newWidth = newHeight * widthToHeight;
			this.canvasGameScreen.style.height = newHeight + 'px';
			this.canvasGameScreen.style.width = newWidth + 'px';
		} else {
		// Si hay mas alto del deseado...
			// Se ajusta al ancho.
			newHeight = newWidth / widthToHeight;
			this.canvasGameScreen.style.width = newWidth + 'px';
			this.canvasGameScreen.style.height = newHeight + 'px';
		}

		// Según las medidas actuales, se centra el canvas.
		this.canvasGameScreen.style.marginTop = (-newHeight / 2) + 'px';
		this.canvasGameScreen.style.marginLeft = (-newWidth / 2) + 'px';
	};

	// Información en consola javascript del navegador.
	console.info("Creado objeto de clase Camara.");
}

// Información en consola javascript del navegador.
console.info("Incluído html5-bola-rebota.camara2d.js");

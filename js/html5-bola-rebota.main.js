/*
                                ESPAÑOL

  Este archivo es parte de 'html5-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-bola-rebota' es software libre: usted puede redistribuirlo y/o
  modificarlo bajo los términos de la Licencia Pública General GNU publicada
  por la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,
  o (a su elección) cualquier versión posterior.

  'html5-bola-rebota' se distribuye con la esperanza de que sea útil, pero
  SIN GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de
  APTITUD PARA UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia
  Pública General GNU para obtener una información más detallada.

  Debería haber recibido una copia de la Licencia Pública General GNU junto a
  'html5-bola-rebota'. En caso contrario, consulte
  <http://www.gnu.org/licenses/>.


                                ENGLISH

  This file is part of 'html5-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-bola-rebota' is free software: you can redistribute it and/or
  modify it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or (at your
  option) any later version.

  'html5-bola-rebota' is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
  Public License for more details.

  You should have received a copy of the GNU General Public License along with
  'html5-bola-rebota'. If not, see <http://www.gnu.org/licenses/>.

*/
;
// VARIABLES.    --------//

	// Contenedor de imagenes.
	var contenedor_imagenes = new Object();

	// Objeto Image para almacenar la imagen de la licencia GPL3.
	contenedor_imagenes['gplv3-127x51'] = new Image();
	contenedor_imagenes['gplv3-127x51'].src = 'img/gplv3-127x51.png';

	// Objeto Image para almacenar la imagen de fondo del menú.
	contenedor_imagenes['menu'] = new Image();
	contenedor_imagenes['menu'].src = 'img/menu.jpg';

	// Objeto Image para almacenar la imagen de fondo del juego.
	contenedor_imagenes['juego'] = new Image();
	contenedor_imagenes['juego'].src = 'img/juego.jpg';

	// Objeto Image para almacenar la imagen de la bola.
	contenedor_imagenes['bola'] = new Image();
	contenedor_imagenes['bola'].src = "img/bola.png";

	// Objeto Image para almacenar la imagen de la pala del jugador.
	contenedor_imagenes['pala_jugador'] = new Image();
	contenedor_imagenes['pala_jugador'].src = "img/pala_jugador.png";

	// Objeto Image para almacenar la imagen de la pala de la IA.
	contenedor_imagenes['pala_ia'] = new Image();
	contenedor_imagenes['pala_ia'].src = "img/pala_ia.png";

	// Información en consola javascript del navegador.
	console.info("Creado almacén de imágenes.");

	// Contenedor de elementos.
	var contenedor_elementos = new Object();

	// Objeto estados (Distintos estados posibles del juego).
	contenedor_elementos['estados'] = {
		licencia: false,
		menu: false,
		juego: false,
		pausa: false,
		ganador: false,
		perdedor: false
	};

	// Objeto bola.
	contenedor_elementos['bola'] = {
		x: 150,
		y: 50,
		vel_x: 4,
		vel_y: 4,
		top: 0,
		left: 40,
		right: 279,
		bottom: 239
	};

	// Objeto pala_jugador.
	contenedor_elementos['pala_jugador'] = {
		x: 150,
		y: 100,
		vel_x: 4,
		left: contenedor_elementos['bola'].left,
		right: contenedor_elementos['bola'].right,
		puntos: 0
	};

	// Objeto pala_ia.
	contenedor_elementos['pala_ia'] = {
		x: contenedor_elementos['pala_jugador'].x,
		y: 1,
		vel_x: contenedor_elementos['pala_jugador'].vel_x,
		left: contenedor_elementos['pala_jugador'].y.left,
		right: contenedor_elementos['pala_jugador'].y.right,
		puntos: 0
	};

	// Referencia al objeto de clase camara2d.
	var camara2d = null;

	// Referencia al hilo de ejecución del bucle principal.
	var mainLoop = null;


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function buclePrincipal() {
		// Actualiza el estado de la bola.
		// TODO

		// Actualiza los gráficos del canvas.
		camara2d.actualizar();

		// Crea un hilo de ejecución para el siguiente frame.
		mainLoop = window.requestAnimationFrame(buclePrincipal);
	};


// EVENTOS.    --------//

	// Evento de página cargada.
	$(document).ready(function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.onload");

		// Estado inicial.
		contenedor_elementos['estados'].licencia = true;

		// Objeto de clase Camara2D (ver /js/html5-bola-rebota.camara2d.js).
		camara2d = new Camara2D(contenedor_imagenes, contenedor_elementos);

		// Ajuste del canvas a la resolución de pantalla.
		camara2d.ajustarGameScreen();

		// Evento de cambio del tamaño de la ventana.
		$(window).resize(function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.resize");

			// Ajuste del canvas a la resolución de pantalla.
			camara2d.ajustarGameScreen();
		});

		// Evento de menú contextual.
		window.oncontextmenu = function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.oncontextmenu");

			// Desactivar menú contextual.
			return false;
		};

		// Evento de tecla pulsada.
		window.onkeydown = function (e) {
			// Información en consola javascript del navegador.
			console.info("Evento window.onkeydown (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");

			// Almacena código numérico del caracter pulsado.
			var keycode = null;

			// Almacena el caracter pulsado.
			var keychar = null;

			// IE8 y anteriores.
			if (window.event)
				keycode = e.keyCode;
			// IE9/Firefox/Chrome/Opera/Safari.
			else if (e.which)
				keycode = e.which;

			// De código numérico(keycode) a carácter(keychar).
			keychar = String.fromCharCode(keycode);

			if( contenedor_elementos['estados'].licencia ) {

				// Información en consola javascript del navegador.
				console.info("Estado: Menú.");

				contenedor_elementos['estados'].licencia = false;
				contenedor_elementos['estados'].menu = true;

			} else if( contenedor_elementos['estados'].menu ) {

				// Si pulsa alguna tecla...
				switch (keychar) {

				// Si pulsa la tecla espacio.
					case ' ':

						// Información en consola javascript del navegador.
						console.info("Estado: Juego.");

						contenedor_elementos['estados'].menu = false;
						contenedor_elementos['estados'].juego = true;

					break;

				}

			} else {
				// TODO
			}
			// El evento continúa normalmente.
			return true;
		};

		// Ejecuta el bucle principal.
		buclePrincipal();
	});

// Información en consola javascript del navegador.
console.info("Incluído html5-bola-rebota.main.js");

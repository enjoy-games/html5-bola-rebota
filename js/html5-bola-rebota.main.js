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

	// Referencia al objeto de clase camara2d.
	var camara2d = null;

	// Referencia al hilo de ejecución del bucle principal.
	var mainLoop = null;

	// Estadísticas.
	var stats_fps = new Stats(), stats_ms = new Stats();
	stats_fps.setMode(0); stats_ms.setMode(1); // 0: fps, 1: ms
	// Align top-left
	stats_fps.domElement.style.position = 'absolute';
	stats_fps.domElement.style.left = '0px';
	stats_fps.domElement.style.top = '0px';
	// Align top-left
	stats_ms.domElement.style.position = 'absolute';
	stats_ms.domElement.style.left = '100px';
	stats_ms.domElement.style.top = '0px';


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function buclePrincipal() {
		// Estadísticas.
		stats_fps.begin();
		stats_ms.begin();


	// ESTADO: LICENCIA.

		if( contenedor_elementos['estados'].licencia  ) {

			// Objeto bola.
			contenedor_elementos['bola'] = {
				x: 800/2,
				y: 600/2,
				vel_x: 16,
				vel_y: -8,
				top: 0,
				left: 100,
				right: 700 - 16,
				bottom: 600 - 16,
				ancho: 16,
				alto: 16
			};

			// Objeto pala_jugador.
			contenedor_elementos['pala_jugador'] = {
				x: 800/2,
				y: 570,
				vel_x: 0,
				left: contenedor_elementos['bola'].left,
				right: contenedor_elementos['bola'].right,
				puntos: 0
			};

			// Objeto pala_ia.
			contenedor_elementos['pala_ia'] = {
				x: contenedor_elementos['pala_jugador'].x,
				y: 20,
				vel_x: 0,
				left: contenedor_elementos['pala_jugador'].left,
				right: contenedor_elementos['pala_jugador'].right,
				puntos: 0
			};


		}

	// ESTADO: JUEGO.

		if( contenedor_elementos['estados'].juego ) {

		// ACTUALIZA EL ESTADO DE LA BOLA.

			// Desplazamiento.
			contenedor_elementos['bola'].x += contenedor_elementos['bola'].vel_x;
			contenedor_elementos['bola'].y += contenedor_elementos['bola'].vel_y;

			// Colision con borde derecho.
			if( contenedor_elementos['bola'].x > contenedor_elementos['bola'].right - contenedor_elementos['bola'].ancho ) {

				// Respeta el límite.
				contenedor_elementos['bola'].x = contenedor_elementos['bola'].right - contenedor_elementos['bola'].ancho;

				// Rebota.
				contenedor_elementos['bola'].vel_x *= -1; // TODO random.

			}

			// Colision con borde izquierdo.
			if( contenedor_elementos['bola'].x < contenedor_elementos['bola'].left ) {

				// Respeta el límite.
				contenedor_elementos['bola'].x = contenedor_elementos['bola'].left

				// Rebota.
				contenedor_elementos['bola'].vel_x *= -1; // TODO random.

			}

			// Colision con pala jugador.
			if( contenedor_elementos['bola'].x + 16 >= contenedor_elementos['pala_jugador'].x
				&& contenedor_elementos['bola'].x + 16 <= contenedor_elementos['pala_jugador'].x + 38
				&& contenedor_elementos['bola'].y + 32 > contenedor_elementos['pala_jugador'].y ) {

				console.info('colisión pala jugador');

				// Respeta el límite.
				contenedor_elementos['bola'].y = contenedor_elementos['pala_jugador'].y - 32;

				// Rebota.
				contenedor_elementos['bola'].vel_y = -8; // TODO random.

			}

			// Colision con pala IA.
			if( contenedor_elementos['bola'].x + 16 >= contenedor_elementos['pala_ia'].x
				&& contenedor_elementos['bola'].x + 16 <= contenedor_elementos['pala_ia'].x + 38
				&& contenedor_elementos['bola'].y < contenedor_elementos['pala_ia'].y + 10 ) {

				console.info('colisión pala ia');

				// Respeta el límite.
				contenedor_elementos['bola'].y = contenedor_elementos['pala_ia'].y + 10;

				// Rebota.
				contenedor_elementos['bola'].vel_y = 8; // TODO random.

			}

			// Colision con borde superior.
			if( contenedor_elementos['bola'].y < contenedor_elementos['bola'].top ) {

				// Respeta el límite.
				contenedor_elementos['bola'].y = contenedor_elementos['bola'].top;

				// Rebota.
				contenedor_elementos['bola'].vel_y *= -1;

				// Punto para el jugador.
				contenedor_elementos['pala_jugador'].puntos ++;

			}

			// Colision con borde inferior.
			if( contenedor_elementos['bola'].y > contenedor_elementos['bola'].bottom - contenedor_elementos['bola'].alto ) {

				// Respeta el límite.
				contenedor_elementos['bola'].y = contenedor_elementos['bola'].bottom - contenedor_elementos['bola'].alto;

				// Rebota.
				contenedor_elementos['bola'].vel_y *= -1;

				// Punto para la IA.
				contenedor_elementos['pala_ia'].puntos ++;

			}


		// ACTUALIZA EL ESTADO DE LA PALA DEL JUGADOR.

			// Limite izquierdo.
			if( contenedor_elementos['pala_jugador'].x >= contenedor_elementos['pala_jugador'].left
				&& contenedor_elementos['pala_jugador'].x <= contenedor_elementos['pala_jugador'].right - 25 )
				// Se mueve.
				contenedor_elementos['pala_jugador'].x += contenedor_elementos['pala_jugador'].vel_x;

			// Se asegura de que no sobrepasa el límite izquierdo.
			if( contenedor_elementos['pala_jugador'].x < contenedor_elementos['pala_jugador'].left )
				contenedor_elementos['pala_jugador'].x = contenedor_elementos['pala_jugador'].left;

			// Se asegura de que no sobrepasa el límite derecho.
			if( contenedor_elementos['pala_jugador'].x > contenedor_elementos['pala_jugador'].right - 25)
				contenedor_elementos['pala_jugador'].x = contenedor_elementos['pala_jugador'].right - 25;


		// ACTUALIZA EL ESTADO DE LA PALA DE LA IA.

			// Limite izquierdo.
			if( contenedor_elementos['pala_ia'].x >= contenedor_elementos['pala_ia'].left
				&& contenedor_elementos['pala_ia'].x <= contenedor_elementos['pala_ia'].right - 25 ) {

				if( contenedor_elementos['pala_ia'].x >= contenedor_elementos['bola'].x ) {

					// Se mueve a la izquierda.
					contenedor_elementos['pala_ia'].vel_x = -18;

				}
				if( contenedor_elementos['pala_ia'].x + 38 <= contenedor_elementos['bola'].x ) {

					// Se mueve a la derecha.
					contenedor_elementos['pala_ia'].vel_x = 18;

				}
			} else {

				contenedor_elementos['pala_ia'].vel_x = 0;

			}

				contenedor_elementos['pala_ia'].x += contenedor_elementos['pala_ia'].vel_x;

			// Se asegura de que no sobrepasa el límite izquierdo.
			if( contenedor_elementos['pala_ia'].x < contenedor_elementos['pala_ia'].left )
				contenedor_elementos['pala_ia'].x = contenedor_elementos['pala_ia'].left;

			// Se asegura de que no sobrepasa el límite derecho.
			if( contenedor_elementos['pala_ia'].x > contenedor_elementos['pala_ia'].right - 25)
				contenedor_elementos['pala_ia'].x = contenedor_elementos['pala_ia'].right - 25;

		}

		// Actualiza los gráficos del canvas.
		camara2d.actualizar();


	// FIN DE JUEGO.

		// Gana el jugador
		if( contenedor_elementos['pala_jugador'].puntos >= 3 ) {

			contenedor_elementos['estados'].juego = false;
			contenedor_elementos['estados'].ganador = true;

			contenedor_elementos['pala_jugador'].puntos = 0;

			// Reiniciar tras 5 segundos.
			setTimeout(function(){

				console.info('Fin de juego: Reiniciar.');

				contenedor_elementos['estados'].ganador = false;
				contenedor_elementos['estados'].licencia = true;

			}, 5000);

		}

		// Gana la IA.
		if( contenedor_elementos['pala_ia'].puntos >= 3 ) {

			contenedor_elementos['estados'].juego = false;
			contenedor_elementos['estados'].perdedor = true;

			contenedor_elementos['pala_ia'].puntos = 0;

			// Reiniciar tras 5 segundos.
			setTimeout(function(){

				console.info('Fin de juego: Reiniciar.');

				contenedor_elementos['estados'].perdedor = false;
				contenedor_elementos['estados'].licencia = true;

			}, 5000);

		}


		// Crea un hilo de ejecución para el siguiente frame.
		mainLoop = window.requestAnimationFrame(buclePrincipal);

		// Estadísticas.
		stats_fps.end();
		stats_ms.end();
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

		/* Estadísticas. * /
		document.body.appendChild( stats_fps.domElement );
		document.body.appendChild( stats_ms.domElement );
		/**/

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
		$(window).keydown(function (e) {
			// Información en consola javascript del navegador.
			console.info("Evento window.onkeydown (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");
			console.info(e);

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

			} else if( contenedor_elementos['estados'].juego ) {

				// Si pulsa alguna tecla...
				switch (keycode) {

				// Si pulsa la tecla enter.
					case 13:

						// Información en consola javascript del navegador.
						console.info("Estado: Pausa.");

						contenedor_elementos['estados'].juego = false;
						contenedor_elementos['estados'].pausa = true;

					break;

				// Si pulsa la tecla flecha izquierda.
					case 37:

						contenedor_elementos['pala_jugador'].vel_x = -10;

					break;

				// Si pulsa la tecla flecha izquierda.
					case 39:

						contenedor_elementos['pala_jugador'].vel_x = 10;

					break;

				}

			} else if( contenedor_elementos['estados'].pausa ) {

				// Si pulsa alguna tecla...
				switch (keycode) {

				// Si pulsa la tecla enter.
					case 13:

						// Información en consola javascript del navegador.
						console.info("Estado: Juego.");

						contenedor_elementos['estados'].pausa = false;
						contenedor_elementos['estados'].juego = true;

					break;

				}

			}

			// El evento continúa normalmente.
			return true;
		});


		// Evento de tecla levantada.
		$(window).keyup(function (e) {

			// Información en consola javascript del navegador.
			console.info("Evento window.onkeyup (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");
			console.info(e);

			contenedor_elementos['pala_jugador'].vel_x = 0;

		});

		// Ejecuta el bucle principal.
		buclePrincipal();
	});

// Información en consola javascript del navegador.
console.info("Incluído html5-bola-rebota.main.js");

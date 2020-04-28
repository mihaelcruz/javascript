/*Mihael Cruz Salas*/
function iniciarJuego() {
	colorTitulo('.main-titulo');
	$('.btn-reinicio').click(function () {
		if ($(this).text() == 'Reiniciar') {
			location.reload(true);
		}
		tablero();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finalizar
		})
	});
}

function colorTitulo(titulo){
  $(titulo).animate({color: '#ffffff'}, 600, function()
  {
    $(titulo).animate({color: '#ffff00'}, 600, function()
    {
      colorTitulo('.main-titulo');
    });
  });
}

function tablero() {
	var aux = 6;
	var columna = $('[class^="col-"]');
	columna.each(function () {
		var dulces = $(this).children().length;
		var agrega = aux - dulces;
		for (var i = 0; i < agrega; i++) {
			var dulce = aleatorio(1, 5);
			if (i == 0 && dulces < 1) {
				$(this).append('<img src="image/' + dulce + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + dulce + '.png" class="element"></img>');
			}
		}
	});
	agregar();
	eliminar();
}

function aleatorio(min, max) {
	min = Math.floor(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function agregar() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: moverDulce
	});
	$('img').droppable({
		drop: reemplazarDulce
	});
	activarDulce();
}

function moverDulce(evento, dulceDrag) {
	dulceDrag.position.top = Math.min(100, dulceDrag.position.top);
	dulceDrag.position.bottom = Math.min(100, dulceDrag.position.bottom);
	dulceDrag.position.left = Math.min(100, dulceDrag.position.left);
	dulceDrag.position.right = Math.min(100, dulceDrag.position.right);
}

function reemplazarDulce(evento, dulceDrag) {
	var dulceDrag = $(dulceDrag.draggable);
	var dragSrc = dulceDrag.attr('src');
	var dulceDrop = $(this);
	var dropSrc = dulceDrop.attr('src');
	dulceDrag.attr('src', dropSrc);
	dulceDrop.attr('src', dragSrc);
	setTimeout(function () {
		tablero();
		if ($('img.delete').length == 0) {
			dulceDrag.attr('src', dragSrc);
			dulceDrop.attr('src', dropSrc);
		} else {
			movimientos();
		}
	}, 500);
}

function activarDulce() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function desactivarDulce() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function movimientos() {
	var valorActual = Number($('#movimientos-text').text());
	var resultado = valorActual += 1;
	$('#movimientos-text').text(resultado);
}

function eliminar() {
	validarColumna();
	validarFila();
	if ($('img.delete').length !== 0) {
		eliminarDulce();
	}
}

function validarColumna() {
	for (var j = 0; j < 7; j++) {
		var contador = 0;
		var dulcePosicion = [];
		var otroDulcePosicion = [];
		var dulceColumna = dulceColumnas(j);
		var comparacion = dulceColumna.eq(0);
		var ban = false;
		for (var i = 1; i < dulceColumna.length; i++) {
			var srcComparacion = comparacion.attr('src');
			var srcdulce = dulceColumna.eq(i).attr('src');

			if (srcComparacion != srcdulce) {
				if (dulcePosicion.length >= 3) {
					ban = true;
				} else {
					dulcePosicion = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!ban) {
						dulcePosicion.push(i - 1);
					} else {
						otroDulcePosicion.push(i - 1);
					}
				}
				if (!ban) {
					dulcePosicion.push(i);
				} else {
					otroDulcePosicion.push(i);
				}
				contador += 1;
			}
			comparacion = dulceColumna.eq(i);
		}
		if (otroDulcePosicion.length > 2) {
			dulcePosicion = $.merge(dulcePosicion, otroDulcePosicion);
		}
		if (dulcePosicion.length <= 2) {
			dulcePosicion = [];
		}
		dulceContador = dulcePosicion.length;
		if (dulceContador >= 3) {
			eliminarDulceColumnas(dulcePosicion, dulceColumna);
			puntuacion(dulceContador);
		}
	}
}

function dulceColumnas(index) {
	var dulceColumna = dulceArray('columnas');
	return dulceColumna[index];
}

function eliminarDulceColumnas(dulcePosicion, dulceColumna) {
	for (var i = 0; i < dulcePosicion.length; i++) {
		dulceColumna.eq(dulcePosicion[i]).addClass('delete');
	}
}

function puntuacion(dulceContador) {
	var score = Number($('#score-text').text());
	switch (dulceContador) {
		case 3:
			score += 10;
			break;
		case 4:
			score += 20;
			break;
		case 5:
			score += 40;
			break;
		case 6:
			score += 80;
			break;
		case 7:
			score += 150;
	}
	$('#score-text').text(score);
}

function validarFila() {
	for (var j = 0; j < 6; j++) {
		var contador = 0;
		var dulcePosicion = [];
		var otroDulcePosicion = [];
		var dulceFila = dulceFilas(j);
		var comparacion = dulceFila[0];
		var ban = false;
		for (var i = 1; i < dulceFila.length; i++) {
			var srcComparacion = comparacion.attr('src');
			var srcdulce = dulceFila[i].attr('src');

			if (srcComparacion != srcdulce) {
				if (dulcePosicion.length >= 3) {
					ban = true;
				} else {
					dulcePosicion = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!ban) {
						dulcePosicion.push(i - 1);
					} else {
						otroDulcePosicion.push(i - 1);
					}
				}
				if (!ban) {
					dulcePosicion.push(i);
				} else {
					otroDulcePosicion.push(i);
				}
				contador += 1;
			}
			comparacion = dulceFila[i];
		}
		if (otroDulcePosicion.length > 2) {
			dulcePosicion = $.merge(dulcePosicion, otroDulcePosicion);
		}
		if (dulcePosicion.length <= 2) {
			dulcePosicion = [];
		}
		dulceContador = dulcePosicion.length;
		if (dulceContador >= 3) {
			eliminarDulceHorizontal(dulcePosicion, dulceFila);
			puntuacion(dulceContador);
		}
	}
}

function eliminarDulceHorizontal(dulcePosicion, dulceFila) {
	for (var i = 0; i < dulcePosicion.length; i++) {
		dulceFila[dulcePosicion[i]].addClass('delete');
	}
}

function dulceFilas(index) {
	var dulceFila = dulceArray('rows', index);
	return dulceFila;
}

function dulceArray(array, index) {
	var dulceCol1 = $('.col-1').children();
	var dulceCol2 = $('.col-2').children();
	var dulceCol3 = $('.col-3').children();
	var dulceCol4 = $('.col-4').children();
	var dulceCol5 = $('.col-5').children();
	var dulceCol6 = $('.col-6').children();
	var dulceCol7 = $('.col-7').children();
	var dulceColumnas = $([dulceCol1, dulceCol2, dulceCol3, dulceCol4,
		dulceCol5, dulceCol6, dulceCol7
	]);
	if (typeof index == 'number') {
		var dulceFila = $([dulceCol1.eq(index), dulceCol2.eq(index), dulceCol3.eq(index),
			dulceCol4.eq(index), dulceCol5.eq(index), dulceCol6.eq(index),
			dulceCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (array == 'columnas') {
		return dulceColumnas;
	} else if (array == 'rows' && index !== '') {
		return dulceFila;
	}
}

function tabla(resultado) {
	if (resultado) {
		tablero();
	}
}

function eliminarDulce() {
	desactivarDulce();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminarDulces()
					.then(tabla)
					.catch(error);
			},
			queue: true
		});
}

function error(errores) {
	console.log(errores);
}

function eliminarDulces() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar dulce');
		}
	})
}

function finalizar() {
	$('.panel-tablero, .time').effect('fold');
	$('.main-titulo').addClass('title-over')
		.text('Fin del juego');
	$('.score, .moves, .panel-score').width('100%');
}

$(function() {
	iniciarJuego();
});

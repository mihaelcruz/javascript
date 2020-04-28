/*AUTOR: Mihael Cruz*/
var calculadora = {
	apuntes: document.getElementById("apuntes"),
	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	valorApuntes: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	control: false,

	init: (function(){
		this.boton(".tecla");
		this.botonEvento();
	}),

	boton: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmousedown = this.mousePresionado;
			x[i].onmouseup = this.mouseLiberado;
		};
	},

  mousePresionado: function(evento){
		calculadora.reduceBoton(event.target);
	},

  mouseLiberado: function(evento){
		calculadora.aumentaBoton(event.target);
	},

	reduceBoton: function(elemento){
		var x = elemento.id;
		elemento.style.padding = "1px";
	},

	aumentaBoton: function(elemento){
		var x = elemento.id;
    elemento.style.padding = "0px";
	},

	botonEvento: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.limpiarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresarOperacion("raiz");});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresarOperacion("+");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresarOperacion("-");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresarOperacion("*");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresarOperacion("/");});



	},

	ingresarNumero: function(valor){
		if (this.valorPantalla.length < 8) {
			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorApuntes = "";
				this.valorPantalla = this.valorPantalla + valor;
				this.valorApuntes = this.valorApuntes + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
				this.valorApuntes = this.valorApuntes + valor;
			}
		this.actualizarPantalla();
		}
	},

	actualizarPantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
		this.apuntes.innerHTML = this.valorApuntes;
	},

	limpiarPantalla: function(){
    this.valorPantalla = "0";
		this.valorApuntes = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.control = false;
		this.ultimoValor = 0;
		this.actualizarPantalla();
	},

	cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.valorApuntes = "";
		this.valorApuntes = aux;
		this.actualizarPantalla();
		}
	},

	ingresarDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
				this.valorApuntes = this.valorApuntes + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
				this.valorApuntes = this.valorApuntes + ".";
			}
			this.actualizarPantalla();
		}
	},

	ingresarOperacion: function(operador){
		this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = operador;
		this.control = false;
		this.valorApuntes = this.valorApuntes + this.operacion;
		this.actualizarPantalla();
	},

	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

	verResultado: function(){
		this.valorApuntes = this.valorApuntes + "=";
		if(!this.control){
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
		this.primerValor = this.resultado;
		this.valorPantalla = "";
		if (this.resultado.toString().length <= 8){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}
		this.valorApuntes = this.valorApuntes + this.resultado.toString();
		this.control = true;
		this.actualizarPantalla();
	}

};

calculadora.init();

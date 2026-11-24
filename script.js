const pantalla = document.getElementById("pantalla");
const historial = document.getElementById("historial");
let resultadoMostrado = false;

// Crear funciones
function agregarValor(valor) {
    const operadores = ["+", "-", "*", "/"];

    if (pantalla.value === "Error") {
        pantalla.value = "0";
    }

    if (resultadoMostrado && !operadores.includes(valor)) {
        pantalla.value = valor === "." ? "0." : valor;
        resultadoMostrado = false;
        return;
    }

    resultadoMostrado = false;

    if (pantalla.value === "0" && valor !== "." && !operadores.includes(valor)) {
        pantalla.value = valor === "00" ? "0" : valor;
        return;
    }

    const ultimoCaracter = pantalla.value.slice(-1);

    if (operadores.includes(ultimoCaracter) && operadores.includes(valor)) {
        pantalla.value = pantalla.value.slice(0, -1) + valor;
        return;
    }

    pantalla.value += valor;
}

// Función para pi
function insertarPi() {
    const pi = Math.PI.toFixed(6);

    if (pantalla.value === "0" || pantalla.value === "Error" || resultadoMostrado) {
        pantalla.value = pi;
    } else {
        pantalla.value += pi;
    }

    resultadoMostrado = false;
}

// Función limpiar pantalla
function limpiarPantalla() {
    pantalla.value = "0";
    historial.innerHTML = "&nbsp;";
    resultadoMostrado = false;
}

// Función borrar último
function borrarUltimo() {
    if (pantalla.value === "Error" || resultadoMostrado) {
        limpiarPantalla();
        return;
    }

    pantalla.value = pantalla.value.length > 1
        ? pantalla.value.slice(0, -1)
        : "0";
}

// Función calculadora científica
function calcularCientifica(operacion) {
    const valorActual = parseFloat(pantalla.value);

    if (isNaN(valorActual)) {
        pantalla.value = "Error";
        return;
    }

    const radianes = (valorActual * Math.PI) / 180;
    let resultado = 0;

    switch (operacion) {
        case "sin":
            historial.textContent = `sin(${valorActual}°)`;
            resultado = Math.sin(radianes);
            break;

        case "cos":
            historial.textContent = `cos(${valorActual}°)`;
            resultado = Math.cos(radianes);
            break;

        case "tan":
            historial.textContent = `tan(${valorActual}°)`;
            resultado = Math.tan(radianes);
            break;

        case "sqrt":
            if (valorActual < 0) {
                pantalla.value = "Error";
                return;
            }
            historial.textContent = `√(${valorActual})`;
            resultado = Math.sqrt(valorActual);
            break;

        case "pow2":
            historial.textContent = `(${valorActual}²)`;
            resultado = Math.pow(valorActual, 2);
            break;

        case "log":
            if (valorActual <= 0) {
                pantalla.value = "Error";
                return;
            }
            historial.textContent = `log(${valorActual})`;
            resultado = Math.log10(valorActual);
            break;

        case "porcentaje":
            historial.textContent = `${valorActual}%`;
            resultado = valorActual / 100;
            break;

        case "signo":
            resultado = valorActual * -1;
            break;
    }

    pantalla.value = Number(resultado.toFixed(8)).toString();
    resultadoMostrado = true;
}

// Función calcular resultado
function calcularResultado() {
    try {
        const expresion = pantalla.value;

        if (!/^[0-9+\-*/.() ]+$/.test(expresion)) {
            pantalla.value = "Error";
            return;
        }

        const resultado = Function('"use strict"; return (' + expresion + ')')();

        if (!isFinite(resultado) || isNaN(resultado)) {
            pantalla.value = "Error";
        } else {
            historial.textContent = `${expresion} =`;
            pantalla.value = Number(resultado.toFixed(8)).toString();
            resultadoMostrado = true;
        }

    } catch (error) {
        pantalla.value = "Error";
    }
}
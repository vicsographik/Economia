// year-indice.js

// SELECTOR DE AÑO PARA CONSULTAR PERÍODOS DE REGISTRO

const yearIndiceAnio = document.getElementById('yearIndiceAnio');
const yearIndiceAnterior = document.getElementById('yearIndiceAnterior');
const yearIndiceSiguiente = document.getElementById('yearIndiceSiguiente');

const ANIO_MAXIMO = new Date().getFullYear();
const ANIO_MINIMO = 2000;

if (yearIndiceAnio && yearIndiceAnterior && yearIndiceSiguiente) {
    let anioActual = parseInt(yearIndiceAnio.textContent, 10);

    function actualizarYearIndice() {
        yearIndiceAnio.textContent = anioActual;
        yearIndiceAnterior.disabled = anioActual <= ANIO_MINIMO;
        yearIndiceSiguiente.disabled = anioActual >= ANIO_MAXIMO;
    }

    yearIndiceAnterior.addEventListener('click', function () {
        if (anioActual > ANIO_MINIMO) {
            anioActual -= 1;
            actualizarYearIndice();
        }
    });

    yearIndiceSiguiente.addEventListener('click', function () {
        if (anioActual < ANIO_MAXIMO) {
            anioActual += 1;
            actualizarYearIndice();
        }
    });

    actualizarYearIndice();
}

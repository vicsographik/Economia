// tabla-etiquetas-responsivas.js

// COPIA EL TEXTO DE CADA <th> DEL ENCABEZADO COMO data-label EN LAS CELDAS
// DE SU MISMA COLUMNA, PARA QUE SE MUESTREN COMO ETIQUETA CUANDO LA TABLA
// CAMBIA A FORMATO DE TARJETA (VER @media max-width:1150px EN _tablas.css).
// ASÍ LA ETIQUETA SIEMPRE COINCIDE CON EL ENCABEZADO REAL, SIN DUPLICAR TEXTO.

document.querySelectorAll('.tabla02').forEach(function (tabla) {
    var encabezados = tabla.querySelectorAll('.tabla02__thead th');
    if (!encabezados.length) {
        return;
    }

    var textos = Array.prototype.map.call(encabezados, function (th) {
        return th.textContent.trim();
    });

    tabla.querySelectorAll('tbody tr').forEach(function (fila) {
        Array.prototype.forEach.call(fila.querySelectorAll('td.tabla02__tbodyTd'), function (celda) {
            var indice = Array.prototype.indexOf.call(fila.children, celda);
            if (textos[indice]) {
                celda.setAttribute('data-label', textos[indice]);
            }
        });
    });
});

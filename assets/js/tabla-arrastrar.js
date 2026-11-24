// tabla-arrastrar.js

// PERMITE RECORRER LAS TABLAS ANCHAS ARRASTRÁNDOLAS CON EL MOUSE (CURSOR GRAB/GRABBING)

document.querySelectorAll('.tabla__scrollX').forEach(function (contenedor) {
    let arrastrando = false;
    let inicioX = 0;
    let scrollInicial = 0;

    function iniciarArrastre(e) {
        arrastrando = true;
        contenedor.classList.add('tabla__scrollX--arrastrando');
        inicioX = e.pageX - contenedor.offsetLeft;
        scrollInicial = contenedor.scrollLeft;
    }

    function detenerArrastre() {
        arrastrando = false;
        contenedor.classList.remove('tabla__scrollX--arrastrando');
    }

    contenedor.addEventListener('mousedown', iniciarArrastre);
    contenedor.addEventListener('mouseleave', detenerArrastre);
    contenedor.addEventListener('mouseup', detenerArrastre);

    contenedor.addEventListener('mousemove', function (e) {
        if (!arrastrando) {
            return;
        }
        e.preventDefault();
        const x = e.pageX - contenedor.offsetLeft;
        const distancia = x - inicioX;
        contenedor.scrollLeft = scrollInicial - distancia;
    });
});

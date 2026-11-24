// pestana-scroll.js

// SCROLL HORIZONTAL Y FLECHAS PARA EL MENÚ DE PESTAÑAS EN PANTALLAS ESTRECHAS

document.querySelectorAll('.pestana__tabs').forEach(function (tabs) {
    const lista = tabs.querySelector('.pestana__lista');
    const flechaIzq = tabs.querySelector('.pestana__flecha--izq');
    const flechaDer = tabs.querySelector('.pestana__flecha--der');

    if (!lista || !flechaIzq || !flechaDer) {
        return;
    }

    const MARGEN = 2; // tolerancia en px para evitar parpadeo por redondeo

    function actualizarFlechas() {
        const hayOverflow = lista.scrollWidth > lista.clientWidth + MARGEN;
        const puedeIzquierda = lista.scrollLeft > MARGEN;
        const puedeDerecha = lista.scrollLeft < (lista.scrollWidth - lista.clientWidth - MARGEN);

        flechaIzq.classList.toggle('is-visible', hayOverflow && puedeIzquierda);
        flechaDer.classList.toggle('is-visible', hayOverflow && puedeDerecha);
    }

    function desplazar(direccion) {
        const distancia = lista.clientWidth * 0.8 * direccion;
        lista.scrollBy({ left: distancia, behavior: 'smooth' });
    }

    flechaIzq.addEventListener('click', function () { desplazar(-1); });
    flechaDer.addEventListener('click', function () { desplazar(1); });

    lista.addEventListener('scroll', actualizarFlechas);
    window.addEventListener('resize', actualizarFlechas);

    actualizarFlechas();
});

// filtros.js

// Variables globales para los filtros
let filtroNombre = '';
let filtroFechaInicio = null;
let filtroFechaFin = null;

// Función principal de filtrado
function aplicarFiltros() {
    console.log('🔍 Aplicando filtros...', {
        nombre: filtroNombre,
        fechaInicio: filtroFechaInicio,
        fechaFin: filtroFechaFin
    });
    
    // Verificar que el calendario existe
    if (!globalThis.calendar) {
        console.error('❌ El calendario no está inicializado');
        return;
    }
    
    // Remover todos los eventos actuales del calendario
    globalThis.calendar.removeAllEvents();

    // Filtrar los eventos de la lista original
    const eventosFiltrados = listaEventos.filter(evento => validarEvento(evento));
    
    console.log(`✅ Eventos filtrados: ${eventosFiltrados.length} de ${listaEventos.length}`);
    
    // Agregar solo los eventos filtrados al calendario
    for (const evento of eventosFiltrados) {
        globalThis.calendar.addEvent(evento);
    }
    
    // NUEVO: Navegar al mes del primer evento filtrado
    if (eventosFiltrados.length > 0) {
        const primerEvento = eventosFiltrados[0];
        const fechaPrimerEvento = new Date(primerEvento.start);
        globalThis.calendar.gotoDate(fechaPrimerEvento);
        console.log('📅 Navegando a:', fechaPrimerEvento);
    }
    
    // Actualizar contador
    actualizarContador(eventosFiltrados.length, listaEventos.length);
}

// Validar si un evento cumple con todos los filtros activos
function validarEvento(evento) {
    let cumpleFiltroNombre = true;
    let cumpleFiltroFecha = true;
    
    // Validar filtro de nombre
    if (filtroNombre.trim() !== '') {
        const titulo = evento.title.toLowerCase();
        const descripcion = (evento.description || '').toLowerCase();
        const busqueda = filtroNombre.toLowerCase();
        
        cumpleFiltroNombre = titulo.includes(busqueda) || descripcion.includes(busqueda);
    }
    
    // Validar filtro de rango de fechas
    if (filtroFechaInicio && filtroFechaFin) {
        // Obtener solo las fechas (año-mes-día) sin las horas
        const inicioEventoStr = evento.start.split('T')[0];
        const finEventoStr = evento.end ? evento.end.split('T')[0] : inicioEventoStr;
        
        // Convertir a objetos Date normalizados
        const inicioEvento = new Date(inicioEventoStr + 'T00:00:00');
        const finEvento = new Date(finEventoStr + 'T00:00:00');
        const inicioFiltro = new Date(filtroFechaInicio + 'T00:00:00');
        const finFiltro = new Date(filtroFechaFin + 'T00:00:00');
        
        // NUEVA LÓGICA: El evento se muestra si su fecha de INICIO está dentro del rango
        // Esto evita mostrar eventos que comenzaron antes pero terminan después del rango
        cumpleFiltroFecha = (inicioEvento >= inicioFiltro && inicioEvento <= finFiltro);
        
        console.log('🔍 Validando evento:', {
            titulo: evento.title,
            inicioEvento: inicioEventoStr,
            finEvento: finEventoStr,
            inicioFiltro: filtroFechaInicio,
            finFiltro: filtroFechaFin,
            cumple: cumpleFiltroFecha
        });
    }
    
    return cumpleFiltroNombre && cumpleFiltroFecha;
}

// Limpiar todos los filtros
function limpiarFiltros() {
    console.log('🧹 Limpiando filtros...');
    
    // Resetear variables
    filtroNombre = '';
    filtroFechaInicio = null;
    filtroFechaFin = null;
    
    // Resetear inputs
    const inputBuscar = document.getElementById('buscarEvento');
    if (inputBuscar) {
        inputBuscar.value = '';
    }
    
    if (globalThis.flatpickrFiltroInicio) {
        globalThis.flatpickrFiltroInicio.clear();
    }
    if (globalThis.flatpickrFiltroFin) {
        globalThis.flatpickrFiltroFin.clear();
    }
    
    // Recargar todos los eventos
    if (globalThis.calendar) {
        globalThis.calendar.removeAllEvents();
        for (const evento of listaEventos) {
            globalThis.calendar.addEvent(evento);
        }
        
        // NUEVO: Volver a la fecha actual cuando se limpian los filtros
        globalThis.calendar.today();
        console.log('📅 Volviendo a la fecha actual');
    }
    
    // Actualizar contador
    actualizarContador(listaEventos.length, listaEventos.length);
    
    console.log('✅ Filtros limpiados');
}

// Actualizar contador de eventos visibles
function actualizarContador(visibles, total) {
    const contadorEl = document.getElementById('contadorEventos');
    if (contadorEl) {
        contadorEl.textContent = `Mostrando ${visibles} de ${total} eventos`;
        
        // Cambiar color si hay filtros activos
        if (visibles < total) {
            contadorEl.style.color = '#537c99';
            contadorEl.style.fontWeight = 'bold';
        } else {
            contadorEl.style.color = '#666';
            contadorEl.style.fontWeight = 'normal';
        }
    }
}

// Inicializar filtros cuando el DOM y el calendario estén listos
function inicializarFiltros() {
    console.log('🚀 Inicializando sistema de filtros...');
    
    // Filtro por nombre (búsqueda en tiempo real)
    const inputBuscar = document.getElementById('buscarEvento');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', function(e) {
            filtroNombre = e.target.value;
            // Aplicar filtro automáticamente al escribir
            aplicarFiltros();
        });
        console.log('✅ Filtro de búsqueda inicializado (búsqueda en tiempo real)');
    }
    
    // Inicializar Flatpickr para filtros de fecha
    globalThis.flatpickrFiltroInicio = flatpickr("#filtroFechaInicio", {
        locale: "es",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F, Y",
        theme: "material_blue",
        onChange: function(selectedDates, dateStr) {
            filtroFechaInicio = dateStr || null;
            
            // Actualizar fecha mínima del filtro de fin
            if (globalThis.flatpickrFiltroFin && dateStr) {
                globalThis.flatpickrFiltroFin.set('minDate', dateStr);
            }
            
            console.log('📅 Fecha inicio seleccionada:', dateStr);
        }
    });
    console.log('✅ Filtro de fecha inicio inicializado');

    globalThis.flatpickrFiltroFin = flatpickr("#filtroFechaFin", {
        locale: "es",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F, Y",
        theme: "material_blue",
        onChange: function(selectedDates, dateStr) {
            filtroFechaFin = dateStr || null;
            console.log('📅 Fecha fin seleccionada:', dateStr);
        }
    });
    console.log('✅ Filtro de fecha fin inicializado');
    
    // Botón aplicar filtros
    const btnAplicar = document.getElementById('btnAplicarFiltros');
    if (btnAplicar) {
        btnAplicar.addEventListener('click', function() {
            console.log('🔍 Botón "Buscar" presionado');
            aplicarFiltros();
        });
        console.log('✅ Botón aplicar filtros inicializado');
    }
    
    // Botón limpiar filtros
    const btnLimpiar = document.getElementById('btnLimpiarFiltros');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarFiltros);
        console.log('✅ Botón limpiar inicializado');
    }
    
    // Inicializar contador
    actualizarContador(listaEventos.length, listaEventos.length);
    
    console.log('🎉 Sistema de filtros completamente inicializado');
}

// Esperar a que el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Dar tiempo a que el calendario se inicialice
        setTimeout(inicializarFiltros, 100);
    });
} else {
    // El DOM ya está listo
    setTimeout(inicializarFiltros, 100);
}
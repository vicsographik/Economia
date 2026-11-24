// calendar.js
let calendarEl = document.getElementById('calendar');

// Variable global para manejar el tooltip actual
let currentTooltip = null;
let hideTimeout = null;

// Hacer la variable calendar GLOBAL para que sea accesible desde otros archivos
globalThis.calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'es',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth'
    },
    events: listaEventos,
    height: 'auto',
    displayEventTime: false,
    displayEventEnd: false,
    eventDisplay: 'block',
    
    // Función para mostrar tooltip al pasar el mouse
    eventDidMount: function(info) {
        
        // Agregar eventos de mouse
        info.el.addEventListener('mouseenter', function() {
            // Limpiar cualquier timeout pendiente
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            
            // Eliminar tooltip anterior si existe
            currentTooltip?.remove();
            
            // Crear el elemento tooltip
            let tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            currentTooltip = tooltip;
            
            // Formatear las fechas
            let inicio = new Date(info.event.start);
            let fin = info.event.end ? new Date(info.event.end) : inicio;
            
            let fechaInicio = inicio.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            let fechaFin = fin.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Crear el contenido del tooltip con HTML real
            tooltip.innerHTML = `
                <strong>${info.event.title}</strong><br>
                <em>${info.event.extendedProps.description || 'Sin descripción'}</em><br>
                <strong>Inicio:</strong> ${fechaInicio}<br>
                <strong>Fin:</strong> ${fechaFin}
            `;
            
            document.body.appendChild(tooltip);
            
            let rect = info.el.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            // Agregar la clase 'show' después de un pequeño delay
            setTimeout(() => {
                tooltip?.classList.add('show');
            }, 10);
        });
        
        info.el.addEventListener('mouseleave', function() {
            if (currentTooltip) {
                // Quitar la clase 'show' para la animación de salida
                currentTooltip.classList.remove('show');
                
                // Esperar a que termine la transición antes de eliminar
                hideTimeout = setTimeout(() => {
                    currentTooltip?.remove();
                    currentTooltip = null;
                }, 300);
            }
        });
    }
});

globalThis.calendar.render();
console.log('✅ Calendario renderizado y accesible globalmente');

// Para compatibilidad con modal.js (mantener referencia sin window)
let calendar = globalThis.calendar;
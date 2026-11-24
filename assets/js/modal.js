// modal.js

// LÓGICA DEL MODAL PARA AGREGAR EVENTOS

const modal = document.getElementById('modalEvento');
const btnAgregar = document.getElementById('btnAgregarEvento');
const btnCancelar = document.getElementById('btnCancelar');
const spanClose = document.querySelector('.close');
const formEvento = document.getElementById('formEvento');

// Array de colores predefinidos para selección aleatoria
const coloresPredefinidos = [
    '#64bf5cff', // Verde
    '#428ba2ff', // Azul
    '#b368a6ff', // Morado
    '#80311fff', // Rojo
    '#FF5733',   // Naranja
    '#FF9800',   // Amarillo
    '#9C27B0',   // Rosa
    '#4CAF50',   // Verde claro
    '#00BCD4',   // Turquesa
    '#FFC107',   // Amarillo dorado
    '#E91E63',   // Rosa fuerte
    '#3F51B5',   // Azul índigo
    '#009688',   // Verde azulado
    '#FF6F00'    // Naranja oscuro
];

// Función para obtener un color aleatorio
function obtenerColorAleatorio() {
    return coloresPredefinidos[Math.floor(Math.random() * coloresPredefinidos.length)];
}

// Función para crear los botones personalizados
function createButtons(flatpickrInstance) {
    const calendar = flatpickrInstance.calendarContainer;
    
    // Crear contenedor de botones si no existe
    let buttonContainer = calendar.querySelector('.flatpickr-buttons');
    if (!buttonContainer) {
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'flatpickr-buttons';
        
        // Botón Limpiar
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'flatpickr-clear-btn';
        clearBtn.textContent = 'LIMPIAR';
        clearBtn.addEventListener('click', () => {
            flatpickrInstance.clear();
        });
        
        // Botón Cancelar
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'flatpickr-cancel-btn';
        cancelBtn.textContent = 'CANCELAR';
        cancelBtn.addEventListener('click', () => {
            flatpickrInstance.close();
        });
        
        // Botón OK
        const okBtn = document.createElement('button');
        okBtn.type = 'button';
        okBtn.className = 'flatpickr-ok-btn';
        okBtn.textContent = 'OK';
        okBtn.addEventListener('click', () => {
            flatpickrInstance.close();
        });
        
        buttonContainer.appendChild(clearBtn);
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(okBtn);
        
        calendar.appendChild(buttonContainer);
    }
}

// Inicializar Flatpickr en los inputs de fecha
const flatpickrInicio = flatpickr("#fechaInicio", {
    locale: "es",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j F, Y",
    theme: "material_blue",
    closeOnSelect: false, // ⭐ IMPORTANTE: No cerrar al seleccionar fecha
    onReady: function(selectedDates, dateStr, instance) {
        createButtons(instance);
    },
    onChange: function(selectedDates, dateStr) {
        // Actualizar la fecha mínima del selector de fecha fin
        flatpickrFin.set('minDate', dateStr);
    }
});

const flatpickrFin = flatpickr("#fechaFin", {
    locale: "es",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j F, Y",
    theme: "material_blue",
    closeOnSelect: false, // ⭐ IMPORTANTE: No cerrar al seleccionar fecha
    onReady: function(selectedDates, dateStr, instance) {
        createButtons(instance);
    }
});

// Abrir modal
btnAgregar.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Cerrar modal
spanClose.addEventListener('click', function() {
    modal.style.display = 'none';
    formEvento.reset();
    flatpickrInicio.clear();
    flatpickrFin.clear();
});

btnCancelar.addEventListener('click', function() {
    modal.style.display = 'none';
    formEvento.reset();
    flatpickrInicio.clear();
    flatpickrFin.clear();
});

// Cerrar modal si se hace clic fuera de él
globalThis.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        formEvento.reset();
        flatpickrInicio.clear();
        flatpickrFin.clear();
    }
});

// Manejar el envío del formulario
formEvento.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    
    // Validar que se hayan seleccionado fechas
    if (!fechaInicio || !fechaFin) {
        alert('Por favor selecciona ambas fechas');
        return;
    }
    
    // Asignar un color aleatorio automáticamente
    const color = obtenerColorAleatorio();
    
    // Crear nuevo evento
    const nuevoEvento = {
        title: titulo,
        start: fechaInicio,
        end: fechaFin,
        description: descripcion,
        backgroundColor: color,
        borderColor: color,
        allDay: true
    };
    
    // Agregar evento a la lista y al calendario
    listaEventos.push(nuevoEvento);
    calendar.addEvent(nuevoEvento);
    
    // Cerrar modal y resetear formulario
    modal.style.display = 'none';
    formEvento.reset();
    flatpickrInicio.clear();
    flatpickrFin.clear();
    
    console.log('Evento agregado:', nuevoEvento);
});
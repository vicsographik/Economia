// foto-usuario.js

// VISTA PREVIA DEL COMPONENTE PARA SUBIR FOTOGRAFÍA DE USUARIO

const fotoUsuarioInput = document.getElementById('fotoUsuarioInput');
const fotoUsuarioImg = document.getElementById('fotoUsuarioImg');
const fotoUsuarioPlaceholder = document.getElementById('fotoUsuarioPlaceholder');
const fotoUsuarioError = document.getElementById('fotoUsuarioError');

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png'];
const PESO_MAXIMO = 2 * 1024 * 1024; // 2 MB

if (fotoUsuarioInput) {
    fotoUsuarioInput.addEventListener('change', function (e) {
        const archivo = e.target.files[0];

        if (!archivo) {
            return;
        }

        const esTipoValido = TIPOS_PERMITIDOS.includes(archivo.type);
        const esPesoValido = archivo.size <= PESO_MAXIMO;

        if (!esTipoValido || !esPesoValido) {
            fotoUsuarioError.classList.remove('d-none');
            fotoUsuarioInput.value = '';
            return;
        }

        fotoUsuarioError.classList.add('d-none');

        const lector = new FileReader();
        lector.onload = function (evento) {
            fotoUsuarioImg.src = evento.target.result;
            fotoUsuarioImg.classList.remove('d-none');
            fotoUsuarioPlaceholder.classList.add('d-none');
        };
        lector.readAsDataURL(archivo);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mensaje = params.get('msg');

    if (mensaje) {
        let titulo = '';
        let icono = 'success';

        if (mensaje === 'agregado') titulo = 'Contacto agregado correctamente';
        else if (mensaje === 'editado') titulo = 'Contacto actualizado correctamente';
        else if (mensaje === 'eliminado') {
            titulo = 'Contacto eliminado';
            icono = 'info';
        }

        Swal.fire({
            icon: icono,
            title: titulo,
            showConfirmButton: false,
            timer: 1800
        });

        // Redirige al index sin parámetros después de 2 segundos
        setTimeout(() => {
            window.location.href = '/';
        }, 1800);
    }
});

function confirmarEliminacion(nombre) {
    return Swal.fire({
        title: `¿Eliminar a ${nombre}?`,
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        return result.isConfirmed;
    });
}
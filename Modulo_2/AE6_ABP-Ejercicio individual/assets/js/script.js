$(document).ready(function () {
    const imagenes = $('.imagen-pequena');
    const modal = new bootstrap.Modal(document.getElementById('miModal'));
    const modalImg = $('#imagenGrande');
    const numeroActual = $('#numeroActual');
    const totalImagenes = $('#totalImagenes');
    let indiceActual = -1;

    totalImagenes.text(imagenes.length);

    imagenes.on('click', function () {
        indiceActual = imagenes.index(this);
        mostrarImagen(indiceActual);
        modal.show();
    });

    $('#siguiente').on('click', function () {
        if (indiceActual < imagenes.length - 1) {
            indiceActual++;
            transicionImagen(indiceActual);
        }
    });

    $('#anterior').on('click', function () {
        if (indiceActual > 0) {
            indiceActual--;
            transicionImagen(indiceActual);
        }
    });

    // Cambio con fadeOut + fadeIn suave
    function transicionImagen(indice) {
        modalImg.fadeOut(200, function () {
            mostrarImagen(indice);
        });
    }

    function mostrarImagen(indice) {
        const ruta = $(imagenes[indice]).data('grande');
        modalImg.attr('src', ruta).fadeIn(300);
        numeroActual.text(indice + 1);
    }

    // Efecto al abrir el modal (opcional)
    $('#miModal').on('shown.bs.modal', function () {
        modalImg.hide().fadeIn(300);
    });
});
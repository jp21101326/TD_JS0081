
    // Seleccionamos todos los botones de Like
    const botones = document.querySelectorAll('.like-btn');

    botones.forEach(boton => {
      boton.onclick = () => {
        // Buscar el contador (span) dentro del mismo contenedor
        const contador = boton.parentElement.querySelector('.likes');
        let numero = parseInt(contador.textContent);
        numero++;
        contador.textContent = numero + " like(s)";
      };
    });

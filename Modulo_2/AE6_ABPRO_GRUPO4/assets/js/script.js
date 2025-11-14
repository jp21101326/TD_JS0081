
        // Variables globales
        let peliculaActual = '';
        let precioAsiento = 8000; // Precio en pesos chilenos
        
        const peliculas = [
            { titulo: "Duna Parte 2", imagen: "dune2.jpg" },
            { titulo: "Oppenheimer", imagen: "oppenheimer.jpg" },
            { titulo: "Barbie", imagen: "barbie2.jpg" },
            { titulo: "Moana 1", imagen: "moana1.jpg" },
            { titulo: "Moana 2", imagen: "moana2.jpg" },
            { titulo: "Lilo & Stitch", imagen: "lilostitch.jpg" },
            { titulo: "Malefica", imagen: "malefica.jpg" },
            { titulo: "Avatar", imagen: "avatar.jpg" },
            { titulo: "Soy Leyenda", imagen: "soyleyenda.jpg" },
            { titulo: "Wolverine 3D", imagen: "wolverine.jpg" }
        ];


        document.addEventListener("DOMContentLoaded", () => {
          const container = document.getElementById("peliculasContainer");

          peliculas.forEach(pelicula => {
            const col = document.createElement("div");
            col.className = "col";
            col.innerHTML = `
              <div class="card movie-card h-100">
                <div class="movie-poster" style="background-image: url('./assets/img/${pelicula.imagen}');"></div>
                <div class="card-body text-center">
                  <h5 class="card-title">${pelicula.titulo}</h5>
                  <button class="btn btn-primary" onclick="abrirModalReserva('${pelicula.titulo}')">
                    <i class="bi bi-ticket me-1"></i> Reservar
                  </button>
                </div>
              </div>
            `;
            container.appendChild(col);
          });
        });

        // Abrir modal de reserva
        function abrirModalReserva(pelicula) {
            peliculaActual = pelicula;
            $('#peliculaSeleccionada').text(pelicula);
            $('#modalReserva').modal('show');
        }
       
        // Confirmar reserva
        function confirmarReserva() {
            const horario = $('#horarioSelect').val();
            const numeroTarjeta = $('#numeroTarjeta').val();
            const nombreTitular = $('#nombreTitular').val();
            const cantidadAsientos = $('#cantidadAsientos').val();
            const cvv = $('#cvv').val();
            
            if (!horario) {
                alert('Por favor selecciona un horario');
                return;
            }
            
            if (!cantidadAsientos) {
                alert('Por favor ingrese cantidad de asientos,  al menos uno');
                return;
            }
            
            if (!numeroTarjeta) {
                alert('Por favor ingresa el número de tarjeta');
                return;
            }

            if (!nombreTitular) {
                alert('Por favor ingresa el nombre del titular');
                return;
            }
            
            if (!cvv || cvv.length !== 3) {
                alert('Por favor ingresa un CVV válido');
                return;
            }
            
            mostrarConfirmacion();
        }
        
        // Mostrar confirmación
        function mostrarConfirmacion() {
            const cantidadAsientos = $('#cantidadAsientos').val();
            const total = cantidadAsientos * precioAsiento;
            const ticketReserva = `
                <div class="text-start">
                    <h6>Ticket CineFlash</h6>
                    <hr>
                    <div><strong>Película:</strong> ${peliculaActual}</div>
                    <div><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</div>
                    <div><strong>Horario:</strong> ${$('#horarioSelect').val()}</div>
                    <div><strong>Asientos:</strong> ${cantidadAsientos}</div>
                    <div><strong>Sala:</strong> 1</div>
                    <hr>
                    <div><strong>Total Pagado:</strong> $${total.toLocaleString()}</div>
                    <small class="text-muted">Código de reserva: CF${Date.now()}</small>
                </div>
            `;
            
            $('#ticketDetails').html(ticketReserva);
            $('#modalReserva').modal('hide');
            $('#modalConfirmacion').modal('show');
        }
        
      document.getElementById('numeroTarjeta').addEventListener('input', function () {
          this.value = this.value.replace(/\D/g, ''); // elimina todo lo que no sea dígito
      });

      document.getElementById('cvv').addEventListener('input', function () {
          this.value = this.value.replace(/\D/g, ''); // elimina todo lo que no sea dígito
      });
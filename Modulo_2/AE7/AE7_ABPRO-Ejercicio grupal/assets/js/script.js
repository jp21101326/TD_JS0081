        
        // Formatear número de tarjeta
        document.getElementById('numeroTarjeta').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Formatear fecha de expiración
        document.getElementById('fechaExpiracion').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        document.getElementById('telefono').addEventListener('input', function (e) {
        // Reemplaza todo lo que no sea dígito
        e.target.value = e.target.value.replace(/\D/g, '');
        });


        // Actualizar total cuando se selecciona un servicio
        document.getElementById('tipoReparacion').addEventListener('change', function(e) {
            const precios = {
                'cambio-aceite': 500,
                'revision-frenos': 700,
                'diagnostico-electrico': 600
            };
            
            const servicioSeleccionado = e.target.value;
            const precio = precios[servicioSeleccionado] || 0;
            document.getElementById('totalPago').textContent = `$${precio} MXN`;
        });

        // Manejar envío del formulario de reparación
        document.getElementById('btnConfirmarReserva').addEventListener('click', function () {
            const nombre = document.getElementById('nombreCliente').value;
            const servicio = document.getElementById('tipoReparacion').value;
            const fecha = document.getElementById('fechaCita').value;
            const telefono = document.getElementById('telefono').value;

            if (!nombre) {
                Swal.fire({ title: "Atención", text: "Favor ingrese su nombre!", icon: "warning" });
                return;
            }

            if (!servicio) {
                Swal.fire({ title: "Atención", text: "Favor seleccionar un servicio!", icon: "warning" });
                return;
            }

            if (!fecha) {
                Swal.fire({ title: "Atención", text: "Favor seleccionar una fecha agendada!", icon: "warning" });
                return;
            }

            if (!telefono) {
                Swal.fire({ title: "Atención", text: "Favor ingresar su número de teléfono!", icon: "warning" });
                return;
            }

           if (nombre && servicio && fecha) {
                alert(`¡Solicitud confirmada!\n\nCliente: ${nombre}\nServicio: ${servicio}\nFecha: ${new Date(fecha).toLocaleString()}\n\nNos pondremos en contacto contigo pronto.`);
                document.getElementById('pago').scrollIntoView({ behavior: 'smooth' });
            }

        });


        // Manejar envío del formulario de pago
        document.getElementById('FormularioPago').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const numeroTarjeta = document.getElementById('numeroTarjeta').value;
            const nombreTitular = document.getElementById('nombreTitular').value;
            const servicio = document.getElementById('tipoReparacion').value;
            const fecha = document.getElementById('fechaCita').value;
            
            const select = document.getElementById("tipoReparacion");
            const textoSeleccionado = select.options[select.selectedIndex].text;
            const numero = textoSeleccionado.match(/\$?(\d+)/);
            const total = numero ? parseInt(numero[1], 10) : 0;

            if (numeroTarjeta && nombreTitular) {
                //alert(`¡Pago procesado exitosamente!\n\nMonto: ${total}\nTarjeta: ${numeroTarjeta}\n\nRecibirás una confirmación por email.`);
                
                const Reserva = `
                    <div class="text-start">
                        <h6>Ticket Reserva</h6>
                        <hr>
                        <div><strong>Titular:</strong> ${nombreTitular}</div>
                        <div><strong>Tarjeta:</strong> ${numeroTarjeta}</div>
                        <div><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</div>
                        <div><strong>Servicio:</strong> ${servicio}</div>
                        <div><strong>Fecha Agendada:</strong> ${fecha}</div>
                        <hr>
                        <div><strong>Total Pagado:</strong> $${total.toLocaleString()}</div>
                        <small class="text-muted">Código de reserva: CF${Date.now()}</small>
                    </div>
                `;
            
                $('#ticketDetails').html(Reserva);
                $('#modalReserva').modal('hide');
                $('#modalConfirmacion').modal('show');
                // Limpiar formularios
                document.getElementById('FormularioReparacion').reset();
                document.getElementById('FormularioPago').reset();
                document.getElementById('totalPago').textContent = '$0 MXN';
            }
        });

        // Establecer fecha mínima para la cita (hoy)
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const minDate = tomorrow.toISOString().slice(0, 16);
        document.getElementById('fechaCita').min = minDate;

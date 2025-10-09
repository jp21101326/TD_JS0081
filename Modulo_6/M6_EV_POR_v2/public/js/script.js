document.addEventListener('DOMContentLoaded', function() {
  
  const modal = document.getElementById('modalEditar');
  const closeBtn = document.querySelector('.modal-close');
  const cancelBtn = document.querySelector('.btn-cancelar');
  const formEditar = document.getElementById('formEditar');

  const MODAL_DISPLAY_TYPE = 'flex'; 

    function mostrarAlerta(icon, title, text) {
    let confirmButtonColor;
    switch (icon) {
        case 'success':
            confirmButtonColor = '#10b981'; // var(--success-color)
            break;
        case 'error':
            confirmButtonColor = '#ef4444'; // var(--danger-color)
            break;
        case 'warning':
            confirmButtonColor = '#f59e0b'; // var(--warning-color)
            break;
        case 'info':
            confirmButtonColor = '#06b6d4'; // var(--info-color)
            break;
        default:
            confirmButtonColor = '#2563eb'; // var(--primary-color)
    }

    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: confirmButtonColor,
      customClass: {
        popup: 'swal2-responsive' 
      }
    });
  }

  function abrirModal(id) {
    fetch('/api/productos')
      .then(res => {
        if (!res.ok) throw new Error('Respuesta de red no OK');
        return res.json();
      })
      .then(data => {
        const producto = data.data.find(p => p.id == id);
        
        if (producto) {
          document.getElementById('editNombre').value = producto.nombre;
          document.getElementById('editDescripcion').value = producto.descripcion;
          document.getElementById('editPrecio').value = producto.precio.toFixed(2); 
          
          formEditar.action = '/productos/editar/' + id;
          
          modal.style.display = MODAL_DISPLAY_TYPE;
        } else {
          mostrarAlerta('error', 'Error', `Producto con ID: ${id} no encontrado.`);
        }
      })
      .catch(error => {
        console.error('Error al cargar producto:', error);
        mostrarAlerta('error', 'Error de Carga', 'No se pudieron cargar los datos del producto para editar.');
      });
  }
  
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('data-id');
      abrirModal(id);
    });
  });
  
  const cerrarModal = () => {
      modal.style.display = 'none';
  };
  
  if (closeBtn) closeBtn.onclick = cerrarModal;
  if (cancelBtn) cancelBtn.onclick = cerrarModal;
  
  window.onclick = function(event) {
    if (event.target === modal) {
      cerrarModal();
    }
  };

  
  formEditar.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const url = formEditar.action;
    const formData = new FormData(formEditar);
    
    const data = Object.fromEntries(formData.entries());
    data.precio = parseFloat(data.precio);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
    })
    .then(res => {
        return res.json().then(json => {
            if (!res.ok) {
                throw new Error(json.message || 'Error desconocido del servidor');
            }
            return json;
        });
    })
    .then(result => {
      cerrarModal(); 
      mostrarAlerta('success', '¡Éxito!', result.message || 'Producto actualizado correctamente.');
      
      setTimeout(() => {
        window.location.reload(); 
      }, 1500); 
    })
    .catch(error => {
      cerrarModal();
      mostrarAlerta('error', 'Error al Actualizar', error.message);
      console.error('Error en fetch (edición):', error);
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('data-id');
      const nombre = this.getAttribute('data-nombre');

      Swal.fire({
        title: `¿Estás seguro de eliminar "${nombre}"?`,
        text: "Esta acción no se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', 
        cancelButtonColor: '#64748b', 
        confirmButtonText: 'Sí, ¡eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/productos/eliminar/${id}`, {
            method: 'POST'
          })
          .then(res => {
            return res.json().then(json => {
                if (!res.ok) {
                    throw new Error(json.message || 'Error desconocido del servidor');
                }
                return json;
            });
          })
          .then(result => {
            mostrarAlerta('success', '¡Eliminado!', result.message || 'El producto fue eliminado.');
            setTimeout(() => {
              window.location.reload(); 
            }, 2500); 
          })
          .catch(error => {
            mostrarAlerta('error', 'Error al Eliminar', error.message || 'Error de conexión.');
            console.error('Error en fetch (eliminar):', error);
          });
        }
      });
    });
  });
});
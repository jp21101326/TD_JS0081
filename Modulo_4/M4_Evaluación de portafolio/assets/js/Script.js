        // Clase Producto - Programación Orientada a Objetos
        class Producto {
            constructor(id, titulo, precio, categoria, descripcion, imagen) {
                this.id = id;
                this.nombre = titulo;
                this.precio = precio;
                this.categoria = categoria;
                this.descripcion = descripcion;
                this.imagen = imagen;
            }
            // Método para mostrar información del producto
            mostrarInfo() {
                return `${this.nombre} - $${this.precio} (${this.categoria})`;
            }
            // Método para crear el HTML del producto usando template literals
            crearHTML() {
                return `
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card product-card h-100">
                            <img src="${this.imagen}" class="card-img-top product-image" alt="${this.nombre}" style="cursor:pointer"  onclick="mostrarDetalle(${this.id})">
                            <div class="card-body d-flex flex-column text-justify">
                                <div class="mb-2 text-justify">
                                    <span class="badge bg-secondary category-badge"> ${this.categoria}</span>
                                </div>
                                <h5 class="card-title text-justify">${this.nombre}</h5>
                                <!-- <p class="card-text flex-grow-1 text-justify">${this.descripcion}</p> -->
                                <div class="mt-auto">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="price-tag">$${this.precio}</span>
                                        <button class="btn btn-primary" onclick="agregarAlCarrito(${this.id})">
                                            <i class="fas fa-cart-plus me-2"></i>Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Clase para manejar el carro de compras
        class CarritoCompras {
            constructor() {
                this.items = [];
            }

            agregarProducto(producto) {
                const itemExistente = this.items.find(item => item.producto.id === producto.id);
                if (itemExistente) {
                    itemExistente.cantidad++;
                } else {
                    this.items.push({ producto, cantidad: 1 });
                }
                this.actualizarInterfaz();
                this.mostrarNotificacion(`${producto.nombre} añadido al carro de compras`);
            }

            eliminarProducto(productoId) {
                this.items = this.items.filter(item => item.producto.id !== productoId);
                this.actualizarInterfaz();
            }

            cambiarCantidad(productoId, delta) {
                const item = this.items.find(i => i.producto.id === productoId);
                if (!item) return;
                // Evita que baje de 1
                if (item.cantidad === 1 && delta === -1) {
                    return;
                }

                item.cantidad += delta;
                this.actualizarInterfaz();
            }

            cambiarCantidadDirecto(productoId, valor) {
                const item = this.items.find(i => i.producto.id === productoId);
                if (!item) return;
                let cantidad = parseInt(valor);
                if (isNaN(cantidad) || cantidad <= 0) {
                    this.eliminarProducto(productoId);
                } else {
                    item.cantidad = cantidad;
                    this.actualizarInterfaz();
                }
            }

            calcularTotal() {
                return this.items.reduce((total, item) =>
                    total + (item.producto.precio * item.cantidad), 0).toFixed(2);
            }

            actualizarInterfaz() {
                document.getElementById('cartBadge').textContent = this.items.reduce((t, i) => t + i.cantidad, 0);
                this.actualizarModalCarrito();
            }

            actualizarModalCarrito() {
                const cartItems = document.getElementById('cartItems');
                const cartTotal = document.getElementById('cartTotal');

                if (this.items.length === 0) {
                    cartItems.innerHTML = `
                        <div class="text-center py-5">
                            <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                            <p class="text-muted h5">Tu carrito está vacío</p>
                            <p class="text-muted">¡Agrega algunos productos increíbles!</p>
                        </div>
                    `;
                    cartTotal.textContent = '0.00';
                    return;
                }

                // Tabla ordenada
                cartItems.innerHTML = `
                    <table class="table align-middle text-center">
                        <thead class="table-light">
                            <tr>
                                <th>Imagen</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.items.map(item => `
                                <tr>
                                    <td><img src="${item.producto.imagen}" 
                                        style="width:60px; height:60px; object-fit:cover; border-radius:5px;"></td>
                                    <td class="text-start">
                                        <strong>${item.producto.nombre}</strong><br>
                                        <small class="text-muted">${item.producto.descripcion.substring(0,50)}...</small>
                                    </td>
                                    <td>$${item.producto.precio}</td>
                                    <td>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button class="btn btn-sm btn-outline-secondary" onclick="carrito.cambiarCantidad(${item.producto.id}, -1)">-</button>
                                            <input type="number" value="${item.cantidad}" min="1"
                                                class="form-control text-center mx-2" style="width:60px"
                                                onchange="carrito.cambiarCantidadDirecto(${item.producto.id}, this.value)">
                                            <button class="btn btn-sm btn-outline-secondary" onclick="carrito.cambiarCantidad(${item.producto.id}, 1)">+</button>
                                        </div>
                                    </td>
                                    <td><strong>$${(item.producto.precio * item.cantidad).toFixed(2)}</strong></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-danger" onclick="carrito.eliminarProducto(${item.producto.id})">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                cartTotal.textContent = this.calcularTotal();
            }

            limpiar() {
                this.items = [];
                this.actualizarInterfaz();
                this.mostrarNotificacion('Carro vaciado');
            }

            mostrarNotificacion(mensaje) {
                const toast = document.getElementById('notificationToast');
                toast.querySelector('.toast-body').textContent = mensaje;
                new bootstrap.Toast(toast).show();
            }
        }

        // Variables globales
        let productos = [];
        let carrito = new CarritoCompras();

        // Función para cargar productos desde la API
        const cargarProductos = async () => {
            const spinner = document.getElementById('loadingSpinner');
            const errorAlert = document.getElementById('errorAlert');
            const container = document.getElementById('productosContainer');
            
            // Mostrar spinner
            spinner.style.display = 'block';
            errorAlert.classList.add('d-none');
            container.innerHTML = '';

            try {
                // Realizar petición fetch a la API
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                // Limitar a 60 productos para mejor rendimiento
                const productosLimitados = data.slice(0, 60);
                // Crear objetos Producto y almacenarlos
                productos = productosLimitados.map(item => {
                    let img = item.images?.[0] || '';

                    // Validar si es una URL de imagen válida (jpg, png o gif)
                    const regex = /\.(jpg|jpeg|png|gif)$/i;
                    if (!img || !regex.test(img)) {
                        img = 'https://placehold.co/300x200?text=Sin+imagen';
                    }

                    return new Producto(
                        item.id,
                        item.title,
                        item.price,
                        item.category?.name || 'Sin categoría',
                        item.description,
                        img
                    );
                });
                // Mostrar productos
                mostrarProductos(productos);
                // Cargar categorías para el filtro
                cargarCategorias();

            } catch (error) {
                console.error('Error al cargar productos:', error);
                errorAlert.classList.remove('d-none');
            } finally {
                spinner.style.display = 'none';
            }
        };

        // Función para mostrar productos en el DOM
        const mostrarProductos = (productosAMostrar) => {
            const container = document.getElementById('productosContainer');
            
            if (productosAMostrar.length === 0) {
                container.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-info text-center">
                            <h4>No hay productos disponibles</h4>
                            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                        </div>
                    </div>
                `;
                return;
            }
            // Usar desestructuración para extraer información
            container.innerHTML = productosAMostrar
                .map(producto => producto.crearHTML())
                .join('');
        };

        // Función para cargar categorías
        const cargarCategorias = () => {
            const categoryFilter = document.getElementById('categoryFilter');
            // Extraer categorías únicas usando Set
            const categorias = [...new Set(productos.map(({ categoria }) => categoria))];
            // Agregar opciones al select
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria;
                option.textContent = categoria;
                categoryFilter.appendChild(option);
            });
        };

        // Función para filtrar productos por categoría
        const filtrarPorCategoria = () => {
            const categoryFilter = document.getElementById('categoryFilter');
            const categoriaSeleccionada = categoryFilter.value;
            
            if (categoriaSeleccionada === '') {
                mostrarProductos(productos);
            } else {
                const productosFiltrados = productos.filter(
                    producto => producto.categoria === categoriaSeleccionada
                );
                mostrarProductos(productosFiltrados);
            }
        };

        // Función para agregar producto al carro
        const agregarAlCarrito = (productoId) => {
            const producto = productos.find(p => p.id === productoId);
            if (producto) {
                carrito.agregarProducto(producto);
            }
        };

        // Función para limpiar carro
        const limpiarCarrito = () => {
            carrito.limpiar();
        };

        // Función para procesar compra
        const procesarCompra = () => {
            if (carrito.items.length === 0) {
                //alert('Tu carro está vacío');
                MostrarAviso("Tu carro está vacío...", "info");
                return;
            }
            // Simular procesamiento de compra
            const total = carrito.calcularTotal();
            MostrarAviso(`¡Compra procesada exitosamente!\nTotal: $${total}`, "success");
            // Limpiar carro después de la compra
            carrito.limpiar();
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            modal.hide();
        };

        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Cargar productos al iniciar
            cargarProductos();
            // Event listener para filtro de categorías
            document.getElementById('categoryFilter').addEventListener('change', filtrarPorCategoria);
        });

        // Manejo de errores global
        window.addEventListener('error', (event) => {
            console.error('Error global:', event.error);
        });

        // Función para manejar errores de imágenes
        const manejarErrorImagen = (img) => {
            img.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
        };

        // Traductor usando la API gratuita de MyMemory
        const traducirTexto = async (texto, targetLang = "es") => {
            try {
                const res = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|${targetLang}`
                );
                const data = await res.json();
                return data.responseData.translatedText || texto;
            } catch (error) {
                console.error("Error al traducir:", error);
                return texto; 
            }
        };

        // Función para ordenar productos
        const ordenarPorPrecio = () => {
            const sortSelect = document.getElementById('priceSort');
            const orden = sortSelect.value; // "asc" o "desc"

            let productosAMostrar = [...productos];
            // Aplicar ordenamiento si se selecciona
            if (orden === 'asc') {
                productosAMostrar.sort((a, b) => a.precio - b.precio);
            } else if (orden === 'desc') {
                productosAMostrar.sort((a, b) => b.precio - a.precio);
            }
            // Mostrar productos ordenados
            mostrarProductos(productosAMostrar);
        };

        // Event listener para ordenar
        document.getElementById('priceSort').addEventListener('change', ordenarPorPrecio);

        // Función para limitar la cantidad de productos mostrados
        const aplicarLimite = () => {
            const limite = parseInt(document.getElementById('limitFilter').value, 10);
            let productosAMostrar = [...productos]; // Copia de todos los productos

            if (limite > 0) {
                productosAMostrar = productosAMostrar.slice(0, limite);
            }
            mostrarProductos(productosAMostrar);
        };

        // Event listener para el select de límite
        document.getElementById('limitFilter').addEventListener('change', aplicarLimite);

        let productoSeleccionado = null; // guarda el producto actual en detalle

        // Mostrar modal con detalle del producto
        const mostrarDetalle = (id) => {
            const producto = productos.find(p => p.id === id);
            if (!producto) return;

            productoSeleccionado = producto;
            // Llenar datos en el modal
            document.getElementById('productDetailTitle').textContent = producto.nombre;
            document.getElementById('productDetailImage').src = producto.imagen;
            document.getElementById('productDetailCategory').textContent = producto.categoria;
            document.getElementById('productDetailDescription').textContent = producto.descripcion;
            document.getElementById('productDetailPrice').textContent = `$ ${producto.precio}`;
            document.getElementById('productQuantity').value = 1;
            // Abrir modal
            const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
            modal.show();
        };

        // Cambiar cantidad con botones +/-
        const cambiarCantidad = (delta) => {
            const input = document.getElementById('productQuantity');
            let cantidad = parseInt(input.value) || 1;
            cantidad = Math.max(1, cantidad + delta);
            input.value = cantidad;
        };

        // Listener del botón "Agregar al Carro"
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            if (!productoSeleccionado) return;
            const cantidad = parseInt(document.getElementById('productQuantity').value) || 1;
            // Agregar N veces al carro
            for (let i = 0; i < cantidad; i++) {
                carrito.agregarProducto(productoSeleccionado);
            }
            // Cerrar modal después de agregar
            const modal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
            modal.hide();
        });

        ///////////////////////////////////
        // Abrir modal para agregar producto
        const abrirModalAgregarProducto = () => {
            document.getElementById('adminProductModalTitle').textContent = 'Agregar Producto';
            document.getElementById('adminProductForm').reset();
            document.getElementById('adminProductId').value = '';
            const modal = new bootstrap.Modal(document.getElementById('adminProductModal'));
            modal.show();
        };

        // Abrir modal para editar producto
        const abrirModalEditarProducto = (id) => {
            const producto = productos.find(p => p.id === id);
            if (!producto) return;

            document.getElementById('adminProductModalTitle').textContent = 'Editar Producto';
            document.getElementById('adminProductId').value = producto.id;
            document.getElementById('adminProductName').value = producto.nombre;
            document.getElementById('adminProductCategory').value = producto.categoria;
            document.getElementById('adminProductDescription').value = producto.descripcion;
            document.getElementById('adminProductPrice').value = producto.precio;
            document.getElementById('adminProductImage').value = producto.imagen;

            const modal = new bootstrap.Modal(document.getElementById('adminProductModal'));
            modal.show();
        };

        // Guardar producto (agregar o editar)
        document.getElementById('saveAdminProductBtn').addEventListener('click', () => {
            const id = document.getElementById('adminProductId').value;
            const nombre = document.getElementById('adminProductName').value;
            const categoria = document.getElementById('adminProductCategory').value;
            const descripcion = document.getElementById('adminProductDescription').value;
            const precio = parseFloat(document.getElementById('adminProductPrice').value);
            const imagen = document.getElementById('adminProductImage').value;

            //if (!nombre || !categoria || !descripcion || !precio || !imagen) return;
            if (!nombre || !categoria || !descripcion || Number.isNaN(precio) || !imagen) {
                MostrarAviso('Favor completar los campos requeridos', 'warning');
                return;
            }

            if (id) {
                // Editar producto existente
                const producto = productos.find(p => p.id == id);
                producto.nombre = nombre;
                producto.categoria = categoria;
                producto.descripcion = descripcion;
                producto.precio = precio;
                producto.imagen = imagen;
                carrito.mostrarNotificacion(`Producto "${nombre}" actualizado`);
            } else {
                // Agregar nuevo producto
                const nuevoId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
                const nuevoProducto = new Producto(nuevoId, nombre, precio, categoria, descripcion, imagen);
                productos.push(nuevoProducto);
                carrito.mostrarNotificacion(`Producto "${nombre}" agregado`);
            }

            mostrarProductos(productos);
            cargarCategorias();
            const modal = bootstrap.Modal.getInstance(document.getElementById('adminProductModal'));
            modal.hide();
        });

        // Mostrar aviso
        function MostrarAviso(mensaje, icono){
                Swal.fire({
                    title: mensaje,
                    draggable: true,
                    icon: icono
                });
        }

        function AdministrarProductos() {
             // window.open("./crud/productos.html", "_blank");

             Swal.fire({
                    title: 'Ingrese la clave de acceso',
                    input: 'password',
                    inputLabel: 'Clave',
                    inputPlaceholder: 'Escriba su clave aquí',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Entrar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const claveIngresada = result.value;
                        const claveCorrecta = "12345"; 
                        if (claveIngresada === claveCorrecta) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Acceso permitido',
                                showConfirmButton: false,
                                timer: 1000
                            }).then(() => {
                                 window.open("./crud/productos.html", "_blank");
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Clave incorrecta',
                                text: 'No tienes permisos para acceder.'
                            });
                        }
                    }
                });

        }

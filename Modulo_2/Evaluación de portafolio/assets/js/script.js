        // Botón volver arriba
        const backToTopBtn = document.getElementById('backToTop');

        // Animaciones de scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // ===== JQUERY =====
        $(document).ready(function() {
            
            // Animación de barras de progreso
            function animateProgressBars() {
                $('.progress-bar').each(function() {
                    const width = $(this).data('width');
                    $(this).animate({
                        width: width
                    }, 2000);
                });
            }

            // Activar animación cuando la sección de habilidades es visible
            $(window).scroll(function() {
                const skillsSection = $('#skills');
                const scrollTop = $(window).scrollTop();
                const skillsOffset = skillsSection.offset().top;
                const windowHeight = $(window).height();

                if (scrollTop + windowHeight > skillsOffset + 100) {
                    animateProgressBars();
                    $(window).off('scroll', arguments.callee);
                }
            });

            // Formulario de contacto
            $('#contactForm').submit(function(e) {
                e.preventDefault();

                const originalText = $(this).find('button[type="submit"]').text();
                $(this).find('button[type="submit"]').text('Enviando...');
                
                setTimeout(function() {
                    alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
                    $('#contactForm')[0].reset();
                    $('#contactForm').find('button[type="submit"]').text(originalText);
                }, 2000);
            });

            // Datos de proyectos
            const projectData = {
                1: {
                    title: "Sitio Web Corporativo",
                    description: "Un sitio web corporativo completamente responsivo desarrollado con las mejores prácticas de desarrollo web. Incluye secciones de servicios, equipo, testimonios y contacto.",
                    technologies: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "jQuery"],
                    features: [
                        "Diseño completamente responsivo",
                        "Animaciones CSS personalizadas",
                        "Formulario de contacto funcional",
                        "Optimizado para SEO",
                        "Navegación suave entre secciones"
                    ],
                    challenges: "El principal desafío fue crear un diseño que funcionara perfectamente en todos los dispositivos mientras mantenía un alto rendimiento.",
                    learned: "Aprendí sobre la importancia de la accesibilidad web y cómo implementar mejores prácticas de desarrollo frontend."
                },
                2: {
                    title: "E-Commerce Landing",
                    description: "Una página de aterrizaje para una tienda online con carrito de compras dinámico y sistema de filtros de productos.",
                    technologies: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Local Storage"],
                    features: [
                        "Carrito de compras dinámico",
                        "Sistema de filtros de productos",
                        "Galería de imágenes interactiva",
                        "Calculadora de precios en tiempo real",
                        "Integración con redes sociales"
                    ],
                    challenges: "Implementar la funcionalidad del carrito de compras con JavaScript y manejar el estado de los productos seleccionados.",
                    learned: "Profundicé en el manejo del DOM con jQuery y aprendí sobre almacenamiento en el navegador."
                },
                3: {
                    title: "Aplicación de Eventos",
                    description: "Una aplicación web para gestión de eventos con calendario interactivo, sistema de notificaciones y registro de usuarios.",
                    technologies: ["JavaScript", "jQuery", "CSS3", "Bootstrap", "JSON"],
                    features: [
                        "Calendario interactivo",
                        "Sistema de notificaciones",
                        "Registro y gestión de eventos",
                        "Interfaz de usuario intuitiva",
                        "Búsqueda y filtrado de eventos"
                    ],
                    challenges: "Crear un calendario funcional desde cero y manejar múltiples eventos con diferentes estados.",
                    learned: "Mejoré mis habilidades en JavaScript para manejar fechas y eventos, así como en la organización del código."
                }
            };

            // Manejo de modales de proyectos
            $('.project-btn').click(function() {
                const projectId = $(this).data('project');
                const project = projectData[projectId];
                
                $('#modalTitle').text(project.title);
                const modalContent = `
                    <div class="row">
                        <div class="col-12">
                            <h5>Descripción</h5>
                            <p>${project.description}</p>
                            
                            <h5>Tecnologías Utilizadas</h5>
                            <div class="mb-3">
                                ${project.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
                            </div>
                            
                            <h5>Características Principales</h5>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            
                            <h5>Desafíos</h5>
                            <p>${project.challenges}</p>
                            
                            <h5>Aprendizajes</h5>
                            <p>${project.learned}</p>
                        </div>
                    </div>
                `;
                
                $('#modalContent').html(modalContent);
                $('#projectModal').modal('show');
            });

            // Efectos hover en las tarjetas
            $('.skill-card, .project-card').hover(
                function() {
                    $(this).addClass('shadow-lg');
                },
                function() {
                    $(this).removeClass('shadow-lg');
                }
            );

            // Contador animado para estadísticas (opcional)
            function animateCounter(element, start, end, duration) {
                const startTime = performance.now();
                const range = end - start;
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * range + start);
                    
                    element.textContent = current;
                     if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
            }

            // Validación de formulario
            $('#contactForm input, #contactForm textarea').on('blur', function() {
                const field = $(this);
                const value = field.val().trim();
                
                field.removeClass('is-valid is-invalid');
                let isValid = false;
                if (field.attr('type') === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(value);
                } else if (field.attr('required')) {
                    isValid = value.length > 0;
                }
                if (isValid) {
                    field.addClass('is-valid');
                } else if (value.length > 0) {
                    field.addClass('is-invalid');
                }
            });

            $(window).on('load', function() {
                $('body').addClass('loaded');
            });

             // Función para mostrar mensajes de notificación
             function showNotification(message, type = 'success') {
                const notification = $(`
                    <div class="notification ${type}">
                        <i class="fas fa-check-circle"></i>
                        <span>${message}</span>
                    </div>
                `);
                
                $('body').append(notification);
                setTimeout(() => {
                    notification.addClass('show');
                }, 100);
                
                setTimeout(() => {
                    notification.removeClass('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 3000);
             }

             // Estilos para notificaciones
             $('<style>')
                .prop('type', 'text/css')
                .html(`
                    .notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: var(--primary-color);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 5px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        transform: translateX(100%);
                        opacity: 0;
                        transition: all 0.3s ease;
                        z-index: 1000;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .notification.show {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    .notification.success {
                        background: #28a745;
                    }
                    .notification.error {
                        background: #dc3545;
                    }
                    .notification.warning {
                        background: #ffc107;
                        color: #212529;
                    }
                `)
                .appendTo('head');

             // Actualizar el envío del formulario para usar notificaciones
             $('#contactForm').off('submit').on('submit', function(e) {
                e.preventDefault();
                
                const button = $(this).find('button[type="submit"]');
                const originalText = button.text();
                button.text('Enviando...').prop('disabled', true);
                setTimeout(() => {
                    showNotification('¡Mensaje enviado correctamente...', 'success');
                    this.reset();
                    button.text(originalText).prop('disabled', false);
                    $(this).find('.form-control').removeClass('is-valid is-invalid');
                }, 2000);
            });

            // Estilos para tema oscuro
            $('<style>')
                .prop('type', 'text/css')
                .html(`
                    .dark-theme {
                        --primary-color: #ff8a80;
                        --secondary-color: #80cbc4;
                        --dark-color: #263238;
                        --light-color: #37474f;
                        --text-color: #eceff1;
                        background-color: #263238;
                        color: #eceff1;
                    }
                    
                    .dark-theme .navbar {
                        background: linear-gradient(135deg, #37474f, #455a64) !important;
                    }
                    
                    .dark-theme .section {
                        background-color: #37474f;
                    }
                    
                    .dark-theme .about {
                        background-color: #455a64;
                    }
                    
                    .dark-theme .projects {
                        background-color: #455a64;
                    }
                    
                    .dark-theme .skill-card,
                    .dark-theme .project-card {
                        background-color: #455a64;
                        color: #eceff1;
                    }
                    
                    .dark-theme .contact-form {
                        background-color: #455a64;
                        color: #eceff1;
                    }
                `)
                .appendTo('head');

             });

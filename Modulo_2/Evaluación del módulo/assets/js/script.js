
        let PaginaWeb = 'inicio';
        let quizCiberseguridad = [
            {
                pregunta: "¿Cuál es la característica principal de una contraseña segura?",
                alternativas: [
                    "Debe ser fácil de recordar",
                    "Debe tener al menos 12 caracteres con letras, números y símbolos",
                    "Debe contener solo números",
                    "Debe ser el nombre de tu mascota"
                ],
                correcta: 1,
                explicacion: "Una contraseña segura debe tener al menos 12 caracteres y combinar letras mayúsculas, minúsculas, números y símbolos especiales."
            },
            {
                pregunta: "¿Qué es el phishing?",
                alternativas: [
                    "Un tipo de pesca deportiva",
                    "Una técnica para obtener información confidencial haciéndose pasar por una entidad confiable",
                    "Un software antivirus",
                    "Una red social"
                ],
                correcta: 1,
                explicacion: "El phishing es una técnica de ingeniería social donde los atacantes se hacen pasar por entidades confiables para robar información personal."
            },
            {
                pregunta: "¿Cuál es la mejor práctica para usar WiFi público?",
                alternativas: [
                    "Realizar todas las transacciones bancarias",
                    "Compartir la contraseña con otros",
                    "Usar una VPN para cifrar la conexión",
                    "Mantener el WiFi siempre conectado"
                ],
                correcta: 2,
                explicacion: "Al usar WiFi público, siempre debes usar una VPN para cifrar tu conexión y proteger tus datos de posibles interceptaciones."
            },
            {
                pregunta: "¿Qué significa 2FA o autenticación de dos factores?",
                alternativas: [
                    "Usar dos contraseñas diferentes",
                    "Una capa adicional de seguridad que requiere dos formas de verificación",
                    "Tener dos cuentas de correo",
                    "Usar dos navegadores web"
                ],
                correcta: 1,
                explicacion: "La autenticación de dos factores (2FA) añade una capa extra de seguridad requiriendo dos formas diferentes de verificar tu identidad."
            },
            {
                pregunta: "¿Con qué frecuencia deberías hacer copias de seguridad de tus archivos importantes?",
                alternativas: [
                    "Una vez al año",
                    "Solo cuando se dañe el computador",
                    "Regularmente, idealmente de forma automática",
                    "Nunca es necesario"
                ],
                correcta: 2,
                explicacion: "Las copias de seguridad deben hacerse regularmente y de forma automática para proteger tus datos contra pérdidas, ransomware y fallos del sistema."
            }
        ];
       

        $('#nextQuestion').off('click').on('click', function () {
            PreguntaSiguiente();
        });

        let explicacionMostrada = false;
        let IdPregunta = 0;
        let respuestaUsuario = [];
        let puntuacion = 0;

        function MostrarPagina(page) {
            $('#' + page).show().addClass('fade-in');
            $('.nav-pills .nav-link').removeClass('active');
            $(`.nav-pills .nav-link[onclick="MostrarPagina('${page}')"]`).addClass('active');
            PaginaWeb = page;
        }

        function scrollToSection(sectionId) {
            MostrarPagina(sectionId);
        }

        function VerDetalleAmenazas(amenaza) {
            const collapseId = amenaza + 'Collapse';
            const collapseElement = document.getElementById(collapseId);
            if (collapseElement) {
                const bsCollapse = new bootstrap.Collapse(collapseElement, {
                    show: true
                });
            }
        }

        function IniciarTest() {
            IdPregunta = 0;
            respuestaUsuario = [];
            puntuacion = 0;
           
            $('#quizResult').hide();
            $('#quizContainer').show();
            $('#nextQuestion').show().text('Siguiente').append(' <i class="bi bi-arrow-right"></i>');
            $('#startAgain').hide();
           
            CargarPregunta();
        }

        function CargarPregunta() {
            const question = quizCiberseguridad[IdPregunta];
            const isLastQuestion = IdPregunta === quizCiberseguridad.length;

            $('#currentQuestion').text(IdPregunta + 1);
            $('#totalQuestions').text(quizCiberseguridad.length);
            $('#score').text(`Puntuación: ${puntuacion}`);

            const progress = ((IdPregunta + 1) / quizCiberseguridad.length) * 100;
            $('#progressBar').css('width', progress + '%');
            const optionsHtml = question.alternativas.map((option, index) => {
                const isSelected = respuestaUsuario[IdPregunta] === index;
                return `
                    <div class="quiz-option ${isSelected ? 'selected' : ''}" onclick="selectOption(${index})">
                        <i class="bi bi-circle me-2"></i>
                        ${option}
                    </div>
                `;
            }).join('');

            const questionHtml = `
                <div class="question-container">
                    <h5 class="mb-4">${question.pregunta}</h5>
                    <div class="options-container">${optionsHtml}</div>
                    <div id="explanation" class="alert alert-info mt-3" style="display: none;"></div>
                </div>
            `;

            $('#quizContainer').html(questionHtml);
            if (isLastQuestion) {
                $('#nextQuestion')
                    .html('<i class="bi bi-check-circle me-2"></i>Ver Resultados')
                    .off('click')
                    .on('click', MostrarResultados);
            } else {
                $('#nextQuestion')
                    .text('Siguiente Pregunta')
                    .off('click')
                    .on('click', function () {
                        PreguntaSiguiente();
                    });
            }
        }


        function selectOption(optionIndex) {
                const container = $('#quizContainer');
                container.find('.quiz-option').removeClass('selected');
                container.find(`.quiz-option:eq(${optionIndex})`).addClass('selected');
                respuestaUsuario[IdPregunta] = optionIndex;
        }

        function PreguntaSiguiente() {
            const question = quizCiberseguridad[IdPregunta];
            const userRespuesta = respuestaUsuario[IdPregunta];
           
            if (userRespuesta === undefined) {
                alert('Por favor selecciona una respuesta antes de continuar.');
                return;
            }
           
            if (!explicacionMostrada) {
                $('.quiz-option').each(function(index) {
                    $(this).off('click');
                    if (index === question.correcta) {
                        $(this).addClass('correct');
                        $(this).find('i').removeClass('bi-circle').addClass('bi-check-circle-fill');
                    } else if (index === userRespuesta && userRespuesta !== question.correcta) {
                        $(this).addClass('incorrect');
                        $(this).find('i').removeClass('bi-circle').addClass('bi-x-circle-fill');
                    }
                });

                $('#explanation').html(`<strong>Explicación:</strong> ${question.explicacion}`).show();
                $('#nextQuestion').text(IdPregunta === quizCiberseguridad.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta');
                
                explicacionMostrada = true;
                return;
            }

            explicacionMostrada = false;

            if (userRespuesta === question.correcta) {
                puntuacion += 20;
                $('#score').text(`Puntuación: ${puntuacion}`);
            }

            if (IdPregunta < quizCiberseguridad.length - 1) {
                IdPregunta++;
                CargarPregunta();
            } else {
                MostrarResultados();
            }

        }

        function MostrarResultados() {
            $('#quizContainer').hide();
            $('#nextQuestion').hide();
            $('#startAgain').show();
           
            const percentage = (puntuacion / 100) * 100;
            let resultTitle, resultMessage, resultClass;
           
            if (percentage >= 80) {
                resultTitle = "¡Excelente! 🏆";
                resultMessage = "Sigue así, mejorando tus conocimientos sobre ciberseguridad.";
                resultClass = "bg-success";
            } else if (percentage >= 60) {
                resultTitle = "¡Bien hecho! 👍";
                resultMessage = "Puedes mejorar, tienes una base buena.";
                resultClass = "bg-warning";
            } else {
                resultTitle = "Necesitas mejorar 📚";
                resultMessage = "Practica más, te recomendamos revisar los consejos de seguridad.";
                resultClass = "bg-danger";
            }
           
            $('#resultTitle').text(resultTitle);
            $('#resultMessage').text(resultMessage);
            $('#finalScore').css('width', percentage + '%').addClass(resultClass);
            $('#scoreText').text(`Puntuación final: ${puntuacion}/100 (${percentage}%)`);
           
            $('#quizResult').show();
        }

        function validarFormulario() {
            const form = document.getElementById('contactForm');
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            const select = document.getElementById('tema');
            let isValid = true;

            if (!select.value) {
                select.classList.add('is-invalid');
                isValid = false;
            } else {
                select.classList.remove('is-invalid');
                select.classList.add('is-valid');
            }

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
           
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value && !emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }
           
            return isValid;
        }

        $(document).ready(function() {
            MostrarPagina('inicio');

            $('.threat-card').each(function(index) {
                $(this).css('animation-delay', (index * 0.1) + 's');
            });

            $('.security-tip').hover(
                function() {
                    $(this).addClass('shadow-sm');
                },
                function() {
                    $(this).removeClass('shadow-sm');
                }
            );
           
            $('#quizModal').on('show.bs.modal', function() {
                IniciarTest();
            });
           
            $('#contactForm').on('submit', function(e) {
                e.preventDefault();
                if (validarFormulario()) {
                    const submitBtn = $(this).find('button[type="submit"]');
                    const originalText = submitBtn.html();
                   
                    submitBtn.html('<i class="bi bi-hourglass-split me-2"></i>Enviando...').prop('disabled', true);
                    setTimeout(() => {
                        submitBtn.html('<i class="bi bi-check-circle me-2"></i>¡Enviado!').removeClass('btn-primary').addClass('btn-success');
                        const successAlert = `
                            <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                                <i class="bi bi-check-circle me-2"></i>
                                <strong>¡Gracias!</strong> Tu consulta ha sido enviada exitosamente. Te contactaremos pronto.
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        `;
                        $(this).after(successAlert);

                        setTimeout(() => {
                            this.reset();
                            $('.form-control').removeClass('is-valid');
                            submitBtn.html(originalText).removeClass('btn-success').addClass('btn-primary').prop('disabled', false);
                        }, 3000);
                    }, 2000);
                }
            });
           
            $('#contactForm input, #contactForm textarea').on('input', function() {
                $(this).removeClass('is-invalid is-valid');
            });
           
            $('.navbar-nav a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                const target = $(this).attr('href').substring(1);
                if (target) {
                    MostrarPagina(target);
                }
            });
        });



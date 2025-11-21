document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Cierre automático del menú móvil al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // 2. Efecto Scroll Spy (Resaltar enlace activo)
    // Aunque Bootstrap lo hace nativo, este script asegura suavidad
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajuste de 100px para compensar el navbar fijo
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // 3. Validación simple del formulario de contacto (Demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            // Simulación de envío
            alert(`¡Gracias ${name}! Tu mensaje ha sido "enviado" correctamente. (Esto es una demo)`);
            contactForm.reset();
        });
    }
});
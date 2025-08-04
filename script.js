document.addEventListener('DOMContentLoaded', function() {

    // --- FUNÇÃO AUXILIAR DE THROTTLE ---
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // --- VARIÁVEIS GLOBAIS ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const sections = document.querySelectorAll('section[id]');

    // --- Marcar Link da Navbar Ativo (Scrollspy) ---
    function activateNavLinkOnScroll() {
        const headerOffset = 80;
        let currentActiveSectionId = '';
        const scrollY = window.scrollY || window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            if (scrollY >= sectionTop) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    }

    // --- Reduzir Header ao Scroll ---
    function handleHeaderShrink() {
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollThreshold = 100;
        if (scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // --- APLICAÇÃO DO THROTTLE ---
    window.addEventListener('scroll', throttle(handleHeaderShrink, 100));
    window.addEventListener('scroll', throttle(activateNavLinkOnScroll, 100));
    handleHeaderShrink();
    activateNavLinkOnScroll();

    // --- Código do Efeito de Digitação (Typing Effect) ---
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const textToType = [
            "marketing que vende e conteúdo que encanta.",
            "marcas que se tornam inesquecíveis.",
            "estratégias que geram resultados.",
            "uma presença digital incrível."
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 80;
        const deletingSpeed = 40;
        const delayBetweenTexts = 2000;

        function type() {
            const currentText = textToType[textIndex];
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = delayBetweenTexts;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textToType.length;
                speed = typingSpeed;
            }
            setTimeout(type, speed);
        }
        type();
    }

    // --- Código do ScrollReveal.js ---
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            distance: '80px',
            duration: 1200,
            easing: 'ease-in-out',
            delay: 150,
            reset: false
        });

        ScrollReveal().reveal('.hero-content h1', { origin: 'top' });
        ScrollReveal().reveal('.hero-content h2', { origin: 'bottom', delay: 200 });
        // ... (o restante das suas animações do ScrollReveal continua aqui) ...
    }

    // --- Funcionalidade do Acordeão (FAQ) ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const clickedItem = question.closest('.faq-item');
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== clickedItem) {
                    openItem.classList.remove('active');
                }
            });
            clickedItem.classList.toggle('active');
        });
    });

    // --- Funcionalidade para a barra fixa DESAPARECER após a seção FAQ ---
    const fixedCtaBar = document.getElementById('fixedCtaBar');
    const faqSection = document.querySelector('#faq');

    if (fixedCtaBar && faqSection) {
        function handleFixedCtaVisibility() {
            const faqRect = faqSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (faqRect.bottom < windowHeight * 0.85) {
                fixedCtaBar.style.opacity = '0';
                fixedCtaBar.style.visibility = 'hidden';
                fixedCtaBar.style.transform = 'translate(-50%, 150px)';
            } else {
                fixedCtaBar.style.opacity = '1';
                fixedCtaBar.style.visibility = 'visible';
                fixedCtaBar.style.transform = 'translateX(-50%)';
            }
        }
        window.addEventListener('scroll', throttle(handleFixedCtaVisibility, 100));
        window.addEventListener('resize', throttle(handleFixedCtaVisibility, 100));
        handleFixedCtaVisibility();
    } // CORREÇÃO: A chave '}' que fecha o 'if' foi movida para cá, finalizando este bloco de forma correta.

    // --- Mascara e Validação para Campos de Telefone ---
    // CORREÇÃO: Esta lógica agora está fora do 'if' anterior, funcionando de forma independente.
    const phoneInputs = document.querySelectorAll('.phone-mask');
    const handlePhoneInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = '(' + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 11);
        }
        e.target.value = formattedValue;
    };
    phoneInputs.forEach(input => {
        input.addEventListener('input', handlePhoneInput);
    });

    // --- Lógica para Abrir/Fechar o Modal de Formulário ---
    const openFormButton = document.getElementById('openFormButton');
    const formModal = document.getElementById('formModal');
    const closeButton = document.querySelector('#formModal .close-button');

    if (openFormButton && formModal && closeButton) {
        openFormButton.addEventListener('click', function(event) {
            event.preventDefault();
            formModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeButton.addEventListener('click', function() {
            formModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        window.addEventListener('click', function(event) {
            if (event.target == formModal) {
                formModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.querySelector('.main-nav');
    const mobileNavLinks = document.querySelectorAll('.main-nav ul li a');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --- LÓGICA DO DARK MODE (REATORADA PARA DESKTOP E MOBILE) ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const body = document.body;

    const desktopIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;
    const mobileIcon = darkModeToggleMobile ? darkModeToggleMobile.querySelector('i') : null;

    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if (desktopIcon) desktopIcon.className = 'fas fa-sun';
        if (mobileIcon) mobileIcon.className = 'fas fa-sun';
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        if (desktopIcon) desktopIcon.className = 'fas fa-moon';
        if (mobileIcon) mobileIcon.className = 'fas fa-moon';
    };

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
    
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

}); // Fim do DOMContentLoaded

// CORREÇÃO: A chave '}' extra que estava aqui foi removida.

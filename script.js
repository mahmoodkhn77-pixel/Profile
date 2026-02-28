// script.js
// Wait for DOM content to load
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    // Hide loader after 3 seconds with fade effect and reveal page
    setTimeout(() => {
        loader.classList.add('fade-out');
        // restore body visibility by removing preload class
        document.body.classList.remove('preload');
        // hide loader after fade
        setTimeout(() => loader.style.display = 'none', 2000);

        // trigger hero element animation after loader disappears
        animateHero();
    }, 1000);

    // smooth scroll for nav links (anchors) + close mobile menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            const toggle = document.getElementById('menu-toggle');
            if (toggle && toggle.checked) {
                toggle.checked = false;
            }
        });
    });

    // add shadow to navbar on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // intersection observer for sections and animated elements
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // observe sections and elements with animation classes
    document.querySelectorAll('section, .fade-in, .fade-in-left, .fade-in-right, .slide-up').forEach(el => observer.observe(el));

    // handle contact form submissions by opening mail client
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const to = 'mahmoodkhn77@gmail.com';
            const subject = encodeURIComponent('Portfolio contact from ' + name);
            let body = 'Name: ' + name + '\n';
            body += 'Email: ' + email + '\n\n';
            body += 'Message:\n' + message;
            body = encodeURIComponent(body);
            // create mailto link and open
            window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
    }
});

// hero animation helper
function animateHero() {
    const nameEl = document.querySelector('.hero h1');
    const roleEl = document.querySelector('.typing-text');
    const introEl = document.querySelector('.hero p');
    const btnEl = document.querySelector('.btn-glow');

    if (nameEl) nameEl.classList.add('visible');
    if (roleEl) {
        roleEl.classList.add('visible');
        typeWriter(roleEl, roleEl.dataset.text || '');
    }
    if (introEl) setTimeout(() => introEl.classList.add('visible'), 600);
    if (btnEl) setTimeout(() => btnEl.classList.add('visible'), 900);
    const imgEl = document.querySelector('.hero-image');
    if (imgEl) setTimeout(() => imgEl.classList.add('visible'), 800);
}

// simple typing effect
function typeWriter(el, text, speed = 150) {
    let i = 0;
    el.textContent = '';
    function addChar() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(addChar, speed);
        }
    }
    addChar();
}

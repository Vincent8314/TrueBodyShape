// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Form submission - using AJAX to prevent page redirect
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return false;
            }
            
            // Change button text to show loading
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;
            }
            
            // Collect form data
            const formData = new FormData(form);
            
            // Add required FormSubmit parameters
            formData.append('_captcha', 'false');
            
            // Send data via fetch API
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Hide form fields
                    Array.from(form.querySelectorAll('.form-group, button')).forEach(el => {
                        el.style.display = 'none';
                    });
                    
                    // Show success messageF
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    } else {
                        form.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully. We will contact you soon.</p></div>';
                    }
                    
                    // Scroll to success message
                    window.scrollTo({
                        top: form.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    return Promise.resolve();
                } else {
                    return Promise.reject('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
                
                // Reset button
                if (submitButton) {
                    submitButton.innerHTML = 'SEND MESSAGE';git 
                    submitButton.disabled = false;
                }
            });
        });
    }
});
// Ajouter ceci à la partie de gestion du menu hamburger mobile

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    
    if (hamburgerButton && mobileMenu) {
        // Ouvrir/fermer le menu quand on clique sur le hamburger
        hamburgerButton.addEventListener('click', function() {
            hamburgerButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Petit délai avant fermeture
                setTimeout(() => {
                    hamburgerButton.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }, 500); // Délai de 500ms (0.5 secondes)
            });
        });
        
        // NOUVEAU : Fermer le menu quand la fenêtre change de taille
        window.addEventListener('resize', function() {
            // Si la largeur de la fenêtre dépasse le seuil du media query (768px)
            if (window.innerWidth > 768) {
                // Fermer le menu mobile
                hamburgerButton.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
});
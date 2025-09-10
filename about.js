// Simple JavaScript to highlight the active navigation link
        document.addEventListener('DOMContentLoaded', function() {
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('nav a');
            
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
                    link.style.color = '#3498db';
                }
            });
        });
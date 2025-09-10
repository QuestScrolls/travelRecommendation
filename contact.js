document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert(`Thank you, ${name}! Your message has been sent. We will contact you at ${email} soon.`);
                
                // Reset the form
                document.getElementById('contactForm').reset();
            } else {
                alert('Please fill out all fields before submitting.');
            }
        });
        
        // Highlight active nav link
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
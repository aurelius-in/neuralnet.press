// topbar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('topbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            // Initialize menu toggle functionality after loading topbar
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');

            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        })
        .catch(error => console.error('Error loading topbar:', error));
});

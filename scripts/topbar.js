// topbar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('topbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('topbar').innerHTML = data;

            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');

            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        })
        .catch(error => console.error('Error loading topbar:', error));
});

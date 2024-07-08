// loadTopbar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('topbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('topbar-placeholder').innerHTML = data;

            // Now you can add event listeners or any other functionality for the topbar
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');

            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        })
        .catch(error => console.error('Error loading topbar:', error));
});

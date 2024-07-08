// loadTopbar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('../topbar.html') // Adjust this path based on where loadTopbar.js is located
        .then(response => response.text())
        .then(data => {
            document.getElementById('topbar-placeholder').innerHTML = data;

            // Event listeners for topbar
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        })
        .catch(error => console.error('Error loading topbar:', error));
});

// loadTopbar.js
document.addEventListener('DOMContentLoaded', function() {
    const pathToTopbar = location.pathname.includes('/articles/') ? '../topbar.html' : 'topbar.html';
    console.log('Loading topbar from:', pathToTopbar);

    fetch(pathToTopbar)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
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

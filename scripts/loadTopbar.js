// loadTopbar.js
document.addEventListener('DOMContentLoaded', function() {
    const pathToTopbar = location.pathname.includes('/articles/') ? '../topbar.html' : 'topbar.html';
    const headerElement = location.pathname.includes('/articles/') ? document.querySelector('.issue-detail-header') : document.querySelector('header');
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

            if (headerElement) {
                headerElement.appendChild(document.getElementById('topbar-placeholder').children[0]);
            }
        })
        .catch(error => console.error('Error loading topbar:', error));
});

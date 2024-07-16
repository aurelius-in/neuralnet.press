// loadTopbar.js
document.addEventListener('DOMContentLoaded', function() {
    const pathToTopbar = location.pathname.includes('/articles/') || location.pathname.includes('/search/') ? '../topbar.html' : 'topbar.html';
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
            const searchIcon = document.getElementById('search-icon');
            const searchDropdown = document.getElementById('search-dropdown');
            const searchButton = document.getElementById('search-button');
            const searchInput = document.getElementById('search-input');

            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            searchIcon.addEventListener('click', () => {
                searchDropdown.classList.toggle('active');
            });

            searchButton.addEventListener('click', () => {
                if (searchInput.value.trim()) {
                    const searchQuery = encodeURIComponent(searchInput.value.trim());
                    const currentPath = window.location.pathname;
                    let searchUrl = '';

                    if (currentPath.includes('/articles/')) {
                        searchUrl = `../search.html?query=${searchQuery}`;
                    } else {
                        searchUrl = `search.html?query=${searchQuery}`;
                    }

                    window.location.href = searchUrl;
                }
            });
        })
        .catch(error => console.error('Error loading topbar:', error));
});

// loadTopbar.js
document.addEventListener('DOMContentLoaded', function() {
    const pathToTopbar = location.pathname.includes('/articles/') ? '/neuralnet.press/topbar.html' : 'topbar.html';
    console.log('Loading topbar from:', pathToTopbar);

    fetch(pathToTopbar)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const topbarPlaceholder = document.getElementById('topbar-placeholder');
            topbarPlaceholder.innerHTML = data;

            // Add the specific class if the path includes '/articles/'
            if (location.pathname.includes('/articles/')) {
                topbarPlaceholder.classList.add('issue-detail-topbar');
            }

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
                    window.location.href = `/neuralnet.press/search.html?query=${encodeURIComponent(searchInput.value.trim())}`;
                }
            });
        })
        .catch(error => console.error('Error loading topbar:', error));
});

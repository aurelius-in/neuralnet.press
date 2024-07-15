// search.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (!query) {
        document.getElementById('search-results').innerHTML = '<p>Please enter a search query.</p>';
        return;
    }

    fetch('data/articles.json') // Assume all articles are indexed in this file
        .then(response => response.json())
        .then(articles => {
            const results = articles.filter(article => article.content.includes(query));
            displayResults(results, query);
        })
        .catch(error => console.error('Error loading articles:', error));
});

function displayResults(results, query) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(article => {
        const snippet = getSnippet(article.content, query);
        const articleElement = `
            <div class="search-result">
                <h2 class="search-title">${article.title}</h2>
                <p class="search-snippet">...${snippet}...</p>
            </div>
        `;
        container.innerHTML += articleElement;
    });
}

function getSnippet(content, query) {
    const words = content.split(/\s+/);
    const index = words.findIndex(word => word.includes(query));
    const start = Math.max(index - 3, 0);
    const end = Math.min(index + 4, words.length);
    return words.slice(start, end).join(' ');
}

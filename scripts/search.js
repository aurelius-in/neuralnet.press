// search.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (!query) {
        document.getElementById('search-results').innerHTML = '<p>Please enter a search query.</p>';
        return;
    }

    const categories = [
        'startups', 'research', 'industry', 'robotics', 'policy',
        'entertainment', 'cybersecurity', 'events', 'environment',
        'society', 'collaborations', 'education', 'ethics', 'healthcare'
    ];

    let results = [];
    let promises = [];

    categories.forEach(category => {
        const issueNumbers = ['2407', '2406', '2405']; // List all your issue numbers here
        issueNumbers.forEach(issueNumber => {
            const fetchPromise = fetch(`../data/${issueNumber}${category}.json`)
                .then(response => response.json())
                .then(article => {
                    if (article.content.includes(query) || article.title.includes(query)) {
                        results.push({
                            title: article.title,
                            content: article.content,
                            category: category
                        });
                    }
                })
                .catch(error => console.error(`Error loading ${category} articles for issue ${issueNumber}:`, error));
            promises.push(fetchPromise);
        });
    });

    Promise.all(promises).then(() => displayResults(results, query));
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
    const index = words.findIndex(word => word.toLowerCase().includes(query.toLowerCase()));
    const start = Math.max(index - 3, 0);
    const end = Math.min(index + 4, words.length);
    return words.slice(start, end).join(' ');
}

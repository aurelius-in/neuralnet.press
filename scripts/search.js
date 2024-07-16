// search.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const searchResultsContainer = document.getElementById('search-results');

    if (!query) {
        searchResultsContainer.innerHTML = '<p>No search query provided.</p>';
        return;
    }

    const issueNumbers = ["2312", "2407", "2406", "2405"]; // Add all issue numbers as needed
    const categories = [
        'startups', 'research', 'industry', 'robotics', 'policy', 
        'entertainment', 'cybersecurity', 'events', 'environment', 
        'society', 'collaborations', 'education', 'ethics', 'healthcare'
    ];

    const searchPromises = issueNumbers.flatMap(issueNumber => 
        categories.map(category => 
            fetch(`../data/${issueNumber}${category}.json`)
                .then(response => response.json())
                .then(article => ({ article, issueNumber, category }))
                .catch(error => console.error(`Error loading ${category} article for issue ${issueNumber}:`, error))
        )
    );

    Promise.all(searchPromises).then(results => {
        const filteredResults = results.filter(({ article }) => 
            article && article.content && article.content.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredResults.length === 0) {
            searchResultsContainer.innerHTML = '<p>No results found. Please try a different search term.</p>';
        } else {
            filteredResults.forEach(({ article, issueNumber, category }) => {
                const snippet = getSnippet(article.content, query);
                const searchItem = document.createElement('div');
                searchItem.classList.add('search-result-item');
                searchItem.innerHTML = `
                    <h2><a href="issueDetail.html?issue=${issueNumber}">${article.title}</a></h2>
                    <p>Issue: ${formatDate(issueNumber)}</p>
                    <p>Author: <span style="color: #ffcc66;">${article.author}</span></p>
                    <p>..."<em>${snippet}</em>"...</p>
                `;
                searchResultsContainer.appendChild(searchItem);
            });
        }
    }).catch(error => console.error('Error loading search results:', error));
});

function getSnippet(content, query) {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const queryIndex = lowerContent.indexOf(lowerQuery);

    if (queryIndex === -1) return '';

    const start = Math.max(0, queryIndex - 30);
    const end = Math.min(content.length, queryIndex + query.length + 30);

    let snippet = content.slice(start, end);
    snippet = snippet.replace(new RegExp(`(${query})`, 'ig'), '<strong>$1</strong>');

    return snippet;
}

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

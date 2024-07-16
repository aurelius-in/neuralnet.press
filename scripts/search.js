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

    const issueNumbers = ['2407', '2406', '2405', '2404', '2403', '2402', '2401', '2312']; // List all your issue numbers here

    let results = [];
    let promises = [];

    categories.forEach(category => {
        issueNumbers.forEach(issueNumber => {
            const fetchPromise = fetch(`https://aurelius-in.github.io/neuralnet.press/data/${issueNumber}${category}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error loading ${category} articles for issue ${issueNumber}`);
                    }
                    return response.json();
                })
                .then(article => {
                    console.log(`Fetched article from ${issueNumber}${category}.json: ${article.title}`); // Log fetched article title
                    console.log(`Article content: ${article.content}`); // Log fetched article content
                    if (article.content.toLowerCase().includes(query.toLowerCase()) || article.title.toLowerCase().includes(query.toLowerCase())) {
                        console.log(`Article matches query: ${query}`); // Log matching article
                        results.push({
                            title: article.title,
                            content: article.content,
                            category: category,
                            issueNumber: issueNumber
                        });
                    }
                })
                .catch(error => console.error(error));
            promises.push(fetchPromise);
        });
    });

    Promise.all(promises).then(() => {
        displayResults(results, query);
        if (results.length === 0) {
            console.log('No results found. Results array:', results); // Log if no results found
        }
    });
});

function displayResults(results, query) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>No results found. Please try another search term or check back later.</p>';
        return;
    }

    results.forEach(article => {
        const snippet = getSnippet(article.content, query);
        const issueDate = formatDate(article.issueNumber);
        const articleElement = `
            <div class="search-result">
                <h2 class="search-title">${article.title}</h2>
                <p class="search-snippet">"...${snippet}..."</p>
                <p class="search-issue">Issue: ${issueDate}</p>
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

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

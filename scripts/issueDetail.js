// issueDetail.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const issueNumber = urlParams.get('issue');
    if (!issueNumber) {
        console.error('Issue number not provided in the URL');
        return;
    }

    document.getElementById('issue-title').textContent = `Issue: ${formatDate(issueNumber)}`;

    const categories = ['startups', 'research'];
    const articlesContainer = document.getElementById('articles');

    categories.forEach(category => {
        fetch(`../data/${issueNumber}${category}.json`)
            .then(response => response.json())
            .then(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                const articleImage = document.createElement('img');
                articleImage.src = `../${article.image}`;
                articleImage.alt = `${article.title} Image`;
                articleImage.classList.add('article-image');

                const articleTitle = document.createElement('h3');
                articleTitle.textContent = article.title;

                const articleAuthor = document.createElement('p');
                articleAuthor.textContent = article.author;
                articleAuthor.classList.add('article-author');

                const articleContent = document.createElement('p');
                articleContent.textContent = article.content;

                articleElement.appendChild(articleImage);
                articleElement.appendChild(articleTitle);
                articleElement.appendChild(articleAuthor);
                articleElement.appendChild(articleContent);
                articlesContainer.appendChild(articleElement);
            })
            .catch(error => console.error(`Error loading ${category} article for issue ${issueNumber}:`, error));
    });
});

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('articles');
    const urlParams = new URLSearchParams(window.location.search);
    const issue = urlParams.get('issue');

    fetch(`../data/${issue}.json`)
        .then(response => response.json())
        .then(articles => {
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                const headerImage = document.createElement('img');
                headerImage.src = `../images/${issue}${article.category}_.png`;
                headerImage.alt = `${article.category} Header Image`;
                headerImage.classList.add('header-image');

                const articleTitle = document.createElement('h2');
                articleTitle.classList.add('article-title');
                articleTitle.textContent = article.title;

                const articleAuthor = document.createElement('p');
                articleAuthor.classList.add('article-author');
                articleAuthor.innerHTML = `<span style="color: #fff;">${article.author}</span> ● <span style="color: #ff9900;">${formatDate(issue)}</span>`;

                const articleImage = document.createElement('img');
                articleImage.src = `../images/${issue}${article.category}.png`;
                articleImage.alt = `${article.category} Image`;
                articleImage.classList.add('article-image');

                const articleContent = document.createElement('div');
                articleContent.classList.add('article-content');
                articleContent.innerHTML = article.content.split('.<br><br>').join('<br>'); // Adjusting the format

                const readMoreButton = document.createElement('button');
                readMoreButton.classList.add('read-more');
                readMoreButton.textContent = 'Read More';
                readMoreButton.addEventListener('click', () => {
                    const fullContent = article.content;
                    articleContent.innerHTML = fullContent.split('.<br><br>').join('<br>'); // Adjusting the format
                    readMoreButton.style.display = 'none';
                });

                articleElement.appendChild(headerImage);
                articleElement.appendChild(articleTitle);
                articleElement.appendChild(articleAuthor);
                articleElement.appendChild(articleImage);
                articleElement.appendChild(articleContent);
                articleElement.appendChild(readMoreButton);
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error loading articles:', error));

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

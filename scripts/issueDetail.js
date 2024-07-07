// issueDetail.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const issueNumber = urlParams.get('issue');
    const articlesContainer = document.getElementById('articles');

    fetch(`../data/${issueNumber}.json`)
        .then(response => response.json())
        .then(data => {
            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article-container');

                const articleHeader = document.createElement('div');
                articleHeader.classList.add('article-header');

                const categoryHeader = document.createElement('img');
                categoryHeader.src = `../images/${issueNumber}${article.category}_.png`;
                categoryHeader.alt = `${article.category} Header`;
                articleHeader.appendChild(categoryHeader);

                const title = document.createElement('h1');
                title.textContent = article.title;
                articleHeader.appendChild(title);

                const authorDate = document.createElement('p');
                authorDate.innerHTML = `<span style="color: #ff9800; font-weight: bold;">${article.author}</span> <span style="color: white; font-weight: bold;">● ${formatDate(issueNumber)}</span>`;
                articleHeader.appendChild(authorDate);

                articleElement.appendChild(articleHeader);

                const image = document.createElement('img');
                image.src = `../images/${issueNumber}${article.category}.png`;
                image.alt = `${article.category} Image`;
                articleElement.appendChild(image);

                const articleBody = document.createElement('div');
                articleBody.classList.add('article-body');
                articleBody.innerHTML = article.content;

                articleElement.appendChild(articleBody);
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error loading articles:', error));

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
    });
});

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

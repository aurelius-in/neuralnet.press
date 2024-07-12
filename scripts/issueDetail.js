// issueDetail.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const issueNumber = urlParams.get('issue');
    if (!issueNumber) {
        console.error('Issue number not provided in the URL');
        return;
    }

    document.getElementById('issue-title').textContent = `July 2024 Edition`;

    const categories = [
        'startups', 'research', 'industry', 'robotics', 'policy', 
        'entertainment', 'cybersecurity', 'events', 'environment', 
        'society', 'collaborations', 'education', 'ethics', 'healthcare'
    ];
    const articlesContainer = document.getElementById('articles');

    categories.forEach(category => {
        fetch(`../data/${issueNumber}${category}.json`)
            .then(response => response.json())
            .then(article => {
                createArticleElement(article, category, articlesContainer, issueNumber);
            })
            .catch(error => console.error(`Error loading ${category} article for issue ${issueNumber}:`, error));
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

function createArticleElement(article, category, container, issueNumber) {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const headerImage = document.createElement('img');
    headerImage.src = `../images/${category}_.png`;
    headerImage.alt = `${category.charAt(0).toUpperCase() + category.slice(1)} Header Image`;
    headerImage.classList.add('header-image');
    articleElement.appendChild(headerImage);

    const title = document.createElement('h2');
    title.textContent = article.title;
    title.classList.add('article-title');
    articleElement.appendChild(title);

    const authorDateContainer = document.createElement('p');
    authorDateContainer.classList.add('author-date-container');

    const author = document.createElement('span');
    author.textContent = article.author;
    author.classList.add('article-author');
    authorDateContainer.appendChild(author);

    const separator = document.createElement('span');
    separator.textContent = ' ● ';
    authorDateContainer.appendChild(separator);

    const date = document.createElement('span');
    date.textContent = formatDate(issueNumber);
    date.classList.add('article-date');
    authorDateContainer.appendChild(date);

    articleElement.appendChild(authorDateContainer);

    const image = document.createElement('img');
    image.src = `../images/${issueNumber}${category}.png`;
    image.alt = `${article.title} Image`;
    image.classList.add('article-image');
    articleElement.appendChild(image);

    const content = document.createElement('div');
    const cleanedContent = removeCitations(article.content);
    const trimmedContent = trimContent(cleanedContent, 200);
    content.innerHTML = trimmedContent.trimmedText;
    content.classList.add('article-content');
    articleElement.appendChild(content);

    let remainingText = trimmedContent.remainingText;
    if (remainingText) {
        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Read More';
        readMoreButton.classList.add('read-more');
        readMoreButton.addEventListener('click', function() {
            const additionalContent = trimContent(remainingText, 200);
            content.innerHTML += additionalContent.trimmedText;
            remainingText = additionalContent.remainingText;
            if (!remainingText) {
                readMoreButton.style.display = 'none';
            }
        });
        articleElement.appendChild(readMoreButton);
    }

    container.appendChild(articleElement);
}

function trimContent(content, wordLimit) {
    const words = content.split(/\s+/);
    if (words.length > wordLimit) {
        const trimmedText = words.slice(0, wordLimit).join(' ');
        const remainingText = words.slice(wordLimit).join(' ');
        return { trimmedText, remainingText };
    }
    return { trimmedText: content, remainingText: '' };
}

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function removeCitations(content) {
    return content.replace(/:citation\[oaicite:\d+\]{index=\d+}/g, '');
}

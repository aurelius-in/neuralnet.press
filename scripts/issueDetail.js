document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const issue = urlParams.get('issue');

    if (!issue) {
        console.error('No issue specified.');
        return;
    }

    const articlesContainer = document.getElementById('articles');
    const issueTitle = document.getElementById('issue-title');
    issueTitle.textContent = `Issue ${issue}`;

    const categories = ['startups', 'research', 'robotics', 'policy', 'entertainment', 'ethics', 'environment', 'education', 'cybersecurity', 'events', 'industry', 'society'];
    const fetchArticles = async (category) => {
        try {
            const response = await fetch(`../data/${issue}${category}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${category} articles for issue ${issue}`);
            }
            const articles = await response.json();
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                const headerImage = document.createElement('img');
                headerImage.src = `../images/${issue}${category}_.png`;
                headerImage.alt = `${category.charAt(0).toUpperCase() + category.slice(1)} Header`;
                headerImage.classList.add('header-image');

                const titleElement = document.createElement('h2');
                titleElement.classList.add('article-title');
                titleElement.textContent = article.title;

                const authorElement = document.createElement('p');
                authorElement.classList.add('article-author');
                authorElement.textContent = `${article.author} ● ${formatDate(issue)}`;

                const dateElement = document.createElement('p');
                dateElement.classList.add('article-date');
                dateElement.textContent = formatDate(issue);

                const imageElement = document.createElement('img');
                imageElement.src = `../images/${issue}${category}.png`;
                imageElement.alt = `${article.title} Image`;
                imageElement.classList.add('article-image');

                const contentElement = document.createElement('div');
                contentElement.classList.add('article-content');
                contentElement.innerHTML = article.content.replace(/<br><br>/g, '');

                const readMoreButton = document.createElement('button');
                readMoreButton.classList.add('read-more');
                readMoreButton.textContent = 'Read More';
                let isExpanded = false;
                let displayContent = article.content.split(' ').slice(0, 200).join(' ');
                contentElement.innerHTML = displayContent + '...';

                readMoreButton.addEventListener('click', () => {
                    if (isExpanded) {
                        displayContent = article.content.split(' ').slice(0, 200).join(' ');
                        contentElement.innerHTML = displayContent + '...';
                        readMoreButton.textContent = 'Read More';
                    } else {
                        displayContent = article.content;
                        contentElement.innerHTML = displayContent;
                        readMoreButton.textContent = 'Show Less';
                    }
                    isExpanded = !isExpanded;
                });

                articleElement.appendChild(headerImage);
                articleElement.appendChild(titleElement);
                articleElement.appendChild(authorElement);
                articleElement.appendChild(dateElement);
                articleElement.appendChild(imageElement);
                articleElement.appendChild(contentElement);
                articleElement.appendChild(readMoreButton);
                articlesContainer.appendChild(articleElement);
            });
        } catch (error) {
            console.error(error);
        }
    };

    categories.forEach(category => {
        fetchArticles(category);
    });

    function formatDate(issueNumber) {
        const year = `20${issueNumber.slice(0, 2)}`;
        const month = issueNumber.slice(2);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
    });
});

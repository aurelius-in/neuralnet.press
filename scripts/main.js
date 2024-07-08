// main.js
document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('articles');

    fetch('data/issues.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(issues => {
            issues.forEach(issue => {
                const issueElement = document.createElement('div');
                issueElement.classList.add('issue');

                const issueThumb = document.createElement('img');
                issueThumb.src = `images/${issue}thumb.png`;
                issueThumb.alt = `${issue} Thumbnail`;
                issueThumb.classList.add('issue-thumb');
                issueThumb.addEventListener('click', () => {
                    window.location.href = `articles/issueDetail.html?issue=${issue}`;
                });

                const issueDate = document.createElement('p');
                issueDate.textContent = formatDate(issue);
                issueDate.classList.add('issue-date');

                issueElement.appendChild(issueThumb);
                issueElement.appendChild(issueDate);
                articlesContainer.appendChild(issueElement);
            });
        })
        .catch(error => console.error('Error loading issues:', error));

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

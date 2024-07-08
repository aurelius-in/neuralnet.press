// issues.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('data/issues.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(issueNumbers => {
            const issuesContainer = document.getElementById('issues');
            issueNumbers.forEach(issueNumber => {
                const issueElement = document.createElement('div');
                issueElement.classList.add('issue');

                const issueLink = document.createElement('a');
                issueLink.href = `articles/issueDetail.html?issue=${issueNumber}`;

                const issueImage = document.createElement('img');
                issueImage.src = `images/${issueNumber}thumb.png`;
                issueImage.alt = `${issueNumber} Thumbnail`;
                issueImage.classList.add('issue-thumb');

                const issueDate = document.createElement('p');
                issueDate.classList.add('issue-date');
                issueDate.textContent = formatDate(issueNumber);

                issueLink.appendChild(issueImage);
                issueLink.appendChild(issueDate);
                issueElement.appendChild(issueLink);
                issuesContainer.appendChild(issueElement);
            });
        })
        .catch(error => console.error('Error loading issues:', error));
});

function formatDate(issueNumber) {
    const year = `20${issueNumber.slice(0, 2)}`;
    const month = issueNumber.slice(2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

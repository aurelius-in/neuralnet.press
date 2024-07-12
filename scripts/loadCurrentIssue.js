document.addEventListener('DOMContentLoaded', function() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Get month with leading zero

    const issueNumber = `${year}${month}`;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[date.getMonth()];
    const currentYear = date.getFullYear();

    document.getElementById('issue-cover').src = `images/${issueNumber}cover.png`;
    document.getElementById('issue-link').href = `https://aurelius-in.github.io/neuralnet.press/articles/issueDetail.html?issue=${issueNumber}`;
    document.getElementById('issue-date').textContent = `${currentMonthName} ${currentYear}`;
    document.getElementById('issue-date').href = `https://aurelius-in.github.io/neuralnet.press/issues.html#${currentMonthName.toLowerCase()}-${currentYear}`;
});

function loadTopbar() {
    var topbarHtml = `
        <header>
            <button class="menu-button" onclick="toggleMenu()">&#9776;</button>
            <img src="../images/nnlogo.png" alt="NeuralNet">
            <nav>
                <a href="../index.html">Home</a>
                <a href="../issues.html">Issues</a>
                <a href="../#about">About Us</a>
                <a href="../#contact">Contact</a>
            </nav>
            <div>
                <a href="#"><img src="../images/magnifying-glass.png" alt="Search"></a>
                <a href="#"><img src="../images/profile.png" alt="Profile"></a>
            </div>
        </header>
    `;

    document.getElementById("topbar").innerHTML = topbarHtml;
}

function toggleMenu() {
    var nav = document.querySelector('nav');
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
    loadTopbar();
    var menuButton = document.querySelector('.menu-button');
    menuButton.addEventListener('click', toggleMenu);
});

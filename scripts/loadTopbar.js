document.addEventListener('DOMContentLoaded', function() {
    const topbar = document.getElementById('topbar');
    topbar.innerHTML = `
        <div class="topbar-container">
            <button id="menuButton" class="menu-button"></button>
            <img src="../images/nnlogo.png" alt="NeuralNet Logo" class="logo">
            <img src="../images/magnifying-glass.png" alt="Search" class="search-icon">
            <img src="../images/profile-icon.png" alt="Profile" class="profile-icon">
        </div>
        <nav id="menu" class="menu hidden">
            <ul>
                <li><a href="https://aurelius-in.github.io/neuralnet.press/">Home</a></li>
                <li><a href="https://aurelius-in.github.io/neuralnet.press/issues.html">Issues</a></li>
                <li><a href="https://aurelius-in.github.io/neuralnet.press/#about">About Us</a></li>
                <li><a href="https://aurelius-in.github.io/neuralnet.press/#contact">Contact</a></li>
            </ul>
        </nav>
    `;

    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    menuButton.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
});

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Issue Details - NeuralNet Press</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../styles/headers.css">
    <link rel="stylesheet" href="../styles/articles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <button class="menu-toggle" id="menu-toggle">☰</button>
            <img src="../images/nnlogo.png" alt="NeuralNet Press Logo" class="logo">
            <div class="nav-icons">
                <a href="#"><span class="magnifying-glass">🔍</span></a>
                <a href="#"><span class="profile-icon">👤</span></a>
            </div>
            <nav>
                <ul id="nav-links" class="nav-links">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../issues.html">Issues</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div class="container">
            <h2 id="issue-title"></h2>
            <div id="articles" class="articles">
                <!-- Articles will be loaded here dynamically -->
            </div>
        </div>
    </main>
    <footer>
        <div class="container">
            <p>&copy; 2024 NeuralNet Press. All rights reserved.</p>
        </div>
    </footer>
    <script src="../scripts/issueDetail.js"></script>
    <script src="../scripts/main.js"></script>
</body>
</html>

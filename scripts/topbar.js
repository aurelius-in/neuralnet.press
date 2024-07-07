<!-- Include this script in the <head> or just before the closing </body> tag of each HTML page -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        fetch('topbar.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);
                document.getElementById('menu-toggle').addEventListener('click', function() {
                    document.getElementById('nav-links').classList.toggle('active');
                });
            })
            .catch(error => console.error('Error loading topbar:', error));
    });
</script>

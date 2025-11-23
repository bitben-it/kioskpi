// Logo functionality
function updateLogo() {
    if (!dom.logoElement) return;
    dom.logoElement.innerHTML = '';
    const img = document.createElement('img');
    img.src = LOGO_PATH;
    img.alt = 'Logo';
    img.onerror = function() {
        // If image fails to load, show placeholder
        dom.logoElement.innerHTML = '<div class="logo-placeholder">Logo<br/>Placeholder</div>';
    };
    dom.logoElement.appendChild(img);
}


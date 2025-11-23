// Logo functionality
function updateLogo() {
    if (!dom.logoElement) {
        console.warn('Logo element not found');
        return;
    }
    
    try {
        dom.logoElement.innerHTML = '';
        const img = document.createElement('img');
        img.src = LOGO_PATH;
        img.alt = 'Logo';
        img.onerror = function() {
            // If image fails to load, show placeholder
            console.warn('Logo image failed to load:', LOGO_PATH);
            dom.logoElement.innerHTML = '<div class="logo-placeholder">Logo<br/>Placeholder</div>';
        };
        img.onload = function() {
            console.log('Logo loaded successfully:', LOGO_PATH);
        };
        dom.logoElement.appendChild(img);
    } catch (error) {
        console.error('Error updating logo:', error);
    }
}


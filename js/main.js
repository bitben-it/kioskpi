// Browser feature detection
function checkBrowserSupport() {
    const issues = [];
    
    if (!window.fetch) {
        issues.push('fetch API not supported - JSON loading will fail');
    }
    
    if (!document.querySelector) {
        issues.push('querySelector not supported - DOM manipulation will fail');
    }
    
    if (!HTMLAudioElement || !HTMLVideoElement) {
        issues.push('HTML5 media elements not supported');
    }
    
    if (issues.length > 0) {
        console.warn('Browser compatibility issues detected:', issues);
        return false;
    }
    
    return true;
}

// Main initialization
function init() {
    // Check browser support first
    if (!checkBrowserSupport()) {
        console.error('Browser does not support required features');
        if (dom.titleElement) {
            dom.titleElement.textContent = 'Browser not supported';
        }
        return;
    }
    
    // Verify critical DOM elements
    if (!dom.titleElement || !dom.subtitleElement) {
        console.error('Critical DOM elements not found - page may not work correctly');
        // Wait a bit and try again (in case of timing issues)
        setTimeout(() => {
            if (dom.titleElement && dom.subtitleElement) {
                console.log('DOM elements found on retry, continuing initialization');
                init();
            }
        }, 100);
        return;
    }
    
    try {
        // Initialize logo (same for all languages)
        updateLogo();

        // Initialize audio event listeners (DOM is ready since scripts are at bottom of body)
        initAudioListeners();

        // Initialize flag icon for default language
        updateFlagIcon('de');
        
        // Set initial global language
        currentLanguage = 'de';
        window.currentLanguage = 'de';

        // Initialize with default language
        updateLanguage('de').catch(err => {
            console.error('Error initializing language:', err);
        });
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// Start the application
// Scripts are at bottom of body, so DOM is ready
init();


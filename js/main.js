// Main initialization
function init() {
    // Initialize logo (same for all languages)
    updateLogo();

    // Initialize audio event listeners (DOM is ready since scripts are at bottom of body)
    initAudioListeners();

    // Initialize flag icon for default language
    updateFlagIcon('en');

    // Initialize with default language
    updateLanguage('en').catch(err => {
        console.error('Error initializing language:', err);
    });
}

// Start the application
// Scripts are at bottom of body, so DOM is ready
init();


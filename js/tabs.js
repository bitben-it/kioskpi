// Tab functionality
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    if (tabName === 'videos') {
        dom.tabVideos.classList.add('active');
        dom.contentVideos.classList.add('active');
    } else {
        dom.tabAudios.classList.add('active');
        dom.contentAudios.classList.add('active');
    }
}

// Initialize tab event listeners
if (dom.tabVideos && dom.tabAudios) {
    dom.tabVideos.addEventListener('click', () => switchTab('videos'));
    dom.tabAudios.addEventListener('click', () => switchTab('audios'));
}


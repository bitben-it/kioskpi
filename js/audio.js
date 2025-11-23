// Default audio player functionality
function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateAudioDuration() {
    const audioEl = document.getElementById('default-audio');
    if (!audioEl || !dom.audioDurationElement) return;
    
    const currentTime = audioEl.currentTime || 0;
    const duration = audioEl.duration;
    
    if (duration && isFinite(duration)) {
        dom.audioDurationElement.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    } else {
        dom.audioDurationElement.textContent = `${formatTime(currentTime)} / 0:00`;
    }
}

function toggleDefaultAudio() {
    const audioEl = document.getElementById('default-audio');
    if (!audioEl) {
        console.error('Audio element not found');
        return;
    }
    
    if (!dom.audioPlayBtn) {
        console.error('Audio play button not found');
        return;
    }

    const playIcon = dom.audioPlayBtn.querySelector('.play-icon');
    const pauseIcon = dom.audioPlayBtn.querySelector('.pause-icon');

    console.log('Toggle audio - paused:', audioEl.paused, 'src:', audioEl.src, 'readyState:', audioEl.readyState, 'currentSrc:', audioEl.currentSrc);

    if (audioEl.paused) {
        // Check both src and currentSrc
        if (!audioEl.src && !audioEl.currentSrc) {
            console.error('No audio source set. Audio element:', audioEl);
            console.error('Audio element HTML:', audioEl.outerHTML);
            // Try to reload from current language
            const content = CONTENT[window.currentLanguage || 'en'];
            if (content && content.defaultAudio) {
                console.log('Attempting to reload audio:', content.defaultAudio);
                updateDefaultAudio(content.defaultAudio);
                // Wait a bit then try again
                setTimeout(() => {
                    if (audioEl.src || audioEl.currentSrc) {
                        // Stop all other media before playing
                        if (typeof stopAllMedia === 'function') {
                            stopAllMedia(audioEl);
                        }
                        audioEl.play().then(() => {
                            console.log('Audio playing successfully after reload');
                            dom.audioPlayBtn.classList.add('playing');
                            if (playIcon) playIcon.style.display = 'none';
                            if (pauseIcon) pauseIcon.style.display = 'inline-block';
                        }).catch(err => {
                            console.error('Error playing audio after reload:', err);
                        });
                    }
                }, 100);
            }
            return;
        }
        // Stop all other media before playing
        if (typeof stopAllMedia === 'function') {
            stopAllMedia(audioEl);
        }
        
        audioEl.play().then(() => {
            console.log('Audio playing successfully');
            dom.audioPlayBtn.classList.add('playing');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'inline-block';
        }).catch(err => {
            console.error('Error playing audio:', err);
            console.error('Audio src:', audioEl.src);
            console.error('Audio currentSrc:', audioEl.currentSrc);
            console.error('Audio readyState:', audioEl.readyState);
            console.error('Audio networkState:', audioEl.networkState);
        });
    } else {
        audioEl.pause();
        dom.audioPlayBtn.classList.remove('playing');
        if (playIcon) playIcon.style.display = 'inline-block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
}

function updateDefaultAudio(audioPath) {
    const audioEl = document.getElementById('default-audio');
    if (!audioEl || !audioPath) return;

    console.log('Updating default audio to:', audioPath);
    
    // Pause current audio if playing
    if (!audioEl.paused) {
        audioEl.pause();
    }
    
    // Ensure download is disabled
    audioEl.controlsList = 'nodownload';
    
    // Remove all previous event listeners
    audioEl.onerror = null;
    audioEl.onloadedmetadata = null;
    audioEl.oncanplay = null;
    audioEl.ontimeupdate = null;
    
    // Add play event listener to stop other media
    audioEl.removeEventListener('play', handleDefaultAudioPlay);
    audioEl.addEventListener('play', handleDefaultAudioPlay);
    
    // Add error handler
    audioEl.onerror = function(e) {
        console.error('Error loading audio:', audioPath, e);
        if (audioEl.error) {
            console.error('Error code:', audioEl.error.code);
            console.error('Error message:', audioEl.error.message);
        }
    };
    
    // Add success handlers
    audioEl.onloadedmetadata = function() {
        console.log('Audio metadata loaded:', audioPath, 'duration:', audioEl.duration);
        updateAudioDuration();
    };
    
    audioEl.oncanplay = function() {
        console.log('Audio can play:', audioPath);
        updateAudioDuration();
    };
    
    // Update duration display on time updates
    audioEl.ontimeupdate = function() {
        updateAudioDuration();
    };
    
    // Set source and load
    console.log('Setting audio src to:', audioPath);
    audioEl.src = audioPath;
    audioEl.load();
    console.log('Audio src after setting:', audioEl.src);
    
    // Reset button state
    if (dom.audioPlayBtn) {
        dom.audioPlayBtn.classList.remove('playing');
        const playIcon = dom.audioPlayBtn.querySelector('.play-icon');
        const pauseIcon = dom.audioPlayBtn.querySelector('.pause-icon');
        if (playIcon) playIcon.style.display = 'inline-block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
}

// Initialize audio event listeners
function initAudioListeners() {
    // Initialize audio ended event
    const audioEl = document.getElementById('default-audio');
    if (audioEl) {
        // Remove existing listeners if any, then add new ones
        audioEl.removeEventListener('ended', handleAudioEnded);
        audioEl.removeEventListener('timeupdate', handleTimeUpdate);
        audioEl.addEventListener('ended', handleAudioEnded);
        audioEl.addEventListener('timeupdate', handleTimeUpdate);
    }

    // Add click handler to play button
    const audioPlayBtn = document.getElementById('audio-play-btn');
    if (audioPlayBtn) {
        // Remove existing listener if any to avoid duplicates
        audioPlayBtn.removeEventListener('click', toggleDefaultAudio);
        audioPlayBtn.addEventListener('click', toggleDefaultAudio);
        console.log('Audio play button click handler attached');
    } else {
        console.error('Audio play button not found when trying to add click handler');
    }
}

// Handle time update to show current playback time
function handleTimeUpdate() {
    updateAudioDuration();
}

// Handle default audio play event - stop all other media
function handleDefaultAudioPlay() {
    if (typeof stopAllMedia === 'function') {
        stopAllMedia(document.getElementById('default-audio'));
    }
}

// Handle audio ended event
function handleAudioEnded() {
    const btn = document.getElementById('audio-play-btn');
    if (btn) {
        btn.classList.remove('playing');
        const playIcon = btn.querySelector('.play-icon');
        const pauseIcon = btn.querySelector('.pause-icon');
        if (playIcon) playIcon.style.display = 'inline-block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
}


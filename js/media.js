// Media control: ensure only one media plays at a time
let currentlyPlayingMedia = null;

function stopAllMedia(exceptElement = null) {
    // Stop default audio
    const defaultAudio = document.getElementById('default-audio');
    if (defaultAudio && defaultAudio !== exceptElement && !defaultAudio.paused) {
        defaultAudio.pause();
        // Update button state
        if (dom.audioPlayBtn) {
            dom.audioPlayBtn.classList.remove('playing');
            const playIcon = dom.audioPlayBtn.querySelector('.play-icon');
            const pauseIcon = dom.audioPlayBtn.querySelector('.pause-icon');
            if (playIcon) playIcon.style.display = 'inline-block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
    }
    
    // Stop all videos
    const allVideos = document.querySelectorAll('video.media-player');
    allVideos.forEach(video => {
        if (video !== exceptElement && !video.paused) {
            video.pause();
        }
    });
    
    // Stop all audios in the grid
    const allAudios = document.querySelectorAll('audio.media-player');
    allAudios.forEach(audio => {
        if (audio !== exceptElement && !audio.paused) {
            audio.pause();
        }
    });
    
    currentlyPlayingMedia = exceptElement;
}

// Media grid functions for videos and audios
function updateVideosGrid(videos) {
    if (!dom.videosGrid) return;
    
    dom.videosGrid.innerHTML = '';
    if (videos.length === 0) {
        dom.videosGrid.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">No videos available</p>';
        return;
    }

    videos.forEach((video) => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        
        const videoEl = document.createElement('video');
        videoEl.className = 'media-player';
        videoEl.controls = true;
        // Disable download
        videoEl.controlsList = 'nodownload';
        videoEl.disablePictureInPicture = true;
        
        const source = document.createElement('source');
        source.src = video.src;
        source.type = 'video/mp4';
        videoEl.appendChild(source);
        
        // Add play event listener to stop other media
        videoEl.addEventListener('play', function() {
            stopAllMedia(videoEl);
        });
        
        // Force reload to load new source
        videoEl.load();
        
        const label = document.createElement('div');
        label.className = 'media-label';
        label.textContent = video.label;

        mediaItem.appendChild(videoEl);
        mediaItem.appendChild(label);
        dom.videosGrid.appendChild(mediaItem);
    });
}

function updateAudiosGrid(audios) {
    if (!dom.audiosGrid) {
        console.error('audiosGrid element not found');
        return;
    }
    
    dom.audiosGrid.innerHTML = '';
    if (audios.length === 0) {
        dom.audiosGrid.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">No audios available</p>';
        return;
    }

    console.log('Creating audio table with', audios.length, 'audios');

    // Create table structure for audios
    const table = document.createElement('table');
    table.className = 'audios-table';
    
    audios.forEach((audio, index) => {
        console.log('Adding audio', index, ':', audio.label, audio.src);
        
        const row = document.createElement('tr');
        row.className = 'audio-row';
        
        // Title cell (left)
        const titleCell = document.createElement('td');
        titleCell.className = 'audio-title-cell';
        titleCell.textContent = audio.label;
        
        // Player cell (right)
        const playerCell = document.createElement('td');
        playerCell.className = 'audio-player-cell';
        
        const audioEl = document.createElement('audio');
        audioEl.className = 'media-player';
        audioEl.controls = true;
        audioEl.preload = 'metadata';
        // Disable download
        audioEl.controlsList = 'nodownload';
        
        const source = document.createElement('source');
        source.src = audio.src;
        source.type = 'audio/mpeg';
        audioEl.appendChild(source);
        
        // Add play event listener to stop other media
        audioEl.addEventListener('play', function() {
            stopAllMedia(audioEl);
        });
        
        // Force reload to load new source
        audioEl.load();
        
        playerCell.appendChild(audioEl);
        
        row.appendChild(titleCell);
        row.appendChild(playerCell);
        table.appendChild(row);
    });
    
    console.log('Appending table to audiosGrid');
    dom.audiosGrid.appendChild(table);
    console.log('Table appended, audiosGrid innerHTML length:', dom.audiosGrid.innerHTML.length);
}


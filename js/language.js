// Language switching and POI info loading
let currentLanguage = 'en';

// Update flag icon function
function updateFlagIcon(lang) {
    const flagImage = document.getElementById('flag-image');
    if (flagImage && FLAG_PATHS[lang]) {
        const flagPath = FLAG_PATHS[lang];
        console.log('Updating flag to:', flagPath, 'for language:', lang);
        flagImage.src = flagPath;
        flagImage.alt = `${lang} flag`;
        // Handle missing flag files gracefully
        flagImage.onerror = function() {
            console.warn(`Flag icon not found: ${flagPath}, using default`);
            // You can set a default flag here if needed
            // this.src = "assets/icon-flags/us.svg"; // fallback to US flag
        };
    } else {
        console.warn('Flag image element not found or no flag path for language:', lang);
    }
}

// Load POI info from JSON file
async function loadPoiInfo(jsonPath) {
    try {
        console.log('Loading POI info from:', jsonPath);
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Successfully loaded POI info:', data);
        return data;
    } catch (error) {
        console.error('Error loading POI info from', jsonPath, ':', error);
        // Return fallback data
        return {
            title: 'Point of Interest',
            subtitle: 'Information',
            description: `Unable to load information from ${jsonPath}. Please check the file exists and the path is correct.`
        };
    }
}

// Language update function
async function updateLanguage(lang) {
    try {
        currentLanguage = lang;
        const content = CONTENT[lang];
        
        if (!content) {
            console.error('No content found for language:', lang);
            return;
        }
        
        // Update flag icon
        updateFlagIcon(lang);
        
        // Update UI labels
        if (dom.languageLabelElement) {
            dom.languageLabelElement.textContent = content.languageLabel;
        }
        if (dom.tabVideos) {
            dom.tabVideos.textContent = content.tabVideos;
        }
        if (dom.tabAudios) {
            dom.tabAudios.textContent = content.tabAudios;
        }

        // Load POI info from JSON
        console.log('Loading POI info for language:', lang);
        const poiInfo = await loadPoiInfo(content.infoJson);
        console.log('Loaded POI info:', poiInfo);
        
        if (dom.titleElement) {
            dom.titleElement.textContent = poiInfo.title || 'Point of Interest';
        }
        if (dom.subtitleElement) {
            dom.subtitleElement.textContent = poiInfo.subtitle || '';
        }
        if (dom.descriptionShortElement && dom.descriptionFullElement) {
            updateDescription(
                poiInfo.description || '',
                content.showMore,
                content.showLess
            );
        }

        // Update image slider
        if (dom.sliderWrapper && dom.sliderDots) {
            updateImageSlider(content.images);
        }

        // Update default audio
        if (content.defaultAudio) {
            updateDefaultAudio(content.defaultAudio);
        } else {
            console.warn('Default audio not set for language:', lang);
        }

        // Update media grids
        if (dom.videosGrid) {
            updateVideosGrid(content.videos);
        }
        if (dom.audiosGrid) {
            updateAudiosGrid(content.audios);
        }
    } catch (error) {
        console.error('Error in updateLanguage:', error);
    }
}

// Initialize language selector
if (dom.languageSelect) {
    dom.languageSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        // Update flag immediately when language changes
        updateFlagIcon(selectedLang);
        updateLanguage(selectedLang).catch(err => {
            console.error('Error updating language:', err);
        });
    });
}


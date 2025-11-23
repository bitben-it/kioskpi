// DOM element references
const dom = {
    logoElement: document.getElementById('logo'),
    languageSelect: document.getElementById('language-select'),
    titleElement: document.getElementById('title'),
    subtitleElement: document.getElementById('subtitle'),
    descriptionShortElement: document.getElementById('description-short'),
    descriptionFullElement: document.getElementById('description-full'),
    showMoreBtn: document.getElementById('show-more-btn'),
    languageLabelElement: document.getElementById('language-label'),
    defaultAudioElement: document.getElementById('default-audio'),
    audioPlayBtn: document.getElementById('audio-play-btn'),
    audioDurationElement: document.getElementById('audio-duration'),
    sliderWrapper: document.getElementById('slider-wrapper'),
    sliderDots: document.getElementById('slider-dots'),
    sliderPrev: document.getElementById('slider-prev'),
    sliderNext: document.getElementById('slider-next'),
    videosGrid: document.getElementById('videos-grid'),
    audiosGrid: document.getElementById('audios-grid'),
    tabVideos: document.getElementById('tab-videos'),
    tabAudios: document.getElementById('tab-audios'),
    contentVideos: document.getElementById('content-videos'),
    contentAudios: document.getElementById('content-audios')
};

// Verify critical elements exist
if (!dom.titleElement || !dom.subtitleElement || !dom.descriptionShortElement || !dom.descriptionFullElement) {
    console.error('Critical DOM elements not found!');
}


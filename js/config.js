// Configuration constants and content data
const LOGO_PATH = "dh-logo-2-white.svg";

// Global current language variable (accessible from all modules)
let currentLanguage = 'de';

// Flag icon paths for each language
const FLAG_PATHS = {
    en: "assets/icon-flags/us.svg",
    de: "assets/icon-flags/de.svg",
    sl: "assets/icon-flags/si.svg",
    it: "assets/icon-flags/it.svg", // Note: if this file doesn't exist, will use fallback
    es: "assets/icon-flags/es.svg",
    fr: "assets/icon-flags/fr.svg",
    zh: "assets/icon-flags/cn.svg"
};

const CONTENT = {
    en: {
        infoJson: "assets/en/info.json",
        defaultAudio: "assets/en/audio/default.mp3",
        languageLabel: "Language:",
        tabVideos: "Videos",
        tabAudios: "Audios",
        showMore: "Show more",
        showLess: "Show less",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/en/video/video_1.mp4", label: "Castle Overview" },
            { src: "assets/en/video/video_2.mp4", label: "Interior Tour" }
        ],
        audios: [
            { src: "assets/en/audio/audio_1.mp3", label: "History Narration" },
            { src: "assets/en/audio/audio_2.mp3", label: "Architecture Guide" }
        ]
    },
    de: {
        infoJson: "assets/de/info.json",
        defaultAudio: "assets/de/audio/default.mp3",
        languageLabel: "Sprache:",
        tabVideos: "Videos",
        tabAudios: "Audios",
        showMore: "Mehr anzeigen",
        showLess: "Weniger anzeigen",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/de/video/video_1.mp4", label: "Burg-Übersicht" },
            { src: "assets/de/video/video_2.mp4", label: "Innenrundgang" }
        ],
        audios: [
            { src: "assets/de/audio/audio_1.mp3", label: "Geschichtserzählung" },
            { src: "assets/de/audio/audio_2.mp3", label: "Architekturführer" }
        ]
    },
    sl: {
        infoJson: "assets/sl/info.json",
        defaultAudio: "assets/sl/audio/default.mp3",
        languageLabel: "Jezik:",
        tabVideos: "Videoposnetki",
        tabAudios: "Avdio",
        showMore: "Prikaži več",
        showLess: "Prikaži manj",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/sl/video/video_1.mp4", label: "Pregled gradu" },
            { src: "assets/sl/video/video_2.mp4", label: "Notranji obhod" }
        ],
        audios: [
            { src: "assets/sl/audio/audio_1.mp3", label: "Zgodovinska pripoved" },
            { src: "assets/sl/audio/audio_2.mp3", label: "Vodnik po arhitekturi" }
        ]
    },
    it: {
        infoJson: "assets/it/info.json",
        defaultAudio: "assets/it/audio/default.mp3",
        languageLabel: "Lingua:",
        tabVideos: "Video",
        tabAudios: "Audio",
        showMore: "Mostra di più",
        showLess: "Mostra meno",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/it/video/video_1.mp4", label: "Panoramica del castello" },
            { src: "assets/it/video/video_2.mp4", label: "Tour interno" }
        ],
        audios: [
            { src: "assets/it/audio/audio_1.mp3", label: "Narrazione storica" },
            { src: "assets/it/audio/audio_2.mp3", label: "Guida architettonica" }
        ]
    },
    es: {
        infoJson: "assets/es/info.json",
        defaultAudio: "assets/es/audio/default.mp3",
        languageLabel: "Idioma:",
        tabVideos: "Videos",
        tabAudios: "Audios",
        showMore: "Mostrar más",
        showLess: "Mostrar menos",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/es/video/video_1.mp4", label: "Vista general del castillo" },
            { src: "assets/es/video/video_2.mp4", label: "Recorrido interior" }
        ],
        audios: [
            { src: "assets/es/audio/audio_1.mp3", label: "Narración histórica" },
            { src: "assets/es/audio/audio_2.mp3", label: "Guía arquitectónica" }
        ]
    },
    fr: {
        infoJson: "assets/fr/info.json",
        defaultAudio: "assets/fr/audio/default.mp3",
        languageLabel: "Langue:",
        tabVideos: "Vidéos",
        tabAudios: "Audios",
        showMore: "Voir plus",
        showLess: "Voir moins",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/fr/video/video_1.mp4", label: "Vue d'ensemble du château" },
            { src: "assets/fr/video/video_2.mp4", label: "Visite intérieure" }
        ],
        audios: [
            { src: "assets/fr/audio/audio_1.mp3", label: "Récit historique" },
            { src: "assets/fr/audio/audio_2.mp3", label: "Guide architectural" }
        ]
    },
    zh: {
        infoJson: "assets/zh/info.json",
        defaultAudio: "assets/zh/audio/default.mp3",
        languageLabel: "语言:",
        tabVideos: "视频",
        tabAudios: "音频",
        showMore: "显示更多",
        showLess: "显示更少",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg",
            "assets/image3.jpg"
        ],
        videos: [
            { src: "assets/zh/video/video_1.mp4", label: "城堡概览" },
            { src: "assets/zh/video/video_2.mp4", label: "内部游览" }
        ],
        audios: [
            { src: "assets/zh/audio/audio_1.mp3", label: "历史叙述" },
            { src: "assets/zh/audio/audio_2.mp3", label: "建筑指南" }
        ]
    }
};


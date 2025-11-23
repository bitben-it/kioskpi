# Point of Interest Kiosk

A minimal static website for presenting points of interest with multimedia content and multi-language support. Designed to run on a Raspberry Pi in kiosk mode.

## Features

- **Logo Placeholder**: Museum/organization logo in the top left corner
- **Point of Interest Presentation**: Title, subtitle, and description for each location
- **Image Slider**: Automatic slideshow with navigation controls
- **Tabbed Media**: Separate tabs for Videos and Audios
- **Multi-language Support**: Switch between English and German (easily extensible)
- **Language Switcher**: Positioned in the top right corner
- **Language-Specific Folders**: Media files organized by language (e.g., `assets/en/`, `assets/de/`)
- **Multiple Media Files**: Support for multiple videos and audios per language
- **Dark Theme**: Optimized for kiosk displays
- **Responsive Design**: Works on small Raspberry Pi screens
- **No External Dependencies**: Works completely offline

## Project Structure

```
.
├── index.html          # Main HTML file (contains all CSS and JavaScript)
├── assets/             # Media files directory
│   ├── logo.png        # Museum/organization logo (optional)
│   ├── image1.jpg      # Image for slider
│   ├── image2.jpg      # Image for slider
│   ├── image3.jpg      # Image for slider
│   ├── en/             # English language folder
│   │   ├── info.json   # POI information (title, subtitle, description)
│   │   ├── video/      # Video subfolder
│   │   │   ├── video_1.mp4
│   │   │   └── video_2.mp4
│   │   └── audio/      # Audio subfolder
│   │       ├── audio_1.mp3
│   │       └── audio_2.mp3
│   └── de/             # German language folder
│       ├── info.json   # POI information (title, subtitle, description)
│       ├── video/      # Video subfolder
│       │   ├── video_1.mp4
│       │   └── video_2.mp4
│       └── audio/      # Audio subfolder
│           ├── audio_1.mp3
│           └── audio_2.mp3
└── README.md          # This file
```

## Setup

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial media kiosk"
```

### 2. Add Media Files

Copy your media files to the `assets/` directory:

**Logo** (optional):
- `assets/logo.png` - Museum or organization logo (will show placeholder if not provided)

**Images** (for the slider):
- `assets/image1.jpg`
- `assets/image2.jpg`
- `assets/image3.jpg`
- (Add as many as needed)

**POI Information JSON Files**:

Create `info.json` files in each language folder with the following structure:

```json
{
  "title": "Historic Castle",
  "subtitle": "A Medieval Wonder",
  "description": "This magnificent castle stands as a testament to <strong>medieval architecture</strong> and history. Built in the <em>12th century</em>, it has witnessed centuries of history...<br><br>You can use <strong>HTML tags</strong> like &lt;strong&gt;, &lt;em&gt;, &lt;br&gt; for formatting."
}
```

**Note**: The description supports HTML formatting. If the description is longer than 300 characters, a "Show more" button will automatically appear.

**Language-Specific Folders with Media Type Subfolders**:

Create language folders with `video/` and `audio/` subfolders:

**English** (`assets/en/`):
- `assets/en/info.json` - POI information
- `assets/en/video/video_1.mp4`, `assets/en/video/video_2.mp4`, ...
- `assets/en/audio/audio_1.mp3`, `assets/en/audio/audio_2.mp3`, ...

**German** (`assets/de/`):
- `assets/de/info.json` - POI information
- `assets/de/video/video_1.mp4`, `assets/de/video/video_2.mp4`, ...
- `assets/de/audio/audio_1.mp3`, `assets/de/audio/audio_2.mp3`, ...

### 3. Customize Content

**POI Information**: Edit the `info.json` files in each language folder (`assets/en/info.json`, `assets/de/info.json`, etc.) to customize:
- Title
- Subtitle
- Description (supports HTML formatting like `<strong>`, `<em>`, `<br>`)

**Media Configuration**: Edit the `CONTENT` object in `index.html` to customize:
- Logo path (set to `null` or empty string to show placeholder)
- Image paths for the slider
- Video and audio file paths with labels (using language-specific folders)
- Number of media files per language
- Button labels for "Show more" / "Show less"

**Note**: 
- POI information (title, subtitle, description) is loaded from JSON files
- Media files are organized in language-specific folders with `video/` and `audio/` subfolders
- Descriptions longer than 300 characters automatically show a "Show more" button

## Running on Raspberry Pi

### 1. Start a Web Server

From the project directory, start a simple HTTP server:

```bash
python3 -m http.server 8080
```

Alternatively, you can use a different port if 8080 is already in use.

### 2. Open in Chromium (Kiosk Mode)

To open in full-screen kiosk mode:

```bash
chromium --kiosk http://localhost:8080
```

Or to open in a regular browser window:

```bash
chromium http://localhost:8080
```

### 3. Auto-start on Boot (Optional)

To automatically start the kiosk on boot, you can add the commands to your Raspberry Pi's autostart configuration or create a systemd service.

## Adding More Languages

To add additional languages, edit the `CONTENT` object in `index.html`:

```javascript
const CONTENT = {
    en: { ... },
    de: { ... },
    fr: {  // Example: French
        logo: "assets/logo.png",  // Optional: set to null for placeholder
        title: "Château Historique",
        subtitle: "Une Merveille Médiévale",
        description: "Description en français...",
        languageLabel: "Langue:",
        tabVideos: "Vidéos",
        tabAudios: "Audios",
        images: [
            "assets/image1.jpg",
            "assets/image2.jpg"
        ],
        showMore: "Voir plus",
        showLess: "Voir moins",
        videos: [
            { src: "assets/fr/video/video_1.mp4", label: "Vue d'ensemble" }
        ],
        audios: [
            { src: "assets/fr/audio/audio_1.mp3", label: "Narration" }
        ]
    }
};
```

Then:
1. Add a new `<option>` to the language selector in the HTML
2. Create the language folder with subfolders (e.g., `assets/fr/video/` and `assets/fr/audio/`)
3. Create `assets/fr/info.json` with title, subtitle, and description
4. Add corresponding media files to the appropriate subfolders
5. Update the `CONTENT` object with the new language configuration including `showMore` and `showLess` labels

## Features

### Image Slider

The image slider automatically cycles through images every 5 seconds. Users can:
- Click the left/right arrows to navigate manually
- Click the dots at the bottom to jump to a specific image
- Manual navigation resets the auto-slide timer

### Description with Show More

- Descriptions support HTML formatting (e.g., `<strong>`, `<em>`, `<br>`)
- If a description exceeds 300 characters, a "Show more" button appears
- Clicking "Show more" expands to show the full description with all HTML formatting
- Clicking "Show less" collapses back to the truncated version

## Browser Compatibility

This project uses standard HTML5 audio and video elements, compatible with:
- Chromium/Chrome
- Firefox
- Safari
- Edge

## License

This is a minimal project template. Use as needed.


# Flags can be downloaded here:

https://flagicons.lipis.dev/
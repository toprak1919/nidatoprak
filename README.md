# May 5 Magic — Happy Birthday, My Love

A beautiful, mobile-first birthday microsite that creates a special experience for a loved one.

## Features

- **Countdown Timer**: Counts down to midnight Ankara-time on May 5th
- **Birthday Greeting**: Full-screen confetti and animated birthday message
- **Memory Lane Gallery**: Horizontal, snap-scroll gallery of memories
- **Sunflower Garden**: Interactive petals that transform into sunflowers
- **Love Notes**: Themed birthday quotes from favorite shows
- **Whisper Section**: Animated text with purple mist background
- **Quotes Carousel**: Philosophy-flavored birthday quotes
- **120-Year Journey Timeline**: Vertical timeline of future milestones
- **No-Distance Map**: Interactive map showing the physical distance between you
- **Shared Sunrise**: Shows the sunrise in both locations
- **Music Player**: Integrated Spotify playlist
- **Video Toast**: Button to launch a video call for a birthday toast

## Technologies Used

This project uses vanilla JavaScript with several libraries (no frameworks):

- GSAP for animations
- Canvas Confetti for the celebration effect
- Mapbox for the interactive map
- Modern CSS with flexbox and grid layouts

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An internet connection for loading external libraries and maps

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/birthday-microsite.git
   ```

2. Navigate to the project directory:
   ```
   cd birthday-microsite
   ```

3. Open `index.html` in your browser or use a local development server:
   ```
   npx serve .
   ```

### Customization

1. **Spotify Playlist**: Replace `YOUR_PLAYLIST_ID` in the iframe URL in `index.html` with your own playlist ID
2. **Images**: Replace the placeholder images in `assets/images/` with your own photos
3. **Locations**: Update the coordinates in `js/map.js` to reflect your actual locations
4. **Personal Details**: Customize texts, quotes, and timeline events in `index.html`

## Development Notes

### File Structure

- `index.html`: Main HTML structure
- `css/styles.css`: All styles for the application
- `js/`: JavaScript files separated by functionality
  - `main.js`: Core functionality
  - `countdown.js`: Birthday countdown
  - `animations.js`: GSAP animations
  - `gallery.js`: Memory gallery functionality
  - `map.js`: Map functionality
- `assets/`: All static assets
  - `images/`: Photos and images
  - `audio/`: Sound effects
  - `svg/`: SVG files for graphics

### Adding Audio

For a complete experience, add these audio files to the `assets/audio/` directory:
- `whoosh.mp3`: Sound for blowing out candles
- `heartbeat.mp3`: Heartbeat sound for various interactions
- `pop.mp3`: Sound for sunflower creation
- `camera.mp3`: Sound for adding a new memory

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all the library creators
- Inspiration from [Hover States](https://hoverstat.es/) for creative web design
- And most importantly, to the special person who inspired this project 
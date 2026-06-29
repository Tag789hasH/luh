// Gather DOM Elements
const playButton = document.getElementById('play-button');
const coverScreen = document.getElementById('cover-screen');
const lyricLines = document.querySelectorAll('.lyric-line');
const lyricsBox = document.getElementById('lyrics-box');
const audioTrack = document.getElementById('bg-music');

let currentLineIndex = 0;
let lyricInterval = null;

// Function to run the lyric engine transitions
function startLyricEngine() {
  lyricInterval = setInterval(() => {
    // 1. Remove active focus state from the finished line
    lyricLines[currentLineIndex].classList.remove('active');
    
    // 2. Head down to the next row sequence
    currentLineIndex = (currentLineIndex + 1) % lyricLines.length;
    
    // 3. Apply high-focus active status to next line
    const nextLine = lyricLines[currentLineIndex];
    nextLine.classList.add('active');
    
    // 4. Smooth scroll calculation adjustment
    const offsetTop = nextLine.offsetTop;
    lyricsBox.style.transform = `translateY(-${offsetTop - 100}px)`;
  }, 4000); 
}

// Event handler for clicking the play button
function handleStartExperience() {
  // Autoplay track instantly on connection interaction
  if (audioTrack) {
    audioTrack.play().catch(error => {
      console.log("Audio playback was deferred by device rules:", error);
    });
  }

  // Melts away the entrance splash view
  coverScreen.style.opacity = '0';
  coverScreen.style.pointerEvents = 'none';
  
  // Kick off tracking timing updates safely
  setTimeout(() => {
    startLyricEngine();
  }, 650);
}

// Attach listener to click action
playButton.addEventListener('click', handleStartExperience);

// Smooth scroll to music section when the 'Listen Now' button is clicked
document.querySelector('.btn').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#music').scrollIntoView({ behavior: 'smooth' });
});

// Getting elements for play/pause buttons and audio controls
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const audioControls = document.querySelector('.audio-controls');
const featuredMusic = document.querySelector('.featured-music');
const textSection = document.querySelector('.text-section'); // Section where text color changes

// Function to update background, audio control styles, and text color during play/pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playBtn.style.display = 'none';  // Hide play button
        pauseBtn.style.display = 'block';  // Show pause button

        // Change background and apply blur effect
        featuredMusic.style.backgroundImage = 'url("path-to-new-background.jpeg")';  // Update background
        audioControls.classList.add('blur');  // Add blur and white background to the controls

        // Change text color to white (when playing)
        textSection.style.color = 'white';

        // Add the 'playing' class to change text color to black
        featuredMusic.classList.add('playing');
    } else {
        audio.pause();
        pauseBtn.style.display = 'none';  // Hide pause button
        playBtn.style.display = 'block';  // Show play button

        // Reset background and remove blur effect
        featuredMusic.style.backgroundImage = 'url("artist-image2.jpeg")';  // Reset to default background
        audioControls.classList.remove('blur');  // Remove the blur effect from the controls

        // Change text color to black (when paused)
        textSection.style.color = 'black';

        // Remove the 'playing' class to revert text color to white
        featuredMusic.classList.remove('playing');
    }
}

// Play/Pause functionality when buttons are clicked
playBtn.addEventListener('click', togglePlayPause);
pauseBtn.addEventListener('click', togglePlayPause);

// JavaScript to change background when audio starts playing
audio.addEventListener('play', function() {
    document.querySelector('.featured-music').style.backgroundImage = "url('P CHILD.JPG')";
    document.querySelector('.featured-music').classList.add('playing'); // Add 'playing' class when music starts
    textSection.style.color = 'white'; // Change text to white when playing
});

// Optionally, you can also add a reset when the music stops:
audio.addEventListener('pause', function() {
    document.querySelector('.featured-music').style.backgroundImage = "";
    document.querySelector('.featured-music').classList.remove('playing'); // Remove 'playing' class when music is paused
    textSection.style.color = 'black'; // Change text to black when paused
});

// This can also apply when the music ends:
audio.addEventListener('ended', function() {
    document.querySelector('.featured-music').style.backgroundImage = "";
    document.querySelector('.featured-music').classList.remove('playing'); // Remove 'playing' class when music ends
    textSection.style.color = 'black'; // Change text to black when music ends
});

// Create an audio context and analyser for visualizer (optional beat tracker)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Set up the analyser (frequency range, smoothing, etc.)
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Function to update beat tracker based on frequency data
function updateBeatTracker() {
    analyser.getByteFrequencyData(dataArray);

    // Get the sum of all frequency values (this represents the overall intensity)
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }

    // Calculate an average frequency intensity and update the beat tracker width accordingly
    const intensity = sum / bufferLength;
    const widthPercentage = (intensity / 255) * 100;

    // Set the width of the beat tracker based on the intensity
    document.getElementById('beat-tracker').style.width = `${widthPercentage}%`;

    // Repeat the animation
    requestAnimationFrame(updateBeatTracker);
}

// Play the audio and start the visualizer when it's played
audio.addEventListener('play', function() {
    audioContext.resume().then(() => {
        updateBeatTracker();  // Start the beat tracker when audio plays
    });
});
// Function to update background, audio control styles, and text color during play/pause
function togglePlayPause() {
    const textSection = document.querySelector('.featured-music');

    if (audio.paused) {
        audio.play();
        playBtn.style.display = 'none';  // Hide play button
        pauseBtn.style.display = 'block';  // Show pause button

        // Change background and apply blur effect
        featuredMusic.style.backgroundImage = 'url("path-to-new-background.jpeg")';  // Update background
        audioControls.classList.add('blur');  // Add blur and white background to the controls

        // Change text color to white (when playing)
        textSection.style.color = 'white';

        // Add the 'playing' class to change text color to white
        featuredMusic.classList.add('playing');
    } else {
        audio.pause();
        pauseBtn.style.display = 'none';  // Hide pause button
        playBtn.style.display = 'block';  // Show play button

        // Reset background and remove blur effect
        featuredMusic.style.backgroundImage = 'url("artist-image2.jpeg")';  // Reset to default background
        audioControls.classList.remove('blur');  // Remove the blur effect from the controls

        // Change text color to black (when paused)
        textSection.style.color = 'black';

        // Remove the 'playing' class to revert text color to black
        featuredMusic.classList.remove('playing');
    }
}

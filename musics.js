// Create an array of songs with details (name, image, track, title)
const songsArray = [
    {
        name: "Problem Child.mp3", 
        image: "P CHILD.jpg", 
        title: "Problem Child", 
        track: "Track 1"
    },
    {
        name: "SOUL MATE.mp3", 
        image: "soulmate.PNG", 
        title: "SoulMate", 
        track: "Track 2"
    },
    {
        name: "I-DO.mp3", 
        image: "I-DO.PNG", 
        title: "I Do", 
        track: "Track 3"
    },
    // Add more songs here by following the same structure
    
   
    {
        name: "Olormachi.mp3", 
        image: "Olormachi.PNG", 
        title: "Olormachi", 
        track: "Track 4"
    },
    {
        name: "Balance it.mp3", 
        image: "Balance-it.PNG", 
        title: "Balance it", 
        track: "Track 5"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const playerContainer = document.querySelector('.player-container'); // Get the player container element
    let currentAudio = null;

    // Dynamically add songs from the array to the HTML
    songsArray.forEach((song, index) => {
        // Create the song div dynamically
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        songDiv.setAttribute('data-song', song.name);
        songDiv.setAttribute('data-image', song.image);
        songDiv.setAttribute('data-title', song.title);
        songDiv.setAttribute('data-track', song.track);

        // Only add the elements that have valid content, no empty placeholders
        songDiv.innerHTML = `
            <div class="album-art">
                <img src="${song.image}" alt="Album Art" id="albumImage${index + 1}">
                <div class="track-info">
                    <p id="trackNumber${index + 1}">${song.track}</p>
                    <p id="songTitle${index + 1}">${song.title}</p>
                </div>
                <video id="videoPlayer${index + 1}" width="100%" loop>
                    <source src="beattracker.mp4" type="video/mp4">
                    Your browser does not support the video element.
                </video>
            </div>
            <audio controls>
                <source src="${song.name}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
            <p>${song.track} - ${song.title}</p>
        `;

        // Append the new song to the player container
        playerContainer.appendChild(songDiv);

        // Handle audio play and video synchronization
        const audioElement = songDiv.querySelector('audio');
        const videoPlayer = songDiv.querySelector('video');
        const albumImage = songDiv.querySelector('img');
        const trackNumber = songDiv.querySelector('.track-info p:first-child');
        const songTitle = songDiv.querySelector('.track-info p:last-child');

        // Add event listener for when the song starts playing
        audioElement.addEventListener('play', () => {
            // Stop the previous audio if it's playing
            if (currentAudio && currentAudio !== audioElement) {
                currentAudio.pause();
                currentAudio.currentTime = 0; // Reset the previous track to start from the beginning
            }

            // Update album art and track info
            albumImage.src = song.image;
            trackNumber.textContent = song.track; // Set the track number
            songTitle.textContent = song.title; // Set the song title

            // Play the video with the audio
            videoPlayer.play();
            videoPlayer.currentTime = 0; // Reset the video to start from the beginning
            videoPlayer.loop = true; // Loop the video

            // Update the current audio to the new one
            currentAudio = audioElement;
        });

        // Optional: Hide the album art div when the song is paused or ends
        audioElement.addEventListener('pause', () => {
            videoPlayer.pause(); // Pause the video
        });

        audioElement.addEventListener('ended', () => {
            videoPlayer.pause(); // Pause the video
        });
    });
});
// Gallery data as objects in an array
const galleryItems = [
    {
        type: 'artist-image1.jpeg',  // "image" or "video"
        source: 'program1.jpg',
        alt: 'Program 1 Image',
        title: 'Program 1 - Picture'
    },
    {
        type: 'video',  // "image" or "video"
        source: 'performance1.mp4',
        alt: 'Program 1 Video',
        title: 'Program 1 - Video'
    },
    {
        type: 'artist-image2.jpeg',  // "image" or "video"
        source: 'artist-image2.jpeg',
        alt: 'Program 2 Image',
        title: 'Program 2 - Picture'
    },
    {
        type: 'video',  // "image" or "video"
        source: 'performance2.mp4',
        alt: 'Program 2 Video',
        title: 'Program 2 - Video'
    }
    // You can add more items as needed
];

// Function to render the gallery items dynamically
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');

    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        let mediaElement;

        if (item.type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.src = item.source;
            mediaElement.alt = item.alt;
        } else if (item.type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.width = '100%';
            mediaElement.controls = true;
            
            const source = document.createElement('source');
            source.src = item.source;
            source.type = 'video/mp4';
            mediaElement.appendChild(source);
        }

        // Append the media element (image or video) to the gallery item
        galleryItem.appendChild(mediaElement);

        // Create and append the title
        const title = document.createElement('p');
        title.textContent = item.title;
        galleryItem.appendChild(title);

        // Append the gallery item to the gallery grid
        galleryGrid.appendChild(galleryItem);
    });
}

// Call the function to render the gallery when the page loads
window.onload = renderGallery;

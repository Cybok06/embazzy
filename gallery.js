// Home button functionality
function goHome() {
    alert("Going HomePage...");
    window.location.href = "/";
}

// Scroll-triggered animation for images
const images = document.querySelectorAll('.gallery-img');

const handleScroll = () => {
    images.forEach((img) => {
        const imgPosition = img.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (imgPosition < windowHeight - 150) {
            img.parentElement.classList.add('scroll-in-view');
        }
    });
};

window.addEventListener('scroll', handleScroll);

// Trigger initial check for images on load
handleScroll();

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const shareBtn = document.querySelector('.share-btn');

document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src; // Set clicked image as lightbox image
    });
});

// Close lightbox when clicked on close button
function closeLightbox() {
    lightbox.style.display = "none";
}

// Share image URL functionality
function shareImage() {
    const imageUrl = lightboxImg.src;
    
    // Copy to clipboard
    navigator.clipboard.writeText(imageUrl).then(() => {
        alert('Image URL copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

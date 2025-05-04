// Memory Lane Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up snap scrolling for gallery
    initSnapScrolling();
    
    // Add enhanced hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Add parallax tilt effect
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Calculate rotation values based on mouse position
            const tiltX = ((y - 0.5) * 10).toFixed(2); // Vertical tilt
            const tiltY = ((x - 0.5) * -10).toFixed(2); // Horizontal tilt
            
            // Apply the 3D transformation
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
            
            // Adjust the shadow to follow the tilt
            this.style.boxShadow = `
                ${tiltY * -0.5}px ${tiltX * -0.5}px 15px rgba(138, 43, 226, 0.3),
                0 0 20px rgba(138, 43, 226, 0.2)
            `;
            
            // Enhance photo effect
            const photo = this.querySelector('.photo');
            if (photo) {
                photo.style.filter = 'brightness(1.1) contrast(1.05)';
                photo.style.transform = `translateZ(20px) scale(1.02)`;
            }
        });
        
        // Reset on mouse leave
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(138, 43, 226, 0.2)';
            
            const photo = this.querySelector('.photo');
            if (photo) {
                photo.style.filter = 'none';
                photo.style.transform = 'translateZ(0) scale(1)';
            }
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            // Create a heart explosion effect on click
            const heart = document.createElement('div');
            heart.className = 'heart-explosion';
            this.appendChild(heart);
            
            // Remove after animation completes
            setTimeout(() => {
                if (heart && heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1000);
            
            // Play a soft sound
            const audio = new Audio('assets/audio/heartbeat.mp3');
            if (audio) {
                audio.volume = 0.2;
                audio.play().catch(e => console.log('Audio play failed:', e));
            }
            
            // Vibrate device if supported
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
    
    // Special effect for Nida's name
    animateNidasName();
});

// Initialize snap scrolling for the gallery
function initSnapScrolling() {
    const galleryContainer = document.querySelector('.gallery-container');
    const gallery = document.querySelector('.gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryContainer || !gallery || !galleryItems.length) return;
    
    // Add indicator dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-dots';
    galleryContainer.after(dotsContainer);
    
    galleryItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'gallery-dot active' : 'gallery-dot';
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', function() {
            const targetItem = galleryItems[index];
            galleryContainer.scrollLeft = targetItem.offsetLeft - (galleryContainer.clientWidth / 2) + (targetItem.clientWidth / 2);
        });
    });
    
    // Update dots on scroll
    let debounceTimeout;
    galleryContainer.addEventListener('scroll', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function() {
            // Find the item most visible in the viewport
            let closestItem = null;
            let closestDistance = Infinity;
            
            galleryItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const containerCenter = galleryContainer.getBoundingClientRect().left + galleryContainer.clientWidth / 2;
                const distance = Math.abs(center - containerCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = index;
                }
            });
            
            // Update active dot
            const dots = document.querySelectorAll('.gallery-dot');
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[closestItem]) {
                dots[closestItem].classList.add('active');
            }
        }, 100);
    });
}

// Debounce function to limit scroll events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Add a new memory to the gallery
function addNewMemory() {
    // Simulate file upload with a placeholder for now
    // In a real implementation, this would open a file picker and upload to a service like Cloudinary
    
    const gallery = document.querySelector('.gallery');
    const addMemoryBtn = document.querySelector('.add-memory');
    
    if (!gallery || !addMemoryBtn) return;
    
    // Create a new memory item
    const newMemory = document.createElement('div');
    newMemory.className = 'gallery-item';
    
    // Generate a random placeholder image URL from Unsplash
    const randomId = Math.floor(Math.random() * 1000);
    const placeholderImage = `https://source.unsplash.com/random/300x400?sunflower,purple&sig=${randomId}`;
    
    // Create the HTML structure
    newMemory.innerHTML = `
        <div class="photo" style="background-image: url('${placeholderImage}')"></div>
        <div class="caption">Your next beautiful memory</div>
    `;
    
    // Insert the new memory before the add button
    gallery.insertBefore(newMemory, addMemoryBtn);
    
    // Scroll to the new memory with animation
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        setTimeout(() => {
            galleryContainer.scrollLeft = newMemory.offsetLeft - 50;
        }, 100);
    }
    
    // Play a sound effect
    const audio = new Audio('assets/audio/camera.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Vibrate the device if supported (mobile)
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
    }
}

// Function to animate Nida's name
function animateNidasName() {
    // Get all strong tags that contain Nida's name
    const nidaElements = document.querySelectorAll('strong');
    
    // Initialize with the highlight class
    nidaElements.forEach(el => {
        el.classList.add('highlight-name');
    });
    
    // Add a subtle heartbeat effect when hovering over gallery
    const gallerySection = document.getElementById('memory-lane');
    if (gallerySection) {
        gallerySection.addEventListener('mouseenter', () => {
            // Intensify the glow on all Nida mentions
            nidaElements.forEach(el => {
                el.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.9)';
            });
        });
        
        gallerySection.addEventListener('mouseleave', () => {
            // Return to normal glow
            nidaElements.forEach(el => {
                el.style.textShadow = '';
            });
        });
    }
} 
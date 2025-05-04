// Animations using GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Set initial states for ribbons
        gsap.set('.ribbon.top', { y: 0 });
        gsap.set('.ribbon.right', { x: 0 });
        gsap.set('.ribbon.bottom', { y: 0 });
        gsap.set('.ribbon.left', { x: 0 });
        
        // Register ScrollTrigger plugin if available
        if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate gift wrap ribbons
            ScrollTrigger.create({
                trigger: '#gift-wrap',
                start: 'top 70%',
                onEnter: () => {
                    gsap.to('.ribbon.top', { y: -100, duration: 1.5, ease: 'power4.out' });
                    gsap.to('.ribbon.right', { x: 100, duration: 1.5, ease: 'power4.out', delay: 0.2 });
                    gsap.to('.ribbon.bottom', { y: 100, duration: 1.5, ease: 'power4.out', delay: 0.4 });
                    gsap.to('.ribbon.left', { x: -100, duration: 1.5, ease: 'power4.out', delay: 0.6 });
                    
                    // Trigger confetti after ribbons animation
                    setTimeout(() => {
                        if (typeof confetti === 'function') {
                            confetti({
                                particleCount: 100,
                                spread: 70,
                                origin: { y: 0.6 }
                            });
                        }
                    }, 1000);
                }
            });
            
            // Animate whisper words
            ScrollTrigger.create({
                trigger: '#whisper',
                start: 'top 60%',
                onEnter: () => animateWhisperWords()
            });
            
            // Animate timeline items
            gsap.from('.timeline-item', {
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 70%'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.3
            });
            
            // Animate love notes
            gsap.from('.note-card', {
                scrollTrigger: {
                    trigger: '.masonry-grid',
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2
            });
        }
    }
    
    // Initialize sunflower petals animation
    initSunflowerPetals();
    
    // Add tap event for sunflower garden
    const sunflowerGarden = document.getElementById('sunflower-garden');
    if (sunflowerGarden) {
        sunflowerGarden.addEventListener('click', function(e) {
            // Only respond to clicks directly on the garden section, not on existing sunflowers
            if (e.target.id === 'sunflower-garden' || e.target.id === 'petals-container') {
                createSunflower(e.clientX, e.clientY);
            }
        });
    }
});

// Animate whisper words sequentially
function animateWhisperWords() {
    const words = document.querySelectorAll('.word');
    if (words.length === 0) return;
    
    // Function to animate each word
    function animateWord(index) {
        if (index >= words.length) return;
        
        // Remove active class from all words
        words.forEach(word => word.classList.remove('active'));
        
        // Add active class to current word
        words[index].classList.add('active');
        
        // Set timeout for next word or restart
        const delay = index === words.length - 1 ? 4000 : 2000;
        setTimeout(() => {
            if (index === words.length - 1) {
                // Keep the final word visible
                return;
            }
            animateWord(index + 1);
        }, delay);
    }
    
    // Start animation with first word
    animateWord(0);
}

// Initialize falling sunflower petals
function initSunflowerPetals() {
    const petalsContainer = document.getElementById('petals-container');
    if (!petalsContainer) return;
    
    // Create sunflower petal SVG
    function createPetalSVG() {
        return `
        <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C6.71573 0 0 6.71573 0 15C0 6.71573 6.71573 0 15 0Z" fill="#FFC107"/>
            <path d="M15 0C23.2843 0 30 6.71573 30 15C23.2843 15 15 6.71573 15 0Z" fill="#FFC107"/>
        </svg>
        `;
    }
    
    // Add petals at random positions
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = createPetalSVG();
        
        // Set random position and animation delay
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 20}s`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        petalsContainer.appendChild(petal);
    }
}

// Create a sunflower at the clicked position
function createSunflower(x, y) {
    const petalsContainer = document.getElementById('petals-container');
    if (!petalsContainer) return;
    
    // Create sunflower SVG
    const sunflower = document.createElement('div');
    sunflower.className = 'sunflower';
    sunflower.innerHTML = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Petals -->
        <g class="petals">
            ${Array(12).fill().map((_, i) => 
                `<path d="M100 100 L100 30 Q120 0 140 30 L100 100" 
                fill="#FFC107" transform="rotate(${i * 30} 100 100)"/>`
            ).join('')}
        </g>
        <!-- Center -->
        <circle cx="100" cy="100" r="30" fill="#8A2BE2"/>
        <circle cx="100" cy="100" r="25" fill="#6A0DAD"/>
    </svg>
    `;
    
    // Set initial position at click point
    sunflower.style.left = `${x}px`;
    sunflower.style.top = `${y}px`;
    
    // Add to container
    petalsContainer.appendChild(sunflower);
    
    // Animate to edge with GSAP if available
    if (typeof gsap !== 'undefined') {
        // Determine edge to animate to
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        let targetX, targetY;
        
        // Find nearest edge
        const distToLeft = x;
        const distToRight = windowWidth - x;
        const distToTop = y;
        const distToBottom = windowHeight - y;
        
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
        
        if (minDist === distToLeft) {
            targetX = -40;
            targetY = y;
        } else if (minDist === distToRight) {
            targetX = windowWidth + 40;
            targetY = y;
        } else if (minDist === distToTop) {
            targetX = x;
            targetY = -40;
        } else {
            targetX = x;
            targetY = windowHeight + 40;
        }
        
        // Animate to edge
        gsap.to(sunflower, {
            left: targetX,
            top: targetY,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => {
                // Snap to edge
                if (targetX === -40) {
                    gsap.set(sunflower, { left: 0, top: y });
                } else if (targetX === windowWidth + 40) {
                    gsap.set(sunflower, { left: windowWidth - 80, top: y });
                } else if (targetY === -40) {
                    gsap.set(sunflower, { left: x, top: 0 });
                } else {
                    gsap.set(sunflower, { left: x, top: windowHeight - 80 });
                }
                
                // Add slight bounce effect
                gsap.from(sunflower, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'back.out'
                });
            }
        });
    }
    
    // Play sunflower sound
    const audio = new Audio('assets/audio/pop.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Vibrate the device if supported (mobile)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
} 
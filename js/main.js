// Wait for all content to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader when everything is loaded
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Check if it's past midnight on May 5th (Ankara time)
    function isPastMidnightMay5th() {
        // Get current date in Ankara (UTC+3) using reliable method
        const now = new Date();
        const ankaraOffsetHours = 3; // Ankara is UTC+3
        const ankaraTime = new Date(now.getTime() + (ankaraOffsetHours * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000));
        
        // Check if it's May 5th in Ankara time
        return ankaraTime.getUTCMonth() === 4 && ankaraTime.getUTCDate() === 5; // May is month 4 (0-indexed)
    }

    // Show or hide the countdown section based on the date
    const countdownSection = document.getElementById('countdown');
    const heroSection = document.getElementById('hero');
    
    function showBirthdayContent() {
        // It's past midnight on May 5th or password was entered, show the birthday content
        countdownSection.style.display = 'none';
        heroSection.style.display = 'flex';
        
        // Trigger birthday celebration
        startBirthdayCelebration();
    }
    
    if (isPastMidnightMay5th()) {
        showBirthdayContent();
    } else {
        // It's not May 5th yet, show the countdown
        countdownSection.style.display = 'flex';
        heroSection.style.display = 'none';
        
        // Setup password unlock
        const passwordField = document.getElementById('password-field');
        const unlockBtn = document.getElementById('unlock-btn');
        
        if (passwordField && unlockBtn) {
            unlockBtn.addEventListener('click', function() {
                if (passwordField.value.toLowerCase() === 'nida') {
                    // Password is correct, show birthday content
                    showBirthdayContent();
                    
                    // Play celebration sound
                    const audio = new Audio('assets/audio/tada.mp3');
                    audio.volume = 0.5;
                    audio.play().catch(e => console.log('Audio play failed:', e));
                    
                    // Vibrate the device if supported (mobile)
                    if (navigator.vibrate) {
                        navigator.vibrate([100, 50, 100, 50, 200]);
                    }
                } else {
                    // Wrong password, show error
                    passwordField.style.borderColor = 'red';
                    passwordField.classList.add('shake');
                    setTimeout(function() {
                        passwordField.classList.remove('shake');
                        passwordField.style.borderColor = '';
                    }, 500);
                    
                    // Vibrate the device if supported (mobile)
                    if (navigator.vibrate) {
                        navigator.vibrate(100);
                    }
                }
            });
            
            // Also check on Enter key press
            passwordField.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    unlockBtn.click();
                }
                
                // Reset border color on typing
                passwordField.style.borderColor = '';
            });
        }
    }

    // Initialize micro-lines rotation
    initMicroLines();

    // Add cake with candles
    createCake();

    // Initialize heart buttons
    initHeartButtons();

    // Initialize quotes carousel
    initQuotesCarousel();

    // Setup final video toast button
    const videoToastBtn = document.getElementById('video-toast');
    if (videoToastBtn) {
        videoToastBtn.addEventListener('click', function() {
            // This would typically open a video chat room
            alert('Starting Google Meets for our birthday celebration! Let\'s watch our favorite series together.');
            // Vibrate the device if supported (mobile)
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
        });
    }

    // Setup watch sunrise button
    const watchSunriseBtn = document.getElementById('watch-sunrise');
    const sunriseFeeds = document.querySelector('.sunrise-feeds');
    
    if (watchSunriseBtn && sunriseFeeds) {
        watchSunriseBtn.addEventListener('click', function() {
            sunriseFeeds.classList.toggle('hidden');
            const sunflowerOverlay = document.querySelector('.sunflower-overlay');
            
            if (!sunriseFeeds.classList.contains('hidden')) {
                // Simulate sunrise by gradually increasing opacity of sunflower overlay
                let opacity = 0;
                const interval = setInterval(function() {
                    opacity += 0.01;
                    sunflowerOverlay.style.opacity = opacity;
                    
                    if (opacity >= 0.3) {
                        clearInterval(interval);
                    }
                }, 100);
            }
        });
    }

    // Setup blow candles button - DIRECTLY attach event listener here
    const blowCandlesBtn = document.getElementById('blow-candles');
    if (blowCandlesBtn) {
        // Highlight the button to make it more noticeable
        blowCandlesBtn.classList.add('pulse-btn');
        
        blowCandlesBtn.addEventListener('click', function(e) {
            console.log('Blow candles button clicked');
            e.stopPropagation(); // Prevent event bubbling
            
            // Remove the pulsing animation once clicked
            this.classList.remove('pulse-btn');
            
            // Show a visual cue that the button was clicked
            this.classList.add('clicked');
            
            // Get all flame elements
            const flames = document.querySelectorAll('.flame');
            
            flames.forEach((flame, index) => {
                // Stagger the animation for a more realistic effect
                setTimeout(() => {
                    // Add a brief flicker effect before going out
                    flame.classList.add('blow-out');
                    
                    // Then hide it
                    setTimeout(() => {
                        flame.style.animation = 'none';
                        flame.style.opacity = '0';
                    }, 300);
                }, index * 100);
            });
            
            // Play whoosh sound
            const audio = new Audio('assets/audio/whoosh.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Vibrate the device if supported (mobile)
            if (navigator.vibrate) {
                navigator.vibrate([50, 100, 50]);
            }
            
            // Show a success message
            const cake = document.getElementById('cake');
            if (cake) {
                const message = document.createElement('div');
                message.className = 'wish-message';
                message.textContent = 'Make a wish!';
                message.style.opacity = '0';
                
                cake.parentNode.insertBefore(message, cake.nextSibling);
                
                // Animate the message
                setTimeout(() => {
                    message.style.opacity = '1';
                }, 500);
            }
        });
    }

    // Set up the Birthday Question interactive elements
    function initBirthdayQuestion() {
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const celebrationAnimation = document.getElementById('celebration-animation');
        const addMoreStuffBtn = document.getElementById('add-more-stuff');
        
        if (yesBtn && noBtn) {
            // When "No" button is clicked, make it fall away
            noBtn.addEventListener('click', function() {
                this.classList.add('falling');
                
                // After animation completes, hide the button
                setTimeout(() => {
                    this.style.display = 'none';
                }, 2000);
            });
            
            // When "Yes" button is clicked, show celebration
            yesBtn.addEventListener('click', function() {
                // Highlight the yes button
                this.classList.add('chosen');
                
                // Hide the No button if it's still visible
                if (noBtn.style.display !== 'none') {
                    noBtn.classList.add('falling');
                    setTimeout(() => {
                        noBtn.style.display = 'none';
                    }, 2000);
                }
                
                // Trigger confetti celebration
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }, i * 600);
                }
                
                // Show the celebration content
                if (celebrationAnimation) {
                    celebrationAnimation.classList.remove('hidden');
                    celebrationAnimation.style.opacity = '0';
                    setTimeout(() => {
                        celebrationAnimation.style.opacity = '1';
                    }, 100);
                }
                
                // Play celebration sound
                const audio = new Audio('assets/audio/tada.mp3');
                audio.volume = 0.5;
                audio.play().catch(e => console.log('Audio play failed:', e));
                
                // Vibrate the device if supported (mobile)
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100, 50, 200]);
                }
            });
        }
        
        // "Add More Stuff" button functionality
        if (addMoreStuffBtn) {
            addMoreStuffBtn.addEventListener('click', function() {
                // Create a popup to add more content
                const popupContainer = document.createElement('div');
                popupContainer.className = 'popup-container';
                
                const popup = document.createElement('div');
                popup.className = 'popup';
                popup.innerHTML = `
                    <h3>Add to Our Journey</h3>
                    <p>What else would you like to add to our future plans?</p>
                    <textarea id="new-plan-text" placeholder="Type your idea here..."></textarea>
                    <div class="popup-buttons">
                        <button id="add-plan-btn" class="btn">Add</button>
                        <button id="close-popup-btn" class="btn">Cancel</button>
                    </div>
                `;
                
                popupContainer.appendChild(popup);
                document.body.appendChild(popupContainer);
                
                // Add event listeners to popup buttons
                const addPlanBtn = document.getElementById('add-plan-btn');
                const closePlanBtn = document.getElementById('close-popup-btn');
                const planTextarea = document.getElementById('new-plan-text');
                
                addPlanBtn.addEventListener('click', function() {
                    if (planTextarea.value.trim() !== '') {
                        // Add the new plan to the list
                        const plansList = document.querySelector('.plans-list');
                        if (plansList) {
                            const newPlan = document.createElement('li');
                            newPlan.textContent = planTextarea.value.trim();
                            newPlan.style.opacity = '0';
                            
                            plansList.appendChild(newPlan);
                            
                            // Animate the new plan appearing
                            setTimeout(() => {
                                newPlan.style.opacity = '1';
                            }, 100);
                        }
                        
                        // Close the popup
                        document.body.removeChild(popupContainer);
                    }
                });
                
                closePlanBtn.addEventListener('click', function() {
                    document.body.removeChild(popupContainer);
                });
            });
        }
    }
    
    // Initialize the birthday question functionality
    initBirthdayQuestion();

    // Initialize the Spotify player toggle for mobile
    function initSpotifyPlayerToggle() {
        const musicPlayer = document.getElementById('music-player');
        const playerToggle = document.querySelector('.player-toggle');
        
        if (musicPlayer && playerToggle) {
            playerToggle.addEventListener('click', function() {
                musicPlayer.classList.toggle('expanded');
                
                // Change the icon based on state
                this.textContent = musicPlayer.classList.contains('expanded') ? '✕' : '🎵';
                
                // Vibrate the device if supported (mobile)
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
            
            // Check if it's mobile view
            function checkMobileView() {
                if (window.innerWidth <= 480) {
                    // Make sure it starts collapsed on mobile
                    musicPlayer.classList.remove('expanded');
                    playerToggle.textContent = '🎵';
                } else {
                    // On larger screens, always show expanded
                    musicPlayer.classList.add('expanded');
                }
            }
            
            // Call once on load
            checkMobileView();
            
            // And check whenever window is resized
            window.addEventListener('resize', checkMobileView);
        }
    }
    
    // Initialize the Spotify player toggle
    initSpotifyPlayerToggle();
});

// Start the birthday celebration
function startBirthdayCelebration() {
    // Trigger confetti
    if (typeof confetti === 'function') {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
                })
            );
            confetti(
                Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
                })
            );
        }, 250);
    }
}

// Create cake with candles
function createCake() {
    const cake = document.getElementById('cake');
    if (!cake) return;
    
    // Add sunflower cake image
    const cakeImg = document.createElement('img');
    cakeImg.src = 'assets/images/Sunflowercake.webp';
    cakeImg.alt = 'Sunflower Birthday Cake';
    cakeImg.style.width = '100%';
    cakeImg.style.height = '100%';
    cakeImg.style.objectFit = 'contain';
    cake.appendChild(cakeImg);
    
    // Add candles on top of the image
    const numCandles = 10;
    const cakeWidth = 250; // Estimated width of the cake in pixels
    const spacing = cakeWidth / (numCandles + 1); // Even spacing
    
    for (let i = 0; i < numCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        
        // Position candles evenly across the top of the cake
        const leftPos = 25 + spacing * (i + 1); // Start at 25px and space evenly
        candle.style.left = `${leftPos}px`;
        candle.style.top = '5px'; // Position at the very top of the cake
        
        // Add flame
        const flame = document.createElement('div');
        flame.className = 'flame';
        candle.appendChild(flame);
        
        cake.appendChild(candle);
    }
}

// Initialize rotating micro-lines
function initMicroLines() {
    const microLines = document.querySelectorAll('.micro-line');
    if (microLines.length === 0) return;
    
    let currentIndex = 0;
    microLines[currentIndex].classList.add('active');
    
    setInterval(function() {
        microLines[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % microLines.length;
        microLines[currentIndex].classList.add('active');
    }, 6000);
}

// Initialize heart buttons in love notes
function initHeartButtons() {
    const heartBtns = document.querySelectorAll('.heart-btn');
    
    heartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            // Play heartbeat sound
            const audio = new Audio('assets/audio/heartbeat.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Vibrate the device if supported (mobile)
            if (navigator.vibrate) {
                navigator.vibrate([50, 30, 100]);
            }
        });
    });
}

// Initialize quotes carousel
function initQuotesCarousel() {
    const slides = document.querySelectorAll('.quote-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !dotsContainer || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Create dots
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
        
        // Add click event to dots
        dot.addEventListener('click', function() {
            showSlide(parseInt(this.dataset.index));
        });
    }
    
    // Add click events to buttons
    prevBtn.addEventListener('click', function() {
        showSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showSlide(currentIndex + 1);
    });
    
    // Function to show slide
    function showSlide(index) {
        // Handle overflow
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Hide current slide
        slides[currentIndex].classList.remove('active');
        document.querySelector(`.dot[data-index="${currentIndex}"]`).classList.remove('active');
        
        // Show new slide
        slides[index].classList.add('active');
        document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Auto-rotate slides
    setInterval(function() {
        showSlide(currentIndex + 1);
    }, 8000);
} 
// Countdown Timer
document.addEventListener('DOMContentLoaded', function() {
    // Get countdown elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Micro-lines elements
    const microLines = document.querySelectorAll('.micro-line');
    let currentLineIndex = 0;
    let microLinesInterval;
    
    // Initialize micro-lines
    function initMicroLines() {
        // Hide all lines initially
        microLines.forEach((line, index) => {
            if (index !== 0) {
                line.style.opacity = '0';
            }
        });
        
        // Set auto-advance interval (every 5 seconds)
        microLinesInterval = setInterval(advanceToNextLine, 5000);
        
        // Setup tap to advance
        const tapNext = document.getElementById('tap-next');
        if (tapNext) {
            tapNext.addEventListener('click', function() {
                // Clear the auto interval and start a new one
                clearInterval(microLinesInterval);
                advanceToNextLine();
                microLinesInterval = setInterval(advanceToNextLine, 5000);
                
                // Add a quick animation to the tap element
                this.classList.add('tapped');
                setTimeout(() => {
                    this.classList.remove('tapped');
                }, 300);
            });
        }
    }
    
    // Function to advance to next line
    function advanceToNextLine() {
        // Hide current line
        if (microLines[currentLineIndex]) {
            microLines[currentLineIndex].style.opacity = '0';
        }
        
        // Advance to next line (loop back to first if at end)
        currentLineIndex = (currentLineIndex + 1) % microLines.length;
        
        // Show next line
        if (microLines[currentLineIndex]) {
            microLines[currentLineIndex].style.opacity = '1';
        }
    }
    
    // Set the target date - May 5th at midnight in Ankara time (UTC+3)
    function getTargetDate() {
        // Create a date object using UTC to ensure consistency
        const now = new Date();
        
        // Get current date in Ankara (UTC+3)
        const ankaraOffsetHours = 3; // Ankara is UTC+3
        const currentAnkaraDate = new Date(now.getTime() + (ankaraOffsetHours * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000));
        
        // Create target date for May 5th midnight in Ankara
        let year = currentAnkaraDate.getUTCFullYear();
        // If we're already past May 5th in Ankara time, increment the year
        if (currentAnkaraDate.getUTCMonth() > 4 || 
            (currentAnkaraDate.getUTCMonth() === 4 && currentAnkaraDate.getUTCDate() >= 5)) {
            year++;
        }
        
        // May 5th midnight in Ankara (UTC+3) - construct from UTC components
        // Month is 0-indexed, so 4 = May
        const targetDate = new Date(Date.UTC(year, 4, 5, -3, 0, 0)); // -3 hours from UTC to get to UTC+3 midnight
        
        return targetDate;
    }
    
    // Update countdown
    function updateCountdown() {
        const targetDate = getTargetDate();
        const currentDate = new Date();
        
        // Calculate time difference in milliseconds
        const timeDiff = targetDate - currentDate;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // Update DOM
        if (daysEl) daysEl.textContent = days < 10 ? `0${days}` : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        // Update the T-minus text with actual seconds
        const tMinusLine = Array.from(microLines).find(line => 
            line.textContent.includes('T-minus [X] seconds'));
            
        if (tMinusLine) {
            const totalSeconds = Math.floor(timeDiff / 1000);
            tMinusLine.textContent = `T-minus ${totalSeconds} seconds until your day begins.`;
        }
        
        // Check if countdown is finished
        if (timeDiff <= 0) {
            clearInterval(countdownInterval);
            clearInterval(microLinesInterval);
            // Refresh the page to show birthday content
            window.location.reload();
        }
        
        // Vibrate on minute change for mobile devices
        if (seconds === 0 && navigator.vibrate) {
            navigator.vibrate(100);
        }
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initial update
    updateCountdown();
    
    // Initialize micro-lines
    initMicroLines();
}); 
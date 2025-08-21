class PregnancyStatus {
    constructor() {
        this.statusData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadStatus();
            this.updateUI();
        } catch (error) {
            console.error('Error loading status:', error);
            this.showError();
        }
    }

    async loadStatus() {
        try {
            const response = await fetch(`status.json?t=${Date.now()}`);
            if (!response.ok) {
                throw new Error('Status file not found');
            }
            this.statusData = await response.json();
        } catch (error) {
            this.statusData = {
                currentStatus: 1,
                lastUpdated: new Date().toISOString(),
                statuses: {
                    1: "Nothing new - All is well! 😊",
                    2: "In Labor - It's starting! 🤱",
                    3: "In the delivery room - Almost there! 👶",
                    4: "Gave birth - Welcome to the world! 🎉"
                }
            };
            console.warn('Using default status data');
        }
    }

    updateUI() {
        const currentStatus = this.statusData.currentStatus;
        const statusInfo = this.statusData.statuses[currentStatus];

        this.updateStatusDisplay(currentStatus, statusInfo);
        this.updateProgressBar(currentStatus);
        this.updateLastUpdated();

        // Show page load celebration for current status
        this.showPageLoadCelebration(currentStatus);

        if (currentStatus === 4) {
            this.showCelebration();
        }
    }

    updateStatusDisplay(currentStatus, statusInfo) {
        const titleElement = document.getElementById('status-title');
        const messageElement = document.getElementById('status-message');

        const titles = {
            1: "Nothing new",
            2: "In Labor!",
            3: "In the delivery room!",
            4: "Baby is here!"
        };

        titleElement.textContent = titles[currentStatus];
        messageElement.textContent = statusInfo;

        titleElement.className = `status-${currentStatus}`;
    }

    updateProgressBar(currentStatus) {
        const steps = document.querySelectorAll('.progress-step');
        const progressFill = document.getElementById('progress-fill');

        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            const circle = step.querySelector('.step-circle');
            
            circle.classList.remove('active', 'completed');
            
            if (stepNumber < currentStatus) {
                circle.classList.add('completed');
            } else if (stepNumber === currentStatus) {
                circle.classList.add('active');
            }
        });

        const progressPercentage = ((currentStatus - 1) / 3) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }

    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('last-updated');
        const lastUpdated = new Date(this.statusData.lastUpdated);
        
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jerusalem'
        };
        
        lastUpdatedElement.textContent = lastUpdated.toLocaleDateString('en-US', options);
    }

    showCelebration() {
        const celebration = document.getElementById('celebration');
        celebration.style.display = 'flex';

        this.createConfetti();

        celebration.addEventListener('click', () => {
            celebration.style.display = 'none';
        });

        setTimeout(() => {
            celebration.style.display = 'none';
        }, 10000);
    }

    createConfetti() {
        const celebration = document.getElementById('celebration');
        const confettiEmojis = ['🎉', '🎊', '👶', '💙', '🌟', '✨'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            celebration.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }

    showPageLoadCelebration(currentStatus) {
        const statusEmojis = {
            1: ['🏠', '😊', '💙', '✨', '🌟'],
            2: ['⏰', '🤱', '💪', '🌟', '✨'],
            3: ['🏥', '👶', '💙', '🌟', '✨'],
            4: ['🎉', '🎊', '👶', '💙', '🌟', '✨', '🎈', '🍼']
        };

        const emojis = statusEmojis[currentStatus] || statusEmojis[1];
        
        // Create explosion effect around the current status circle
        const activeStep = document.querySelector(`.progress-step[data-step="${currentStatus}"]`);
        if (!activeStep) return;

        const stepRect = activeStep.getBoundingClientRect();
        const centerX = stepRect.left + stepRect.width / 2;
        const centerY = stepRect.top + stepRect.height / 2;

        for (let i = 0; i < 15; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random direction and distance for explosion
            const angle = (Math.PI * 2 * i) / 15 + (Math.random() - 0.5) * 0.5;
            const distance = 80 + Math.random() * 120;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            emoji.style.cssText = `
                position: fixed;
                font-size: 24px;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX - 12}px;
                top: ${centerY - 12}px;
                transform: translate(0, 0);
                animation: explode-${i} 3s ease-out forwards;
            `;

            // Create unique animation for each emoji
            const keyframes = `
                @keyframes explode-${i} {
                    0% {
                        transform: translate(0, 0) scale(0.5) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(${endX * 0.7}px, ${endY * 0.7}px) scale(1.2) rotate(${Math.random() * 360}deg);
                        opacity: 0.9;
                    }
                    100% {
                        transform: translate(${endX}px, ${endY}px) scale(0.3) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `;
            
            // Add the keyframes to a style element
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);

            document.body.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
                style.remove();
            }, 3000);
        }
    }

    showError() {
        const titleElement = document.getElementById('status-title');
        const messageElement = document.getElementById('status-message');
        const lastUpdatedElement = document.getElementById('last-updated');
        
        titleElement.textContent = "Unable to load status";
        messageElement.textContent = "Please check back later 😔";
        lastUpdatedElement.textContent = "Error loading data";
    }

    async refresh() {
        await this.loadStatus();
        this.updateUI();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pregnancyStatus = new PregnancyStatus();
    
    // Add click event listener for emoji explosion
    document.addEventListener('click', () => {
        if (pregnancyStatus.statusData) {
            pregnancyStatus.showPageLoadCelebration(pregnancyStatus.statusData.currentStatus);
        }
    });
    
    setInterval(() => {
        pregnancyStatus.refresh();
    }, 30000);
});

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            window.location.reload();
        }
    }
}
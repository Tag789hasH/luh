// Make the "No" button run away on hover with blue sparkle effect
const noBtn = document.getElementById('noBtn');
let moveCount = 0;

if (noBtn) {
    noBtn.addEventListener('mouseover', function(e) {
        moveCount++;
        if (moveCount <= 5) {
            const x = Math.random() * 220 - 110;
            const y = Math.random() * 220 - 110;
            this.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;
        } else {
            this.style.display = 'none';
        }
    });
}

// Global click/cursor sparkle trail generator
document.addEventListener('click', function(e) {
    createGlitterCluster(e.clientX, e.clientY);
});

function createGlitterCluster(x, y) {
    const container = document.getElementById('sparkle-container');
    const symbols = ['✨', '⭐', '💙', '💫', '🌟', '🩵', '💎'];
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'glitter-particle';
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 80;
        
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';
        particle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        
        container.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 2500);
    }
}

// Handle forgiveness with explosive blue bedazzled celebration
function forgive() {
    document.getElementById('buttonsContainer').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    // Create heavy celebration blue hearts and sparkles
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            createCelebrationHeart();
        }, i * 80);
    }
}

function createCelebrationHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['💙', '🩵', '💎', '🌊', '✨', '🌟', '💫'][Math.floor(Math.random() * 7)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.fontSize = (Math.random() * 2.2 + 1) + 'rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 3s cubic-bezier(0.25, 1, 0.5, 1)';
    heart.style.filter = 'drop-shadow(0 0 10px rgba(0, 180, 216, 0.8))';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.top = '-120px';
        heart.style.left = (parseFloat(heart.style.left) + (Math.random() * 30 - 15)) + '%';
        heart.style.opacity = '0';
        heart.style.transform = `rotate(${Math.random() * 360}deg) scale(1.5)`;
    }, 50);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Add floating hearts and sparkling lights to all sections
function addFloatingHearts() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = i % 2 === 0 ? 'heart' : 'sparkle-float';
            heart.innerHTML = ['💙', '🩵', '💎', '✨', '🌟'][Math.floor(Math.random() * 5)];
            heart.style.top = Math.random() * 100 + '%';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            section.appendChild(heart);

  // Automatically attempt to play music on user interaction / click
document.addEventListener('click', function musicAutoplay() {
    const music = document.getElementById('bgMusic');
    if (music && music.paused) {
        music.play().catch(error => {
            console.log("Autoplay blocked until further interaction:", error);
        });
    }
}, { once: true }); // Triggers on the very first click anywhere on the page
            
        }
    });
}

addFloatingHearts();

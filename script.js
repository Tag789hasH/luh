document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enter-btn");
    const overlay = document.getElementById("entry-overlay");
    const mainContent = document.getElementById("main-content");
    const poemSection = document.querySelector(".poem-section");
    const bgMusic = document.getElementById("bg-music");

    // Pre-allocate the canvas and context (optimization)
    const particleCanvas = document.getElementById("particle-canvas");
    const pCtx = particleCanvas.getContext("2d");
    const heartCanvas = document.getElementById("heart-canvas");
    const hCtx = heartCanvas.getContext("2d");

    // Initialize the Bedazzle Systems
    let particles = [];
    let shootingStars = [];
    let hearts = [];
    let isRevealed = false;

    // Resize canvas
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", () => {
        resizeCanvas(particleCanvas);
        resizeCanvas(heartCanvas);
    });
    resizeCanvas(particleCanvas);
    resizeCanvas(heartCanvas);

    // --- Bedazzle System 1: Standard Stars & Shooting Stars ---

    class Particle {
        constructor(isShooting = false) {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            
            if (isShooting) {
                // Shooting Star properties
                this.y = 0; // Starts from top
                this.size = Math.random() * 3 + 1.5;
                this.speedY = Math.random() * 8 + 6; // Fast vertical drift
                this.speedX = (Math.random() - 0.5) * 4; // Slight horizontal swing
                this.life = 0;
                this.maxLife = 100 + Math.random() * 100; // How long it lasts
                this.color = `rgba(254, 205, 211, 0.8)`; // Pinkish Glow
                this.fade = true;
            } else {
                // Background star properties
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 1.5 + 0.2;
                this.speedY = Math.random() * 0.1 + 0.01; // Super slow vertical drift
                this.speedX = (Math.random() - 0.5) * 0.05; // Tiny horizontal swing
                this.color = `rgba(254, 205, 211, ${Math.random() * 0.3 + 0.1})`; // Gentle Rose
                this.fade = false;
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.fade) this.life++;

            // Loop back standard stars
            if (!this.fade && this.y > particleCanvas.height) {
                this.y = 0;
                this.x = Math.random() * particleCanvas.width;
            }
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Handle fading out for shooting stars
            if (this.fade) {
                let currentOpacity = 1 - (this.life / this.maxLife);
                this.color = `rgba(254, 205, 211, ${currentOpacity * 0.8})`;
            }
        }
    }

    // --- Bedazzle System 2: Mouse/Touch Interaction Heart Trail ---

    class HeartParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 3;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.speedY = (Math.random() - 0.5) * 1.5 - 1.5; // Drift UP initially
            this.opacity = 1;
            this.fadeSpeed = 0.015;
            this.color = `rgba(254, 205, 211, ${this.opacity})`; // Soft Rose-gold Heart
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.fadeSpeed;
            this.color = `rgba(254, 205, 211, ${this.opacity})`; // Fade out heart
            this.size *= 0.98; // Shrink as it fades
        }

        draw(ctx) {
            if (this.opacity > 0.01) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.translate(this.x, this.y);
                ctx.scale(this.size / 10, this.size / 10);
                
                // Draw a basic heart shape
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-1.5, -2, -3, 0, 0, 3);
                ctx.bezierCurveTo(3, 0, 1.5, -2, 0, 0);
                ctx.fill();
                
                ctx.restore();
            }
        }
    }

    // --- Core Reveal Logic: Music, Fade, & Pacing ---

    enterBtn.addEventListener("click", () => {
        // Bedazzle Action 1: Start Music
        bgMusic.play().catch(error => {
            console.log("Audio playback blocked:", error);
        });

        // Bedazzle Action 2: Fade out entry screen overlay
        overlay.style.opacity = "0";

        // Bedazzle Action 3: After the entry fade, reveal the poem
        setTimeout(() => {
            overlay.style.display = "none";
            mainContent.classList.remove("hidden");
            mainContent.style.opacity = "1";
            
            // Bedazzle Action 4: Stanza pacing (one by one flow)
            setTimeout(() => {
                const stanzas = document.querySelectorAll('.poem-section p');
                let delay = 0;
                stanzas.forEach((stanza, index) => {
                    if(stanza.className != 'br'){ // ignore <br> tags
                        setTimeout(() => {
                            stanza.style.opacity = '1';
                        }, delay);
                        delay += 3000; // Delay each stanza by 3 seconds
                    }
                });
                isRevealed = true; // Mark as revealed for shooting star frequency increase
            }, 1000); // Small initial delay before poem flow starts
        }, 1500); // Match style.css overlay transition time
    });

    // --- Animation Loops ---

    // 1. Initial Star Setup
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(false));
    }

    // 2. Star Animation (Stars + Shooting Stars)
    function animateStars() {
        pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        // Bedazzle Action: Randomly generate a shooting star
        // Increase probability after poem reveal (isRevealed)
        let shootingProbability = (isRevealed) ? 0.005 : 0.002;
        if (Math.random() < shootingProbability) {
            particles.push(new Particle(true));
        }

        // Draw and update stars/shooting stars
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(pCtx);

            // Special cleanup for shooting stars after they fade
            if (particles[i].fade && (particles[i].life > particles[i].maxLife || particles[i].color.includes('rgba(254, 205, 211, 0)'))) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateStars);
    }
    animateStars();

    // 3. Heart Trail Animation
    function animateHearts() {
        hCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
        
        // Draw and update heart particles
        for (let i = hearts.length - 1; i >= 0; i--) {
            hearts[i].update();
            hearts[i].draw(hCtx);
            if (hearts[i].opacity <= 0) {
                hearts.splice(i, 1);
            }
        }
        requestAnimationFrame(animateHearts);
    }
    animateHearts();

    // --- User Interaction Listeners (for Bedazzle Heart Trail) ---

    function createHeart(e) {
        let x = (e.touches) ? e.touches[0].clientX : e.clientX;
        let y = (e.touches) ? e.touches[0].clientY : e.clientY;
        
        // Create multiple heart particles for a "bloom" effect
        for (let i = 0; i < 3; i++) {
            hearts.push(new HeartParticle(x, y));
        }
    }

    window.addEventListener("mousemove", createHeart);
    window.addEventListener("touchmove", createHeart, { passive: true });
});

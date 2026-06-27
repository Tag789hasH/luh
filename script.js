document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enter-btn");
    const overlay = document.getElementById("entry-overlay");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const equalizer = document.getElementById("equalizer");

    const starCanvas = document.getElementById("star-canvas");
    const sCtx = starCanvas.getContext("2d");
    const heartCanvas = document.getElementById("heart-canvas");
    const hCtx = heartCanvas.getContext("2d");

    let stars = [];
    let hearts = [];
    let isLive = false;

    function resize() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        heartCanvas.width = window.innerWidth;
        heartCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // --- Overlay & Audio Reveal Action ---
    enterBtn.addEventListener("click", () => {
        // Fire up the native local audio file instantly on click
        if (bgMusic) {
            bgMusic.play().catch(e => console.log("Audio kick blocked: ", e));
        }

        // Smoothly fade out overlay
        overlay.style.opacity = "0";
        
        setTimeout(() => {
            overlay.classList.add("hidden");
            mainContent.classList.remove("hidden");
            equalizer.classList.add("playing");
            isLive = true;

            // Staggered smooth line-by-line reveal
            const lines = document.querySelectorAll(".poem-line, .signature");
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = "1";
                }, index * 1200);
            });

        }, 1200);
    });

    // --- Star Particles ---
    class Star {
        constructor(isShooting = false) {
            this.reset(isShooting);
            if (!isShooting) this.y = Math.random() * starCanvas.height;
        }

        reset(isShooting) {
            this.isShooting = isShooting;
            this.x = Math.random() * starCanvas.width;
            this.y = isShooting ? 0 : Math.random() * starCanvas.height;
            this.size = isShooting ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.3;
            this.speedY = isShooting ? Math.random() * 6 + 5 : Math.random() * 0.15 + 0.05;
            this.speedX = isShooting ? (Math.random() - 0.5) * 3 : (Math.random() - 0.5) * 0.05;
            this.alpha = isShooting ? 1 : Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.isShooting) {
                this.alpha -= 0.01;
                if (this.alpha <= 0 || this.y > starCanvas.height) return false;
            } else {
                if (this.y > starCanvas.height) this.y = 0;
            }
            return true;
        }

        draw() {
            sCtx.fillStyle = `rgba(254, 205, 211, ${this.alpha})`;
            sCtx.beginPath();
            sCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            sCtx.fill();
        }
    }

    for (let i = 0; i < 50; i++) stars.push(new Star(false));

    // --- Touch/Mouse Interactive Hearts ---
    class Heart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 7 + 4;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2 - 1;
            this.alpha = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.015;
            this.size *= 0.98;
            return this.alpha > 0;
        }

        draw() {
            hCtx.save();
            hCtx.fillStyle = `rgba(254, 205, 211, ${this.alpha})`;
            hCtx.translate(this.x, this.y);
            hCtx.scale(this.size / 10, this.size / 10);
            hCtx.beginPath();
            hCtx.moveTo(0, 0);
            hCtx.bezierCurveTo(-1.5, -2, -3, 0, 0, 3);
            hCtx.bezierCurveTo(3, 0, 1.5, -2, 0, 0);
            hCtx.fill();
            hCtx.restore();
        }
    }

    function addHearts(e) {
        if (!isLive) return;
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let clientY = e.touches ? e.touches[0].clientY : e.clientY;
        for (let i = 0; i < 2; i++) hearts.push(new Heart(clientX, clientY));
    }
    window.addEventListener("mousemove", addHearts);
    window.addEventListener("touchmove", addHearts, { passive: true });

    // --- Unified Animation Execution Engine ---
    function loop() {
        sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        hCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

        if (isLive && Math.random() < 0.004) {
            stars.push(new Star(true));
        }

        stars = stars.filter(star => {
            let active = star.update();
            if (active) star.draw();
            return active;
        });

        hearts = hearts.filter(heart => {
            let active = heart.update();
            if (active) heart.draw();
            return active;
        });

        requestAnimationFrame(loop);
    }
    loop();
});

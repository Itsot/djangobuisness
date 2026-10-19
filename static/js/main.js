/**
 * Omkar Taru - High-Tech Animated Coming Soon Experience
 * Interactive Particle Canvas, Terminal Typewriter & Micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Interactive Cyber Matrix / Particle Network Canvas
    // -------------------------------------------------------------------------
    const canvas = document.getElementById('cyberCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
        let mouse = { x: null, y: null, radius: 140 };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(0, 245, 255, ' : 'rgba(168, 85, 247, ';
                this.baseAlpha = Math.random() * 0.4 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction repulsion/attraction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 2;
                        this.y -= (dy / dist) * force * 2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.baseAlpha + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles with luminous cyber lines
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.22;
                        ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
                particles[a].update();
                particles[a].draw();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // -------------------------------------------------------------------------
    // 2. Terminal Typewriter Simulation
    // -------------------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriterText');
    if (typewriterElement) {
        const phrases = [
            "Architecting high-performance Android mobile apps...",
            "Deploying scalable Python & Django REST APIs...",
            "Integrating device communication & IoT protocols...",
            "Refining interactive developer portfolio UI...",
            "Launching enhanced release soon..."
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 60;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 65;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2200; // Pause at end of sentence
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400; // Pause before new sentence
            }

            setTimeout(typeLoop, typingSpeed);
        }

        typeLoop();
    }

    // -------------------------------------------------------------------------
    // 3. Cyber Loader Percentage Dynamic Ticker
    // -------------------------------------------------------------------------
    const loadPercent = document.getElementById('loadPercent');
    const loaderFill = document.getElementById('loaderFill');
    if (loadPercent && loaderFill) {
        let currentPercent = 82;
        setInterval(() => {
            if (currentPercent < 95) {
                currentPercent += 1;
                loadPercent.textContent = `${currentPercent}%`;
                loaderFill.style.width = `${currentPercent}%`;
            }
        }, 12000);
    }

    // -------------------------------------------------------------------------
    // 4. Copy Email with Visual Tech Feedback
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailLink = document.getElementById('emailLink');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = "omkar.taru@example.com";
            try {
                await navigator.clipboard.writeText(email);
                const originalHtml = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00ff9d" stroke-width="2.5" width="16" height="16">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                copyEmailBtn.style.color = '#00ff9d';

                const emailText = document.getElementById('emailText');
                if (emailText) emailText.textContent = "Copied to clipboard!";

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHtml;
                    copyEmailBtn.style.color = '';
                    if (emailText) emailText.textContent = "Connect via Email";
                }, 2200);
            } catch (err) {
                console.error("Clipboard error: ", err);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 5. Dynamic Year Fallback
    // -------------------------------------------------------------------------
    const dynYear = document.getElementById('dynYear');
    if (dynYear && !dynYear.textContent.trim()) {
        dynYear.textContent = new Date().getFullYear();
    }
});

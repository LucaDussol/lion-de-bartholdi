// Fonction unique et correcte pour charger un composant
function loadComponent(id, url) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`Erreur chargement ${url}`);
            return res.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;

            // Une fois chargé, si c'est le light-reveal, activer le spotlight
            if (id === "light-reveal") {
                initSpotlightEffect();
            }
        })
        .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("intro", "components/intro.html");
    loadComponent("light-reveal", "components/light-reveal.html");
});
// Étoiles fixes
function createStars() {
    const container = document.getElementById('stars');
    const count = 60;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

// Étoiles filantes
function animateShootingStars() {
    const canvas = document.getElementById('shooting-stars');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function ShootingStar() {
        this.reset = function () {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.len = Math.random() * 80 + 10;
            this.speed = Math.random() * 10 + 6;
            this.angle = Math.PI / 3;
        };
        this.reset();

        this.update = function () {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            if (this.y > canvas.height || this.x > canvas.width) this.reset();
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.shadowColor = 'white';
            ctx.shadowBlur = 5;
            ctx.stroke();
        };
    }

    const stars = Array.from({ length: 2 }, () => new ShootingStar());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.update();
            s.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}



document.addEventListener("DOMContentLoaded", () => {
    createStars();
    animateShootingStars();

    loadComponent("intro", "components/intro.html");
    loadComponent("light-reveal-1", "components/light-reveal-1.html");
    loadComponent("light-reveal-2", "components/light-reveal-2.html");
    loadComponent("light-reveal-3", "components/light-reveal-3.html");
    loadComponent("light-reveal-4", "components/light-reveal-4.html");
    loadComponent("light-reveal-5", "components/light-reveal-5.html");
    loadComponent("light-reveal-6", "components/light-reveal-6.html");

    initAllSpotlightSections();
});




function initAllSpotlightSections() {
    setTimeout(() => {
        const sections = document.querySelectorAll('.light-reveal-section');

        sections.forEach(section => {
            const container = section.querySelector('.spotlight-container');
            const overlay = section.querySelector('.spotlight-overlay');
            const svgTrigger = section.querySelector('.svg-trigger');
            const lampIcon = section.querySelector('.lamp-icon');
            const textOverlay = section.querySelector('.text-overlay');


            if (!container || !overlay || !lampIcon || !svgTrigger) return;

            let isRevealed = false;

            container.addEventListener("mousemove", (e) => {
                if (isRevealed) return;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                overlay.style.setProperty('--x', `${x}px`);
                overlay.style.setProperty('--y', `${y}px`);
            });

            container.addEventListener("mouseleave", () => {
                if (isRevealed) return;
                overlay.style.setProperty('--x', `-1000px`);
                overlay.style.setProperty('--y', `-1000px`);
            });

            svgTrigger.addEventListener("click", () => {
                isRevealed = !isRevealed;

                if (isRevealed) {
                    overlay.style.background = "rgba(0, 0, 0, 0)";
                    lampIcon.src = "../assets/lamp-on.svg";
                    lampIcon.classList.add("glow");
                    if (textOverlay) textOverlay.classList.add("visible");
                } else {
                    overlay.style.background = `radial-gradient(
            circle 350px at var(--x, 50%) var(--y, 50%),
            transparent 0%,
            rgba(0, 0, 0, 0.95) 100%
          )`;
                    lampIcon.src = "../assets/lamp-off.svg";
                    lampIcon.classList.remove("glow");
                    if (textOverlay) textOverlay.classList.remove("visible");
                }
            });
        });
    }, 200);
}




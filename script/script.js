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

function initSpotlightEffect() {
    setTimeout(() => {
        const container = document.querySelector(".spotlight-container");
        const overlay = document.querySelector(".spotlight-overlay");
        const svgTrigger = document.getElementById("reveal-trigger");
        const lampIcon = document.getElementById("lamp-icon");

        let isRevealed = false;

        if (!container || !overlay || !lampIcon) return;

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
            } else {
                overlay.style.background = `radial-gradient(
      circle 100px at var(--x, 50%) var(--y, 50%),
      transparent 0%,
      rgba(0, 0, 0, 0.95) 100%
    )`;
                lampIcon.src = "../assets/lamp-off.svg";
                lampIcon.classList.remove("glow");
            }
        });
    }, 200);
}



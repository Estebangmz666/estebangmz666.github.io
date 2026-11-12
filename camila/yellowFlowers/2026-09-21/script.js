const openGardenButton = document.querySelector("#openGardenButton");
const deployButton = document.querySelector("#deployButton");
const garden = document.querySelector("#garden");
const progressBar = document.querySelector("#progressBar");
const terminalResult = document.querySelector("#terminalResult");
const petalLayer = document.querySelector("#petalLayer");

const flowerEmojis = ["🌻", "🌼", "🌻", "🌻", "🌼"];

function createGarden() {
  if (garden.dataset.ready === "true") {
    return;
  }

  garden.dataset.ready = "true";

  for (let index = 0; index < 24; index += 1) {
    const flower = document.createElement("div");
    flower.className = "flower";

    const left = Math.random() * 94 + 2;
    const scale = 0.65 + Math.random() * 0.8;
    const delay = Math.random() * 0.7;
    const stemHeight = 80 + Math.random() * 180;

    flower.style.left = `${left}%`;
    flower.style.transform = `scale(${scale})`;
    flower.style.animationDelay = `${delay}s`;
    flower.style.setProperty("--stem-height", `${stemHeight}px`);

    flower.innerHTML = `
      <div class="flower__head">${flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)]}</div>
      <div class="flower__stem"></div>
    `;

    garden.appendChild(flower);
  }
}

function revealSections() {
  document.querySelectorAll(".hidden-section").forEach((section) => {
    section.classList.add("visible");
  });
}

function launchPetals(amount = 45) {
  for (let index = 0; index < amount; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = Math.random() > 0.25 ? "🌻" : "💛";

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${4 + Math.random() * 4}s`;
    petal.style.animationDelay = `${Math.random() * 1.4}s`;
    petal.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);

    petalLayer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 9000);
  }
}

openGardenButton.addEventListener("click", () => {
  revealSections();
  createGarden();
  launchPetals(28);

  setTimeout(() => {
    document.querySelector("#gardenSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 350);
});

deployButton.addEventListener("click", () => {
  progressBar.style.width = "100%";
  terminalResult.textContent = "✓ jardín creado correctamente";

  setTimeout(() => {
    launchPetals(70);
    deployButton.textContent = "deployed 🌻";
  }, 1500);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".hidden-section").forEach((section) => {
  sectionObserver.observe(section);
});

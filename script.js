
const stars = document.getElementById("stars");
const petals = document.getElementById("petals");
const overlay = document.getElementById("letterOverlay");
const openButton = document.getElementById("openLetter");
const closeButton = document.getElementById("closeLetter");
const finishButton = document.getElementById("finishLetter");
const moreButton = document.getElementById("moreFlowers");
const toast = document.getElementById("toast");

let toastTimer;
let lastFocusedElement = null;

// Crear estrellas en el cielo
for (let i = 0; i < 65; i++) {
  const star = document.createElement("span");
  star.className = "star";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = (1.5 + Math.random() * 3) + "s";

  const size = 1 + Math.random() * 2.5;
  star.style.width = size + "px";
  star.style.height = size + "px";

  stars.appendChild(star);
}

// Crear un pétalo flotante
function createPetal(x, spread = false) {
  const petal = document.createElement("span");
  petal.className = "petal";

  petal.style.left = x + "%";
  petal.style.animationDuration = (5 + Math.random() * 5) + "s";
  petal.style.setProperty(
    "--drift",
    (Math.random() * 180 - 90) + "px"
  );

  if (spread) {
    petal.style.animationDuration = (2.5 + Math.random() * 2) + "s";
  }

  petals.appendChild(petal);

  // Eliminar elementos cuando terminen su animación
  petal.addEventListener("animationend", () => {
    petal.remove();
  }, { once: true });
}

// Lluvia suave de pétalos
function startPetals() {
  createPetal(Math.random() * 100);

  if (petals.children.length < 45) {
    setTimeout(startPetals, 420 + Math.random() * 500);
  } else {
    setTimeout(startPetals, 900);
  }
}

startPetals();

// Abrir la carta
function openLetter() {
  lastFocusedElement = document.activeElement;

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeButton.focus();
}

// Cerrar la carta
function closeLetter() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

openButton.addEventListener("click", openLetter);
closeButton.addEventListener("click", closeLetter);
finishButton.addEventListener("click", closeLetter);

// Cerrar al pulsar fuera de la carta
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeLetter();
  }
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("open")) {
    closeLetter();
  }
});

// Mostrar un mensaje temporal
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// Lluvia especial de flores al pulsar el botón
moreButton.addEventListener("click", () => {
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      createPetal(Math.random() * 100, true);
    }, i * 90);
  }

  showToast("¡Un montón de flores para ti! 💜");
});

// Mensaje de bienvenida en la consola
console.log("💜 Tu Jardín Violeta está listo.");
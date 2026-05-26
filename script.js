
/* =========================
   Carrusel de problemas
========================= */

let currentSlide = 0;

function moveSlide(direction) {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".slide");

  if (!track || slides.length === 0) return;

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

/* Cambio automático del carrusel */
setInterval(() => {
  const track = document.querySelector(".carousel-track");
  if (track) {
    moveSlide(1);
  }
}, 6000);

/* =========================
   Quiz interactivo
========================= */

function checkAnswer(button, isCorrect) {
  const feedback = document.getElementById("feedback");
  const options = document.querySelectorAll(".option");

  options.forEach(option => {
    option.style.background = "white";
    option.style.color = "#1f2937";
  });

  if (isCorrect) {
    button.style.background = "#dcfce7";
    button.style.color = "#166534";
    feedback.textContent = "✅ Correcto. f(4) = 2(4) + 3 = 11";
    feedback.style.color = "#15803d";
  } else {
    button.style.background = "#fee2e2";
    button.style.color = "#991b1b";
    feedback.textContent = "❌ Revisa el procedimiento. Primero sustituye x por 4.";
    feedback.style.color = "#b91c1c";
  }
}

/* =========================
   Previsualizador de videos propios
========================= */

function previewVideo(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("videoPreview");
  const player = document.getElementById("localVideo");
  const fileName = document.getElementById("fileName");

  if (!file) return;

  const url = URL.createObjectURL(file);
  player.src = url;
  preview.style.display = "block";
  fileName.textContent = "Video seleccionado: " + file.name;
}

/* =========================
   Animación al aparecer elementos
========================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.12 });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card, .example-box, .problem-box, .step, .video-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = ".55s ease";
    observer.observe(el);
  });
});

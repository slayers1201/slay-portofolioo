// Dark Mode Toggle
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    document.body.style.setProperty("--scrollPos", scrollY * -0.2 + "px");

    reveals.forEach((item) => {
        let windowHeight = window.innerHeight;
        let revealTop = item.getBoundingClientRect().top;
        let revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            item.classList.add("active");
        }
    });
});

// COMMENT + RATING SYSTEM
let rating = 0;
document.querySelectorAll(".stars span").forEach((star) => {
    star.addEventListener("click", () => {
        rating = star.getAttribute("data-rating");
        document.querySelectorAll(".stars span").forEach(s => s.style.opacity = 0.3);
        star.style.opacity = 1;
    });
});

document.getElementById("commentForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let comment = document.getElementById("comment").value;

    let box = document.createElement("div");
    box.classList.add("comment-box");
    box.innerHTML = `
        <h4>${name} — ⭐${rating}</h4>
        <p>${comment}</p>
    `;

    document.getElementById("commentList").appendChild(box);

    document.getElementById("commentForm").reset();
});
// LOADING EFFECT
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hide");
    }, 500); // delay biar smooth
});
// Animasi muncul saat scroll
window.addEventListener("scroll", () => {
    const foto = document.querySelector(".slay-photo");
    const pos = foto.getBoundingClientRect().top;
    
    if (pos < window.innerHeight - 100) {
        foto.classList.add("show");
    }
});
// ================= PARTICLE BACKGROUND ======================
const canvas = document.getElementById("particle-bg");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// membuat partikel
for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // bounce
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 120, 200, 0.7)";
        ctx.shadowColor = "rgba(255, 120, 200, 1)";
        ctx.shadowBlur = 12;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
// =================== SLIDER SCRIPT =====================

const wrapper = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
    if (i >= slides.length) index = 0;
    if (i < 0) index = slides.length - 1;

    wrapper.style.transform = `translateX(${-index * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
    index++;
    showSlide(index);
});

document.querySelector(".prev").addEventListener("click", () => {
    index--;
    showSlide(index);
});

// Auto slide
setInterval(() => {
    index++;
    showSlide(index);
}, 4000);
// =============== LIGHTBOX SCRIPT =================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// ambil semua gambar slider
document.querySelectorAll(".slide img").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

// klik luar area → close
lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});
const audio = document.getElementById("bg-music");
const lightningContainer = document.getElementById("lightning-effect");

function createBolt(angleOffset = 0) {
  const bolt = document.createElement("div");
  bolt.classList.add("lightning-bolt");

  const x = Math.random() * window.innerWidth;
  bolt.style.left = `${x}px`;
  bolt.style.top = `0px`;

  // arah cabang
  const angle = (Math.random() * 30 - 15) + angleOffset;
  bolt.style.transform = `rotate(${angle}deg)`;

  lightningContainer.appendChild(bolt);

  setTimeout(() => bolt.remove(), 300);
}

function screenFlash() {
  const flash = document.createElement("div");
  flash.classList.add("flash");
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 250);
}

function screenShake() {
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 600);
}

// saat klik pertama
document.addEventListener("click", () => {
  audio.play().catch(() => {});
  lightningContainer.style.display = "block";

  // 3 petir bercabang (kiri, tengah, kanan)
  setTimeout(() => createBolt(-20), 0);
  setTimeout(() => createBolt(0), 100);
  setTimeout(() => createBolt(20), 150);

  // efek tambahan
  screenFlash();
  screenShake();

}, { once: true });
const title = document.getElementById("slayTitle");
const text = title.textContent.trim();
title.textContent = "";

text.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.animationDelay = `${i * 0.08}s`; 
  title.appendChild(span);
});

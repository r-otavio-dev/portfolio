// Sem framework: eu queria saber exatamente o que acontece na página.
const root = document.documentElement;
const moodButton = document.querySelector(".mood-button");
const cursorLight = document.querySelector(".cursor-light");
const typedCommand = document.querySelector("#typed-command");
const year = document.querySelector("#current-year");
const revealItems = document.querySelectorAll(".reveal");
const pitchSection = document.querySelector(".pitch");
const videoPlayer = document.querySelector("#video-player");
const pitchStatusText = document.querySelector("#pitch-status-text");
const pitchVideoLink = document.querySelector("#pitch-video-link");

const moods = ["default", "deep", "electric"];
let currentMood = 0;

function changeMood() {
  currentMood = (currentMood + 1) % moods.length;
  const mood = moods[currentMood];

  if (mood === "default") {
    delete root.dataset.mood;
    return;
  }

  root.dataset.mood = mood;
}

function followPointer(event) {
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
  cursorLight.classList.add("is-visible");
}

function typeCommand() {
  const text = "bora-resolver --com-calma";
  let position = 0;

  const timer = window.setInterval(() => {
    typedCommand.textContent = text.slice(0, position + 1);
    position += 1;

    if (position === text.length) {
      window.clearInterval(timer);
    }
  }, 58);
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function getYouTubeId(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace("www.", "");

    if (host === "youtu.be") return parsedUrl.pathname.split("/")[1] || null;
    if (!host.endsWith("youtube.com")) return null;

    if (parsedUrl.pathname === "/watch") return parsedUrl.searchParams.get("v");

    const [, type, id] = parsedUrl.pathname.split("/");
    return ["embed", "shorts", "live"].includes(type) ? id || null : null;
  } catch {
    return null;
  }
}

function loadPitchVideo() {
  if (!pitchSection || !videoPlayer) return;

  const url = pitchSection.dataset.youtubeUrl.trim();
  const videoId = getYouTubeId(url);
  if (!videoId) return;

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
  iframe.title = "Pitch profissional de Rodrigo Otavio";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;

  videoPlayer.replaceChildren(iframe);
  pitchSection.classList.add("has-video");
  pitchStatusText.textContent = "vídeo publicado";
  pitchVideoLink.href = url;
  pitchVideoLink.hidden = false;
}

moodButton.addEventListener("click", changeMood);
window.addEventListener("pointermove", followPointer, { passive: true });
window.addEventListener("pointerleave", () => {
  cursorLight.classList.remove("is-visible");
});

year.textContent = new Date().getFullYear();
typeCommand();
revealOnScroll();
loadPitchVideo();

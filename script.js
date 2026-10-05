/* Team SP — carousel, nav, reveal */
const TEAM = [
  { n: "Rohan Mehta",     r: "Video Editor",         f: "Rohan Mehta.png" },
  { n: "Aria Solene",     r: "Social Media Manager", f: "Aria Solene.png" },
  { n: "Aarav Sharma",    r: "Script Writer",        f: "Aarav Sharma.png" },
  { n: "Subodh Premi",    r: "Founder & Team Head",  f: "Subodh Premi.png", head: true },
  { n: "Naysha Singh",    r: "Graphics Designer",    f: "Naysha Singh.png" },
  { n: "Aditya Maurya",   r: "Web & App Developer",  f: "Aditya Maurya.png" },
  { n: "Shanvi Sejal",    r: "AI Specialist",        f: "Shanvi Sejal.png" }
];
const N = TEAM.length;
const $ = (id) => document.getElementById(id);
const src = (f) => encodeURI(f);

/* ---------- Carousel ---------- */
const stage = $("stage"), carousel = $("carousel");
let active = TEAM.findIndex((m) => m.head); // Subodh starts in center
let busy = false;

const cards = TEAM.map((m, i) => {
  const c = document.createElement("div");
  c.className = "card";
  c.innerHTML = `<img src="${src(m.f)}" alt="${m.n}, ${m.r}" draggable="false"><div class="cap"><b>${m.n}</b><span>${m.r}</span></div>`;
  c.addEventListener("click", () => { if (!moved) go(i - active); });
  stage.appendChild(c);
  return c;
});

function render() {
  const w = cards[0].offsetWidth;
  const step = w * (innerWidth < 700 ? 0.82 : 0.78);
  cards.forEach((c, i) => {
    let o = ((i - active) % N + N) % N;       // 0..N-1
    if (o > N / 2) o -= N;                    // shortest wrap: -3..3
    const a = Math.abs(o);
    const max = innerWidth < 700 ? 1 : 2;     // visible each side
    const scale = 1 - a * 0.14;
    c.style.transform = `translateX(calc(-50% + ${o * step}px)) scale(${scale}) translateY(${a ? 14 : 0}px)`;
    c.style.opacity = a > max ? 0 : a === 0 ? 1 : a === 1 ? 0.55 : 0.3;
    c.style.zIndex = 10 - a;
    c.style.pointerEvents = a > max ? "none" : "auto";
    c.classList.toggle("on", a === 0);
    c.setAttribute("aria-hidden", a === 0 ? "false" : "true");
  });
  $("badge").classList.toggle("show", !!TEAM[active].head);
  $("cur").textContent = String(active + 1).padStart(2, "0");
  $("barfill").style.width = ((active + 1) / N) * 100 + "%";
}

function go(d) {
  if (busy || !d) return;
  busy = true;
  active = (active + d + N) % N;
  render();
  setTimeout(() => (busy = false), 350);
}

$("prev").addEventListener("click", () => go(-1));
$("next").addEventListener("click", () => go(1));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === "ArrowRight") go(1);
});

/* Swipe + mouse drag (pointer events) */
let sx = 0, down = false, moved = false;
carousel.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".arrow")) return;
  down = true; moved = false; sx = e.clientX;
  carousel.classList.add("drag");
});
addEventListener("pointermove", (e) => {
  if (down && Math.abs(e.clientX - sx) > 8) moved = true;
});
addEventListener("pointerup", (e) => {
  if (!down) return;
  down = false; carousel.classList.remove("drag");
  const dx = e.clientX - sx;
  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  setTimeout(() => (moved = false), 0);
});
addEventListener("pointercancel", () => { down = false; carousel.classList.remove("drag"); });
addEventListener("resize", render);
render();

/* ---------- Team grid ---------- */
$("tgrid").innerHTML = TEAM.map((m) =>
  `<div class="tcard rv"><img src="${src(m.f)}" alt="${m.n}" loading="lazy"><div><b>${m.n}</b><span>${m.r}</span></div></div>`
).join("");

/* ---------- Mobile menu ---------- */
const burger = $("burger"), menu = $("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("open"); burger.setAttribute("aria-expanded", false);
}));

/* ---------- Scroll reveal + back to top ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

addEventListener("scroll", () => $("totop").classList.toggle("show", scrollY > 600), { passive: true });

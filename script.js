document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".team-track");
  const cards = Array.from(document.querySelectorAll(".member-card"));
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const counter = document.querySelector("#current-slide");

  if (!track || !cards.length) return;

  let currentIndex = 3; // Subodh Premi initially center
  let startX = 0;
  let endX = 0;

  function updateCarousel(animate = true) {
    const card = cards[currentIndex];

    if (!card) return;

    cards.forEach((item, index) => {
      item.classList.remove(
        "active",
        "position-left",
        "position-right",
        "far-left",
        "far-right"
      );

      const distance = index - currentIndex;

      if (distance === 0) {
        item.classList.add("active");
      } else if (distance === -1) {
        item.classList.add("position-left");
      } else if (distance === 1) {
        item.classList.add("position-right");
      } else if (distance < -1) {
        item.classList.add("far-left");
      } else {
        item.classList.add("far-right");
      }
    });

    const gap = 18;
    const cardWidth = card.offsetWidth;

    const moveX =
      currentIndex * (cardWidth + gap) -
      (track.parentElement.offsetWidth - cardWidth) / 2;

    track.style.transition = animate
      ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    track.style.transform = `translateX(${-moveX}px)`;

    if (counter) {
      counter.textContent = String(currentIndex + 1).padStart(2, "0");
    }
  }

  function nextSlide() {
    currentIndex++;

    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  function previousSlide() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = cards.length - 1;
    }

    updateCarousel();
  }

  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", previousSlide);

  // Touch / swipe
  track.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (event) => {
      endX = event.changedTouches[0].clientX;

      const difference = startX - endX;

      if (Math.abs(difference) < 45) return;

      if (difference > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    },
    { passive: true }
  );

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      previousSlide();
    }
  });

  // Recalculate after resize
  window.addEventListener("resize", () => {
    updateCarousel(false);
  });

  // Initial position
  updateCarousel(false);

  // Back to top
  const backToTop = document.querySelector("#backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(
    ".section-heading, .service-card, .capability-card, .team-mini-card, .vision-content, .process-step, .work-card, .contact-inner"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
});

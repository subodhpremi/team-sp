document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // TEAM CAROUSEL
  // =========================

  const track = document.querySelector(".team-track");
  const cards = document.querySelectorAll(".member-card");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const counter = document.querySelector("#current-slide");

  let currentIndex = 3;

  function updateCarousel() {
    if (!cards.length) return;

    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    const activeCard = cards[currentIndex];

    if (activeCard && track) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();

      const move =
        cardRect.left -
        trackRect.left -
        (trackRect.width - cardRect.width) / 2;

      track.scrollBy({
        left: move,
        behavior: "smooth"
      });
    }

    if (counter) {
      counter.textContent = String(currentIndex + 1).padStart(2, "0");
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = cards.length - 1;
      }

      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex++;

      if (currentIndex >= cards.length) {
        currentIndex = 0;
      }

      updateCarousel();
    });
  }


  // =========================
  // SWIPE
  // =========================

  let startX = 0;

  if (track) {

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

        const endX = event.changedTouches[0].clientX;
        const difference = startX - endX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) {
          currentIndex++;

          if (currentIndex >= cards.length) {
            currentIndex = 0;
          }

        } else {
          currentIndex--;

          if (currentIndex < 0) {
            currentIndex = cards.length - 1;
          }
        }

        updateCarousel();
      },
      { passive: true }
    );
  }


  // =========================
  // BACK TO TOP
  // =========================

  const backToTop = document.querySelector("#backToTop");

  if (backToTop) {

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 500) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      },
      { passive: true }
    );

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // =========================
  // NAVBAR SCROLL
  // =========================

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle(
          "scrolled",
          window.scrollY > 30
        );
      },
      { passive: true }
    );
  }


  // =========================
  // SIMPLE SCROLL REVEAL
  // =========================

  const revealElements = document.querySelectorAll(
    ".service-card, " +
    ".capability-card, " +
    ".team-mini-card, " +
    ".vision-image, " +
    ".vision-content, " +
    ".vision-message, " +
    ".process-step, " +
    ".work-card, " +
    ".contact-item"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.08
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("show");
    });

  }


  // Initial state
  updateCarousel();

});

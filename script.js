// ===============================
// TEAM SP — INTERACTIONS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // TEAM CAROUSEL
  // -------------------------------

  const track = document.querySelector(".team-track");
  const cards = document.querySelectorAll(".member-card");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const counter = document.querySelector("#current-slide");

  let currentIndex = 3; // Subodh Premi starts as active

  function updateCarousel() {
    if (!track || !cards.length) return;

    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    const activeCard = cards[currentIndex];

    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
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


  // -------------------------------
  // SWIPE SUPPORT
  // -------------------------------

  let touchStartX = 0;
  let touchEndX = 0;

  if (track) {

    track.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const difference = touchStartX - touchEndX;

    // Ignore very small movements
    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
      // Swipe left
      currentIndex++;

      if (currentIndex >= cards.length) {
        currentIndex = 0;
      }
    } else {
      // Swipe right
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = cards.length - 1;
      }
    }

    updateCarousel();
  }


  // -------------------------------
  // SCROLL REVEAL ANIMATION
  // -------------------------------

  const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .capability-card, " +
    ".team-mini-card, .vision-image, .vision-content, " +
    ".vision-message, .process-step, .work-card, " +
    ".contact-title, .contact-info, .contact-buttons"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // -------------------------------
  // NAVBAR SCROLL EFFECT
  // -------------------------------

  const navbar = document.querySelector(".navbar");

  function handleNavbar() {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbar, {
    passive: true
  });

  handleNavbar();


  // -------------------------------
  // BACK TO TOP
  // -------------------------------

  const backToTop = document.querySelector("#backToTop");

  if (backToTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }

    }, {
      passive: true
    });

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // -------------------------------
  // NAVIGATION LINK ACTIVE EFFECT
  // -------------------------------

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

    });

  });


  // -------------------------------
  // INITIAL CAROUSEL STATE
  // -------------------------------

  updateCarousel();

});

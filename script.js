// Team cards
const cards = document.querySelectorAll(".team-card");

// Buttons
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Counter
const currentNumber = document.getElementById("currentNumber");

// Starting member
let currentIndex = 2;


// Update the carousel
function updateCarousel() {

    cards.forEach((card, index) => {

        // Distance from the active card
        let position = index - currentIndex;

        // Keep positions inside the 5-card range
        if (position > 2) {
            position -= 5;
        }

        if (position < -2) {
            position += 5;
        }


        // Remove old active state
        card.classList.remove("active");


        // Center card
        if (position === 0) {

            card.classList.add("active");

            card.style.transform =
                "translateX(0) scale(1)";

            card.style.opacity = "1";

            card.style.filter = "grayscale(0)";

            card.style.zIndex = "5";
        }


        // Card immediately on the left
        else if (position === -1) {

            card.style.transform =
                "translateX(-170px) scale(.9)";

            card.style.opacity = ".55";

            card.style.filter = "grayscale(1)";

            card.style.zIndex = "3";
        }


        // Card immediately on the right
        else if (position === 1) {

            card.style.transform =
                "translateX(170px) scale(.9)";

            card.style.opacity = ".55";

            card.style.filter = "grayscale(1)";

            card.style.zIndex = "3";
        }


        // Far left
        else if (position === -2) {

            card.style.transform =
                "translateX(-330px) scale(.82)";

            card.style.opacity = ".35";

            card.style.filter = "grayscale(1)";

            card.style.zIndex = "2";
        }


        // Far right
        else if (position === 2) {

            card.style.transform =
                "translateX(330px) scale(.82)";

            card.style.opacity = ".35";

            card.style.filter = "grayscale(1)";

            card.style.zIndex = "2";
        }

    });


    // Update counter
    currentNumber.textContent =
        String(currentIndex + 1).padStart(2, "0");
}



// NEXT BUTTON
nextBtn.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= cards.length) {
        currentIndex = 0;
    }

    updateCarousel();
});


// PREVIOUS BUTTON
prevBtn.addEventListener("click", function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = cards.length - 1;
    }

    updateCarousel();
});


// First load
updateCarousel();

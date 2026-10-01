/* ===============================
   SWAN — Southern Women Academics Network
   Global JavaScript
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile Navigation ---------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Header Scroll Effect ---------- */
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          let count = 0;
          const increment = target / 80;

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  /* ---------- Events Filter ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll(".event-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      eventCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || filter === category) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.5s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ---------- Testimonial Slider ---------- */
  const track = document.querySelector(".testimonial-track");
  const dots = document.querySelectorAll(".dot");

  if (track && dots.length > 0) {
    let currentIndex = 0;
    const totalSlides = dots.length;

    const goToSlide = (index) => {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    };

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goToSlide(i));
    });

    // Auto-advance every 6 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    }, 6000);
  }

  /* ---------- Form Handling (Formspree) ---------- */
  const forms = document.querySelectorAll("form[data-formspree]");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const messageBox = form.querySelector(".form-message");
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          messageBox.className = "form-message success";
          messageBox.textContent =
            "Thank you! Your submission has been received. We will be in touch soon.";
          form.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        messageBox.className = "form-message error";
        messageBox.textContent =
          "Oops! Something went wrong. Please try again or email us directly.";
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
});

/* ---------- Fade In Animation (used by event filter) ---------- */
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
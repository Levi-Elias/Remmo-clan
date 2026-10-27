// ===== Helper functies =====
const formatNum = (num) => String(num).padStart(2, '0');

document.addEventListener('DOMContentLoaded', () => {
  // ===== 1. Mini Intro Slideshow =====
  const introFigure = document.querySelector('.intro-figure');
  if (introFigure) {
    const introSlides = introFigure.querySelectorAll('.intro-slide');
    const introPrev = introFigure.querySelector('.intro-prev');
    const introNext = introFigure.querySelector('.intro-next');
    const introCount = introFigure.querySelector('.intro-count-text');

    if (introSlides.length > 0) {
      let introIndex = 0;
      const totalIntro = introSlides.length;

      function showIntroSlide(index) {
        if (index < 0) {
          introIndex = totalIntro - 1;
        } else if (index >= totalIntro) {
          introIndex = 0;
        } else {
          introIndex = index;
        }

        introSlides.forEach((slide, i) => {
          const isActive = i === introIndex;
          slide.classList.toggle('is-active', isActive);
          slide.setAttribute('aria-hidden', !isActive);
        });

        if (introCount) {
          introCount.textContent = `${formatNum(introIndex + 1)} / ${formatNum(totalIntro)}`;
        }
      }

      // Knoppen bediening
      if (introPrev) {
        introPrev.addEventListener('click', (e) => {
          e.stopPropagation();
          showIntroSlide(introIndex - 1);
        });
      }
      if (introNext) {
        introNext.addEventListener('click', (e) => {
          e.stopPropagation();
          showIntroSlide(introIndex + 1);
        });
      }

      // Klik/tap op de foto om direct naar de volgende te gaan
      introFigure.addEventListener('click', (e) => {
        if (!e.target.closest('.intro-btn')) {
          showIntroSlide(introIndex + 1);
        }
      });

      // Mobile swipe ondersteuning
      let introStartX = 0;
      let introEndX = 0;

      introFigure.addEventListener(
        'touchstart',
        (e) => {
          introStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      introFigure.addEventListener(
        'touchend',
        (e) => {
          introEndX = e.changedTouches[0].screenX;
          const diff = introEndX - introStartX;
          if (diff < -35) {
            showIntroSlide(introIndex + 1);
          } else if (diff > 35) {
            showIntroSlide(introIndex - 1);
          }
        },
        { passive: true }
      );

      showIntroSlide(introIndex);
    }
  }

  // ===== 2. Hoofd Slideshow =====
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');
    const countEl = slideshow.querySelector('.slide-count');

    if (slides.length > 0) {
      let currentIndex = 0;
      const totalSlides = slides.length;

      function showSlide(index) {
        if (index < 0) {
          currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
          currentIndex = 0;
        } else {
          currentIndex = index;
        }

        slides.forEach((slide, i) => {
          const isActive = i === currentIndex;
          slide.classList.toggle('is-active', isActive);
          slide.setAttribute('aria-hidden', !isActive);
        });

        if (countEl) {
          countEl.textContent = `${formatNum(currentIndex + 1)} / ${formatNum(totalSlides)}`;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
      }

      // Mobile First: Touch & Swipe gebaren
      let touchStartX = 0;
      let touchEndX = 0;
      const minSwipeDistance = 40;

      slideshow.addEventListener(
        'touchstart',
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      slideshow.addEventListener(
        'touchend',
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          const diff = touchEndX - touchStartX;
          if (diff < -minSwipeDistance) {
            showSlide(currentIndex + 1);
          } else if (diff > minSwipeDistance) {
            showSlide(currentIndex - 1);
          }
        },
        { passive: true }
      );

      // Toetsenbordnavigatie
      slideshow.setAttribute('tabindex', '0');
      slideshow.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          showSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          showSlide(currentIndex + 1);
        }
      });

      showSlide(currentIndex);
    }
  }
});

// ===== Kaart =====
// Hier komt de code van het route-onderdeel (bijvoorbeeld Leaflet in #map).

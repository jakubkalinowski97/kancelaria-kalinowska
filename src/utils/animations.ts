// Animation utilities for scroll-based animations

export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el, index) => {
    // Add staggered delay for service cards scroll animation only
    if (el.classList.contains("service-card")) {
      (el as HTMLElement).style.setProperty("--scroll-delay", `${index * 0.05}s`);
    }
    observer.observe(el);
  });
}

export function initSmoothScrolling() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href')!);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

export function initFormHandling() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add form submission logic here
      console.log('Form submitted');
    });
  }
}

// Initialize all animations when DOM is loaded
export function initAllAnimations() {
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initSmoothScrolling();
      initFormHandling();
    });
  }
}

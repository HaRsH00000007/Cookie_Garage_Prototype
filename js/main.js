// Cookie Garage — small interactions (sticky nav, mobile menu, scroll reveal)
(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  // Solid nav once the page has scrolled past the top of the hero
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));

  // Fade-up reveal on scroll, with a small stagger for siblings
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 110}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  // Keep the hero video playing on browsers that block autoplay until interaction
  const video = document.querySelector(".hero__video");
  if (video) {
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();

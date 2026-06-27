/* =========================================================
   Personal homepage — interactive layer
   Vanilla JS, no dependencies.
   ========================================================= */
(() => {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
  });

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.querySelector(".nav__links");

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    // scroll progress
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    const bar = document.getElementById("scroll-progress");
    if (bar) bar.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Active section highlight ---------- */
  const navAnchors = [...document.querySelectorAll(".nav__links a")];
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = "#" + e.target.id;
          navAnchors.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 40, 240) + "ms";
    revealer.observe(el);
  });

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll(".stat__num");
  const countObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const dur = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(decimals);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObs.observe(c));

  /* ---------- Typing effect ---------- */
  const typed = document.getElementById("typed");
  if (typed && !prefersReduced) {
    const words = [
      " ML systems.",
      " honest models.",
      " clean math.",
      " things that ship.",
    ];
    let w = 0, c = 0, deleting = false;
    const type = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!deleting && c < word.length) {
        c++;
        setTimeout(type, 70);
      } else if (!deleting && c === word.length) {
        deleting = true;
        setTimeout(type, 1600);
      } else if (deleting && c > 0) {
        c--;
        setTimeout(type, 35);
      } else {
        deleting = false;
        w = (w + 1) % words.length;
        setTimeout(type, 240);
      }
    };
    type();
  } else if (typed) {
    typed.textContent = " ML systems.";
  }

  /* ---------- Tilt on hover ---------- */
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".tilt").forEach((el) => {
      const strength = 8;
      el.addEventListener("mousemove", (ev) => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-4px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Particle network background ---------- */
  const canvas = document.getElementById("bg-canvas");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, particles, raf;
    const mouse = { x: -9999, y: -9999 };

    const accent = () =>
      getComputedStyle(root).getPropertyValue("--accent").trim() || "#6ea8fe";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth = window.innerWidth;
      h = canvas.clientHeight = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 16000), 110);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const hexToRgb = (hex) => {
      const m = hex.replace("#", "");
      const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
      const int = parseInt(n, 16);
      return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const [r, g, b] = hexToRgb(accent());
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // mouse repulsion
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 120) {
          p.x += (mdx / md) * 0.8;
          p.y += (mdy / md) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.16 * (1 - d / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mouseout", () => {
      mouse.x = mouse.y = -9999;
    });
    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 150);
    });
    // Pause when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else draw();
    });
    resize();
    draw();
  }
})();

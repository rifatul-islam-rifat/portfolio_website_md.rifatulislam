(() => {
  const C = CONFIG,
    $ = (s, p = document) => p.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );

  /* ---------- Fill content ---------- */
  document.title = C.site.name + " | Portfolio";
  document
    .querySelectorAll("[data-site]")
    .forEach((el) => (el.textContent = C.site[el.dataset.site]));
  $("#heroImg").src = C.images.hero;
  $("#aboutImg").src = C.images.about;
  $("#aboutText1").textContent = C.about.text1;
  $("#aboutText2").textContent = C.about.text2;
  $("#year").textContent = new Date().getFullYear();

  $("#navList").innerHTML = C.nav
    .map(
      (n) =>
        `<li><a href="#${n.id}" data-id="${n.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${n.icon}"/></svg><span>${esc(n.label)}</span></a></li>`,
    )
    .join("");

  $("#stats").innerHTML = C.about.stats
    .map(
      (s) =>
        `<li><strong class="count" data-to="${s.value}">0</strong><span>${esc(s.label)}</span></li>`,
    )
    .join("");

  $("#services-list").innerHTML = C.services
    .map(
      (s) =>
        `<article class="card tilt reveal"><span class="ico" aria-hidden="true">${s.icon}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`,
    )
    .join("");

  $("#skills-list").innerHTML = C.skills
    .map(
      (s) =>
        `<li class="reveal"><p><strong>${esc(s.name)}</strong><em>${s.level}%</em></p><div class="bar"><i data-w="${s.level}"></i></div></li>`,
    )
    .join("");

  $("#projects-list").innerHTML = C.projects
    .map(
      (p) =>
        `<article class="project tilt reveal"><a href="${esc(p.link)}" target="_blank" rel="noopener">
      <figure><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="600" height="400"></figure>
      <div class="p-body"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></a></article>`,
    )
    .join("");

  $("#contactInfo").innerHTML =
    `<p><strong>Email:</strong> <a href="mailto:${esc(C.contact.email)}">${esc(C.contact.email)}</a></p>
     <p><strong>Phone:</strong> <a href="tel:${esc(C.contact.phone.replace(/\s/g, ""))}">${esc(C.contact.phone)}</a></p>
     <p><strong>Location:</strong> ${esc(C.contact.location)}</p>`;
  $("#socials").innerHTML = C.socials
    .map(
      (s) =>
        `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`,
    )
    .join("");

  const words = [...C.skills.map((s) => s.name), ...C.site.roles];
  $("#marquee").innerHTML = [...words, ...words]
    .map((w) => `<span>${esc(w)}</span>`)
    .join("");

  /* ---------- Loader ---------- */
  const hideLoader = () =>
    setTimeout(
      () => {
        $("#loader").classList.add("done");
        document.body.classList.add("ready");
      },
      reduce ? 0 : 900,
    );
  document.readyState === "complete"
    ? hideLoader()
    : addEventListener("load", hideLoader);

  /* ---------- Typing ---------- */
  const typed = $("#typed");
  let ri = 0,
    ci = 0,
    del = false;
  (function type() {
    const w = C.site.roles[ri];
    typed.textContent = w.slice(0, ci);
    if (!del && ci === w.length) {
      del = true;
      return setTimeout(type, 1400);
    }
    if (del && ci === 0) {
      del = false;
      ri = (ri + 1) % C.site.roles.length;
    }
    ci += del ? -1 : 1;
    setTimeout(type, del ? 40 : 90);
  })();

  /* ---------- Scroll progress (left -> right) ---------- */
  const bar = $("#progress");
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal, bars, counters ---------- */
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("in");
        io.unobserve(el);
        el.querySelectorAll(".bar i").forEach(
          (b) => (b.style.width = b.dataset.w + "%"),
        );
        el.querySelectorAll(".count").forEach((c) => count(c));
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  function count(c) {
    const to = +c.dataset.to,
      t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1200, 1);
      c.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + "+";
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- Active nav link ---------- */
  const links = [...document.querySelectorAll("#navList a")];
  const so = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          links.forEach((a) =>
            a.classList.toggle("active", a.dataset.id === e.target.id),
          );
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  document.querySelectorAll("main section[id]").forEach((s) => so.observe(s));

  if (!reduce && matchMedia("(pointer:fine)").matches) {
    /* ---------- Cursor blob ---------- */
    const blob = $("#blob");
    let bx = 0,
      by = 0,
      tx = 0,
      ty = 0;
    addEventListener("pointermove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    (function loop() {
      bx += (tx - bx) * 0.08;
      by += (ty - by) * 0.08;
      blob.style.transform = `translate(${bx - 200}px,${by - 200}px)`;
      requestAnimationFrame(loop);
    })();

    /* ---------- 3D tilt ---------- */
    document.querySelectorAll(".tilt").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });

    /* ---------- Magnetic buttons ---------- */
    document.querySelectorAll(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      b.addEventListener("pointerleave", () => (b.style.transform = ""));
    });
  }

  /* ---------- Form (demo: opens email app) ---------- */
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    location.href = `mailto:${C.contact.email}?subject=${encodeURIComponent("Message from " + d.get("name"))}&body=${encodeURIComponent(d.get("message") + "\n\n" + d.get("email"))}`;
    $("#formNote").textContent = "Thanks! Your email app is opening.";
    e.target.reset();
  });
})();

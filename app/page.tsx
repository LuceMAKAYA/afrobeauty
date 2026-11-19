"use client";
import { useEffect } from "react";

import { CONFIG, LENGTHS, PRICES, COLORS, ACC, BOXES, type Box, type ShipChoice, accValue, eur, shipCostFor, SHIP_LABELS } from "@/lib/catalog";

const CATS = [
  { id: "all", label: "Toutes" },
  { id: "tresses", label: "Tressées" },
  { id: "crochet", label: "Crochet" },
  { id: "twists", label: "Twists" },
  { id: "boho", label: "Boho" },
];

const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

function Logo({ id, size }: { id: string; size: number }) {
  return (
    <svg viewBox="0 0 34 34" fill="none" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      <line x1="17" y1="3" x2="17" y2="31" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M5 31 L17 3" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="21" x2="17" y2="21" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3 Q29 3 29 9 Q29 17 17 17" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M17 17 Q31 17 31 24 Q31 31 17 31" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="3" r="2.2" fill="#E8C97A" />
      <circle cx="17" cy="31" r="2.2" fill="#E8C97A" />
    </svg>
  );
}

export default function Home() {
  useEffect(() => {
    /* ══ THÈME (clair par défaut) ══ */
    let theme = "light";
    try {
      theme = localStorage.getItem("abTheme") || "light";
    } catch {}
    document.documentElement.setAttribute("data-theme", theme);
    syncThemeIcon();
    function syncThemeIcon() {
      const el = document.getElementById("themeIcon");
      if (el) el.textContent = theme === "dark" ? "🌙" : "☀️";
    }
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("abTheme", theme);
      } catch {}
      syncThemeIcon();
    });

    /* ══ CURSEUR ══ */
    const dot = document.getElementById("cursorDot")!;
    document.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });

    /* ══ PARTICULES ══ */
    const pc = document.getElementById("particles")!;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.cssText = `left:${Math.random() * 100}%;--dur:${6 + Math.random() * 8}s;--delay:${Math.random() * 8}s;--dx:${(Math.random() - 0.5) * 100}px;width:${1 + Math.random() * 2}px;height:${1 + Math.random() * 2}px;`;
      pc.appendChild(p);
    }

    /* ══ SCROLL REVEAL ══ */
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach((el) => revObs.observe(el));

    /* ══ PARALLAX + NAV SHADOW ══ */
    const heroBg = document.querySelector(".hero-bg-img") as HTMLElement;
    window.addEventListener(
      "scroll",
      () => {
        const s = window.scrollY;
        if (s < window.innerHeight && heroBg) heroBg.style.transform = `translateY(${s * 0.3}px)`;
        const nav = document.querySelector("nav") as HTMLElement;
        if (nav) nav.style.boxShadow = s > 60 ? "0 8px 40px rgba(0,0,0,.15)" : "none";
      },
      { passive: true },
    );

    /* ══ SCROLL LINKS ══ */
    document.querySelectorAll("[data-scroll]").forEach((el) => {
      el.addEventListener("click", () => {
        document.getElementById((el as HTMLElement).dataset.scroll!)?.scrollIntoView({ behavior: "smooth" });
      });
    });

    /* ══ FILTRES CATALOGUE ══ */
    let activeFilter = "all";
    const filtersEl = document.getElementById("filters")!;
    filtersEl.innerHTML = CATS.map((c) => {
      const n = c.id === "all" ? BOXES.length : BOXES.filter((b) => b.category === c.id).length;
      return `<button class="filter-btn${c.id === "all" ? " active" : ""}" data-filter="${c.id}">${c.label} <span class="filter-count">${n}</span></button>`;
    }).join("");
    filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = (btn as HTMLElement).dataset.filter || "all";
        renderGrid();
      });
    });
    document.getElementById("sortSelect")?.addEventListener("change", renderGrid);

    /* ══ RENDER GRILLE ══ */
    const minPrice = PRICES.meches.courte;
    function getFiltered() {
      let boxes = activeFilter === "all" ? [...BOXES] : BOXES.filter((b) => b.category === activeFilter);
      const sort = (document.getElementById("sortSelect") as HTMLSelectElement)?.value;
      if (sort === "diff-asc") boxes.sort((a, b) => a.diff - b.diff);
      boxes.sort((a, b) => Number(!!a.soon) - Number(!!b.soon));
      return boxes;
    }

    function renderGrid() {
      const boxes = getFiltered();
      const grid = document.getElementById("catGrid")!;
      const cnt = document.getElementById("resultCount");
      const avail = boxes.filter((b) => !b.soon).length;
      if (cnt) cnt.textContent = avail + " box disponible" + (avail > 1 ? "s" : "");

      const dots = (d: number) => [1, 2, 3].map((i) => `<div class="cc-diff-dot${i <= d ? " filled" : ""}"></div>`).join("");

      grid.innerHTML = boxes
        .map(
          (b, i) => `
        <div class="cat-card reveal${b.soon ? " is-soon" : ""}" data-id="${b.id}" style="animation-delay:${i * 0.08}s">
          <div class="cc-img-wrap">
            <img src="${b.img}" alt="${b.name}" loading="lazy">
            <div class="cc-overlay"></div>
            ${b.badge ? `<div class="cc-badge ${b.badgeClass}">${b.badge}</div>` : ""}
            <div class="cc-diff">${dots(b.diff)}</div>
            <div class="cc-img-text">
              <div class="cc-cat">${b.catLabel}</div>
              <div class="cc-name">${b.name}</div>
            </div>
          </div>
          <div class="cc-bottom">
            ${
              b.soon
                ? `<div class="cc-price-block"><span class="cc-soon">Bientôt disponible</span></div>
                   <div class="cc-pills"><span class="cc-pill">⏱ ${b.duration}</span></div>
                   <div class="cc-actions"><button class="btn-detail" disabled>Arrive bientôt</button></div>`
                : `<div class="cc-price-block"><span class="cc-from">dès</span><span class="cc-price">${eur(minPrice)}</span></div>
                   <div class="cc-pills">
                     <span class="cc-pill">⏱ ${b.duration}</span>
                     <span class="cc-pill">🧶 Mèches ${b.meches}</span>
                     <span class="cc-pill">📏 3 longueurs</span>
                   </div>
                   <div class="cc-actions">
                     <button class="btn-detail" data-detail="${b.id}">Voir le détail</button>
                     <button class="btn-add" data-detail="${b.id}">Composer ma box</button>
                   </div>`
            }
          </div>
        </div>`,
        )
        .join("");

      grid.querySelectorAll("[data-detail]").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openProduct((btn as HTMLElement).dataset.detail!);
        }),
      );
      grid.querySelectorAll(".cat-card:not(.is-soon)").forEach((card) =>
        card.addEventListener("click", () => openProduct((card as HTMLElement).dataset.id!)),
      );
      grid.querySelectorAll(".cat-card, button").forEach((el) => {
        el.addEventListener("mouseenter", () => dot.classList.add("hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("hover"));
      });

      requestAnimationFrame(() => {
        grid.querySelectorAll(".reveal").forEach((el) => {
          if (!el.classList.contains("visible")) revObs.observe(el);
        });
      });
    }

    /* ══ ACCESSOIRES ══ */
    function renderAcc() {
      const grid = document.getElementById("accGrid")!;
      const sellable = BOXES.filter((b) => !b.soon);
      const packs = sellable
        .map(
          (b) => `<div class="acc-card acc-pack">
            <div class="acc-ico">📦</div>
            <div class="acc-name">Pack accessoires ${b.name}</div>
            <p class="acc-desc">${b.acc.map((a) => ACC[a].name).join(", ")}. Valeur ${eur(accValue(b.acc))}.</p>
            <div class="acc-row"><span class="acc-price">${eur(b.packPrice)}</span><button class="acc-add" data-pack="${b.id}">Ajouter</button></div>
          </div>`,
        )
        .join("");
      const solos = Object.entries(ACC)
        .map(
          ([id, a]) => `<div class="acc-card">
            <div class="acc-ico">${a.icon}</div>
            <div class="acc-name">${a.name}</div>
            <p class="acc-desc">${a.desc}</p>
            <div class="acc-row"><span class="acc-price">${eur(a.price)}</span><button class="acc-add" data-acc="${id}">Ajouter</button></div>
          </div>`,
        )
        .join("");
      grid.innerHTML = packs + solos;
      grid.querySelectorAll(".acc-add").forEach((btn) =>
        btn.addEventListener("click", () => {
          const el = btn as HTMLElement;
          if (el.dataset.acc) {
            const a = ACC[el.dataset.acc];
            addToCart({ key: "acc-" + el.dataset.acc, name: a.name, detail: "Accessoire", price: a.price, img: "" });
          }
          if (el.dataset.pack) {
            const b = BOXES.find((x) => x.id === el.dataset.pack)!;
            addToCart({
              key: "pack-" + b.id,
              name: "Pack accessoires " + b.name,
              detail: b.acc.map((a) => ACC[a].name).join(", "),
              price: b.packPrice,
              img: b.img,
            });
          }
        }),
      );
    }

    /* ══ MODAL ══ */
    let currentProduct: Box | null = null;
    const sel = { formula: "complete", length: "mi", color: "1B" };

    function modalPrice() {
      return PRICES[sel.formula][sel.length];
    }

    function renderModalOptions() {
      const p = currentProduct!;
      const L = LENGTHS.find((l) => l.id === sel.length)!;
      const price = modalPrice();
      const saving = PRICES.meches[sel.length] + accValue(p.acc) - PRICES.complete[sel.length];
      document.getElementById("modalPriceBig")!.textContent = eur(price);
      document.getElementById("modalSaveBig")!.textContent = sel.formula === "complete" ? "−" + eur(saving) : "";
      const opts = document.getElementById("modalOptions")!;
      opts.innerHTML = `
        <div class="opt-group">
          <div class="opt-label">Formule</div>
          <div class="opt-seg two">
            <button class="opt-btn${sel.formula === "meches" ? " on" : ""}" data-k="formula" data-v="meches">Mèches seules<small>${eur(PRICES.meches[sel.length])}</small></button>
            <button class="opt-btn${sel.formula === "complete" ? " on" : ""}" data-k="formula" data-v="complete">Box complète<small>${eur(PRICES.complete[sel.length])} · tu économises ${eur(saving)}</small></button>
          </div>
        </div>
        <div class="opt-group">
          <div class="opt-label">Longueur</div>
          <div class="opt-seg three">${LENGTHS.map((l) => `<button class="opt-btn${sel.length === l.id ? " on" : ""}" data-k="length" data-v="${l.id}">${l.label}<small>${l.packs} paquets</small></button>`).join("")}</div>
        </div>
        <div class="opt-group">
          <div class="opt-label">Couleur des mèches · ${COLORS.find((c) => c.id === sel.color)!.label}</div>
          <div class="opt-swatches">${COLORS.map((c) => `<button class="opt-sw${sel.color === c.id ? " on" : ""}" data-k="color" data-v="${c.id}" aria-label="${c.label}"><i style="background:${c.hex}"></i>${c.id}</button>`).join("")}</div>
        </div>`;
      opts.querySelectorAll("[data-k]").forEach((b) =>
        b.addEventListener("click", () => {
          const el = b as HTMLElement;
          (sel as Record<string, string>)[el.dataset.k!] = el.dataset.v!;
          renderModalOptions();
        }),
      );
      const items = [{ icon: "🧶", label: `${L.packs} paquets de mèches ${p.meches} · couleur ${sel.color}`, off: false }].concat(
        p.acc.map((a) => ({ icon: ACC[a].icon, label: ACC[a].name, off: sel.formula === "meches" })),
      );
      document.getElementById("modalIncludes")!.innerHTML = items
        .map((inc) => `<div class="cat-m-inc${inc.off ? " is-off" : ""}"><span class="cat-m-inc-icon">${inc.icon}</span><span>${inc.label}</span></div>`)
        .join("");
    }

    function openProduct(id: string) {
      const p = BOXES.find((b) => b.id === id);
      if (!p || p.soon) return;
      currentProduct = p;

      const img = document.getElementById("modalImg") as HTMLImageElement;
      img.src = p.img;
      img.alt = p.name;
      const badge = document.getElementById("modalBadge")!;
      badge.textContent = p.badge || "";
      badge.style.display = p.badge ? "block" : "none";
      document.getElementById("modalCat")!.textContent = p.catLabel;
      document.getElementById("modalTitle")!.innerHTML = p.name.replace(/(Knotless|Perles|Crochet)/i, "<em>$1</em>");
      document.getElementById("modalSub")!.textContent = p.subtitle;
      const diffLabels = ["", "Facile", "Intermédiaire", "Avancée"];
      document.getElementById("modalMeta")!.innerHTML = `
        <div class="cat-meta-item"><span class="cat-meta-icon">⏱</span> ${p.duration}</div>
        <div class="cat-meta-item">
          <span class="cat-meta-icon">💪</span>
          <div class="cat-meta-dots">${[1, 2, 3].map((i) => `<div class="cat-meta-dot${i <= p.diff ? " on" : ""}"></div>`).join("")}</div>
          ${diffLabels[p.diff]}
        </div>`;
      document.getElementById("modalDesc")!.textContent = p.desc;
      renderModalOptions();

      document.getElementById("modalAddBtn")!.classList.remove("added");
      document.getElementById("modalAddIcon")!.textContent = "🛒";
      document.getElementById("modalAddText")!.textContent = "Ajouter au panier";
      document.getElementById("productModal")!.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeProduct() {
      document.getElementById("productModal")!.classList.remove("open");
      document.body.style.overflow = drawerOpen ? "hidden" : "";
    }

    document.getElementById("productModal")?.addEventListener("click", (e) => {
      const t = e.target as HTMLElement;
      if (t.id === "productModal" || t.classList.contains("modal-backdrop")) closeProduct();
    });
    document.getElementById("modalCloseBtn")?.addEventListener("click", closeProduct);

    document.getElementById("modalAddBtn")?.addEventListener("click", () => {
      if (!currentProduct) return;
      const p = currentProduct;
      const L = LENGTHS.find((l) => l.id === sel.length)!;
      addToCart({
        key: `box-${p.id}-${sel.formula}-${sel.length}-${sel.color}`,
        name: `${sel.formula === "complete" ? "Box complète" : "Box mèches"} ${p.name}`,
        detail: `${L.label} (${L.packs} paquets) · couleur ${sel.color}`,
        price: modalPrice(),
        img: p.img,
      });
      document.getElementById("modalAddBtn")!.classList.add("added");
      document.getElementById("modalAddIcon")!.textContent = "✓";
      document.getElementById("modalAddText")!.textContent = "Ajouté !";
      setTimeout(() => closeProduct(), 700);
    });

    /* ══ PANIER ══ */
    type Item = { key: string; name: string; detail: string; price: number; img: string; qty: number };
    let cart: Item[] = [];
    try {
      cart = JSON.parse(localStorage.getItem("abCart") || "[]");
    } catch {
      cart = [];
    }
    const save = () => {
      try {
        localStorage.setItem("abCart", JSON.stringify(cart));
      } catch {}
    };
    let drawerOpen = false;
    let ship: ShipChoice = "lendemain";
    const form = { nom: "", tel: "", adresse: "", cp: "", note: "" };

    const sameDayOpen = () => new Date().getHours() < CONFIG.cutoffHour;
    const subtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipCost = () => shipCostFor(ship, subtotal());
    const shipLabel = () => SHIP_LABELS[ship];

    function addToCart(product: Omit<Item, "qty">) {
      const ex = cart.find((i) => i.key === product.key);
      if (ex) ex.qty++;
      else cart.push({ ...product, qty: 1 });
      save();
      renderCart();
      showToast("✦ " + product.name + " ajouté !");
      openDrawer();
    }
    function updateQty(i: number, delta: number) {
      cart[i].qty += delta;
      if (cart[i].qty <= 0) cart.splice(i, 1);
      save();
      renderCart();
    }

    function orderText() {
      const sub = subtotal();
      const sc = shipCost();
      let t = "Bonjour Afro Beauty ✨ Je souhaite commander :\n";
      cart.forEach((c) => (t += `• ${c.qty}× ${c.name} (${c.detail}) : ${eur(c.price * c.qty)}\n`));
      t += `\nSous-total : ${eur(sub)}\nLivraison : ${shipLabel()} (${sc === 0 ? "offerte" : eur(sc)})\nTotal : ${eur(sub + sc)}\n`;
      t += `\nNom : ${form.nom}\nTéléphone : ${form.tel}\n`;
      if (ship !== "retrait") t += `Adresse : ${form.adresse}, ${form.cp} Toulouse\n`;
      if (form.note.trim()) t += `Note : ${form.note}\n`;
      return t;
    }
    function validate() {
      if (!form.nom.trim()) return "Indique ton prénom et ton nom.";
      if (form.tel.replace(/\D/g, "").length < 9) return "Indique un numéro de téléphone valide.";
      if (ship !== "retrait") {
        if (!form.adresse.trim()) return "Indique ton adresse de livraison.";
        if (!/^31[0-5]00$/.test(form.cp.trim())) return "On livre uniquement à Toulouse pour l'instant (31000 à 31500).";
      }
      return "";
    }
    function updateWaLink() {
      const a = document.getElementById("waBtn") as HTMLAnchorElement | null;
      if (a) a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(orderText())}`;
    }

    function renderCart() {
      if (!sameDayOpen() && ship === "jour") ship = "lendemain";
      const count = cart.reduce((s, i) => s + i.qty, 0);
      const badge = document.getElementById("cartBadge")!;
      badge.textContent = String(count);
      badge.style.display = count > 0 ? "flex" : "none";
      const foot = document.getElementById("drawerFoot")!;
      const body = document.getElementById("drawerBody")!;
      if (!cart.length) {
        body.innerHTML = '<div class="d-empty"><span>🛒</span><p>Ton panier est vide</p></div>';
        foot.style.display = "none";
        return;
      }
      foot.style.display = "block";
      const sub = subtotal();
      const sc = shipCost();
      const missing = CONFIG.freeFrom - sub;
      const free = sub >= CONFIG.freeFrom;
      body.innerHTML = `
        <div class="d-items">${cart
          .map(
            (item, i) => `
          <div class="d-item">
            ${item.img ? `<img class="d-img" src="${item.img}" alt="" onerror="this.style.display='none'">` : `<div class="d-img d-img-ph">✦</div>`}
            <div class="d-info"><div class="d-name">${item.name}</div><div class="d-detail">${item.detail}</div><div class="d-price">${eur(item.price * item.qty)}</div></div>
            <div class="d-qty">
              <button class="qty-b" data-i="${i}" data-delta="-1" aria-label="Retirer un">−</button>
              <span class="qty-n">${item.qty}</span>
              <button class="qty-b" data-i="${i}" data-delta="1" aria-label="Ajouter un">+</button>
            </div>
          </div>`,
          )
          .join("")}</div>
        ${missing > 0 && ship !== "retrait" ? `<div class="d-free">Plus que <b>${eur(missing)}</b> pour la livraison offerte.</div>` : ""}
        <div class="d-section">
          <div class="opt-label">Livraison à Toulouse</div>
          <div class="d-ship">
            <label class="${sameDayOpen() ? "" : "disabled"}"><input type="radio" name="ship" value="jour" ${ship === "jour" ? "checked" : ""} ${sameDayOpen() ? "" : "disabled"}> Le jour même${sameDayOpen() ? "" : " (avant 14h)"}<span>${free ? "Offerte" : eur(CONFIG.ship.jour)}</span></label>
            <label><input type="radio" name="ship" value="lendemain" ${ship === "lendemain" ? "checked" : ""}> Le lendemain<span>${free ? "Offerte" : eur(CONFIG.ship.lendemain)}</span></label>
            <label><input type="radio" name="ship" value="retrait" ${ship === "retrait" ? "checked" : ""}> Retrait en main propre<span>Gratuit</span></label>
          </div>
        </div>
        <div class="d-section d-form">
          <label>Prénom et nom<input data-f="nom" autocomplete="name" value="${esc(form.nom)}"></label>
          <label>Téléphone<input data-f="tel" type="tel" autocomplete="tel" value="${esc(form.tel)}"></label>
          ${
            ship !== "retrait"
              ? `<label>Adresse<input data-f="adresse" autocomplete="street-address" value="${esc(form.adresse)}"></label>
                 <label>Code postal (Toulouse)<input data-f="cp" inputmode="numeric" maxlength="5" autocomplete="postal-code" value="${esc(form.cp)}"></label>`
              : ""
          }
          <label>Note (optionnel)<textarea data-f="note" rows="2" placeholder="Code d'entrée, créneau, mélange de couleurs…">${esc(form.note)}</textarea></label>
        </div>`;
      document.getElementById("drawerSub")!.textContent = eur(sub);
      document.getElementById("drawerShip")!.textContent = sc === 0 ? "Offerte" : eur(sc);
      document.getElementById("drawerTotal")!.textContent = eur(sub + sc);
      document.getElementById("drawerErr")!.textContent = "";

      body.querySelectorAll(".qty-b").forEach((btn) =>
        btn.addEventListener("click", () => {
          const el = btn as HTMLElement;
          updateQty(parseInt(el.dataset.i!), parseInt(el.dataset.delta!));
        }),
      );
      body.querySelectorAll('input[name="ship"]').forEach((r) =>
        r.addEventListener("change", () => {
          ship = (r as HTMLInputElement).value as typeof ship;
          renderCart();
        }),
      );
      body.querySelectorAll("[data-f]").forEach((inp) =>
        inp.addEventListener("input", () => {
          const el = inp as HTMLInputElement;
          (form as Record<string, string>)[el.dataset.f!] = el.value;
          document.getElementById("drawerErr")!.textContent = "";
          updateWaLink();
        }),
      );
      updateWaLink();
    }

    function openDrawer() {
      drawerOpen = true;
      document.getElementById("drawer")!.classList.add("open");
      document.getElementById("drawerOverlay")!.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeDrawer() {
      drawerOpen = false;
      document.getElementById("drawer")!.classList.remove("open");
      document.getElementById("drawerOverlay")!.classList.remove("open");
      document.body.style.overflow = "";
    }
    const toggleDrawer = () => (drawerOpen ? closeDrawer() : openDrawer());
    document.getElementById("navCartBtn")?.addEventListener("click", toggleDrawer);
    document.getElementById("drawerOverlay")?.addEventListener("click", toggleDrawer);
    document.getElementById("drawerCloseBtn")?.addEventListener("click", toggleDrawer);

    document.getElementById("waBtn")?.addEventListener("click", (e) => {
      const err = validate();
      if (err) {
        e.preventDefault();
        document.getElementById("drawerErr")!.textContent = err;
      }
    });

    const checkoutBtn = document.getElementById("checkoutBtn") as HTMLButtonElement | null;
    if (checkoutBtn) {
      checkoutBtn.style.display = CONFIG.sumupEnabled ? "flex" : "none";
      checkoutBtn.addEventListener("click", async () => {
        if (!cart.length) return;
        const err = validate();
        if (err) {
          document.getElementById("drawerErr")!.textContent = err;
          return;
        }
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = '<span class="spinner"></span> Redirection...';
        try {
          const res = await fetch("/api/sumup-checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lines: cart.map((i) => ({ key: i.key, qty: i.qty })), ship }),
          });
          const data = await res.json();
          if (!data.url) throw new Error(data.error || "Erreur");
          // On garde la commande pour l'envoyer sur WhatsApp après le paiement
          try {
            localStorage.setItem(
              "abPaidOrder",
              JSON.stringify({ ref: data.ref, total: data.total, text: orderText() }),
            );
          } catch {}
          window.location.href = data.url;
        } catch {
          checkoutBtn.disabled = false;
          checkoutBtn.innerHTML = "💳 Payer par carte";
          document.getElementById("drawerErr")!.textContent =
            "Le paiement par carte n'a pas marché. Envoie ta commande sur WhatsApp.";
        }
      });
    }

    function showToast(msg: string) {
      const t = document.getElementById("toast")!;
      t.textContent = msg;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 2600);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProduct();
        closeDrawer();
      }
    });

    /* ══ INIT ══ */
    renderGrid();
    renderAcc();
    renderCart();
  }, []);

  /* ════════════════ JSX ════════════════ */
  return (
    <>
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="toast" id="toast" role="status" aria-live="polite"></div>

      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#">
          <Logo id="nG" size={32} />
          <div>
            <span className="nav-brand">Afro Beauty</span>
            <span className="nav-sub">Box · Tresses · Toulouse</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><span className="nav-link" data-scroll="boxes">Nos box</span></li>
          <li><span className="nav-link" data-scroll="accessoires">Accessoires</span></li>
          <li><span className="nav-link" data-scroll="livraison">Livraison</span></li>
          <li><span className="nav-link" data-scroll="faq">FAQ</span></li>
        </ul>
        <div className="nav-right">
          <div className="theme-toggle" id="themeToggle" title="Changer le thème">
            <div className="theme-toggle-knob">
              <span id="themeIcon">☀️</span>
            </div>
          </div>
          <button className="nav-cart" id="navCartBtn">
            🛒 Panier
            <span className="cart-badge" id="cartBadge" style={{ display: "none" }}>0</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-img"></div>
        <div className="hero-dark-overlay"></div>
        <div className="hero-particles" id="particles"></div>
        <div className="hero-content">
          <div className="hero-tag">✦ Box tresses · Livrée à Toulouse</div>
          <h1 className="hero-title">
            Coiffée,
            <br />
            <em>confiante,</em>
            <br />
            toi.
          </h1>
          <p className="hero-sub">
            Une box par coiffure : les mèches qu&apos;il te faut pour ta longueur, et tous les
            accessoires. Livrée le jour même à Toulouse.
          </p>
          <div className="hero-btns">
            <button className="btn-bord" data-scroll="boxes">Choisir ma box</button>
            <button className="btn-outline" data-scroll="how">Comment ça marche</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hstat"><div><div className="hstat-num">dès 18€</div><div className="hstat-lbl">Box mèches</div></div></div>
          <div className="hstat"><div><div className="hstat-num">Jour J</div><div className="hstat-lbl">Commande avant 14h</div></div></div>
          <div className="hstat"><div><div className="hstat-num">0€</div><div className="hstat-lbl">Livraison dès 40€</div></div></div>
        </div>
      </section>

      {/* STRIP (la liste est doublée pour le défilement en boucle) */}
      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          {[0, 1].flatMap((k) =>
            [
              "Livraison le jour même à Toulouse",
              "Offerte dès 40€",
              "Mèches + accessoires",
              "3 longueurs au choix",
              "6 couleurs de mèches",
              "Retrait en main propre possible",
            ].map((t, i) => (
              <div key={`${k}-${i}`} className="strip-item">{t}</div>
            )),
          )}
        </div>
      </div>

      {/* CATALOGUE */}
      <section className="boxes-section" id="boxes">
        <div className="boxes-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">Nos box</div>
            <h2 className="sec-title">
              Choisis ta
              <br />
              <em>coiffure.</em>
            </h2>
          </div>
          <p className="boxes-header-note reveal-right">
            Mèches seules ou box complète.
            <br />
            La complète te revient moins cher.
          </p>
        </div>
        <div className="filters-inline">
          <span className="filter-label">Filtrer</span>
          <div id="filters" style={{ display: "contents" }}></div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="filter-label" id="resultCount">3 box disponibles</span>
            <select id="sortSelect" className="sort-select" aria-label="Trier">
              <option value="default">Popularité</option>
              <option value="diff-asc">Plus facile</option>
            </select>
          </div>
        </div>
        <div className="cat-grid" id="catGrid"></div>
      </section>

      <div className="divider-gold"></div>

      {/* ACCESSOIRES */}
      <section className="extra-section" id="accessoires">
        <div className="boxes-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">À l&apos;unité</div>
            <h2 className="sec-title">
              Les <em>accessoires.</em>
            </h2>
          </div>
          <p className="boxes-header-note reveal-right">
            Il te manque juste un gel ou des perles ?
            <br />
            Ajoute-les seuls, ou prends un pack.
          </p>
        </div>
        <div className="acc-grid" id="accGrid"></div>
      </section>

      <div className="divider-gold"></div>

      {/* HOW */}
      <section className="how-section" id="how">
        <div className="how-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">Comment ça marche</div>
            <h2 className="sec-title">
              Simple comme <em>bonjour.</em>
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-3)", maxWidth: "260px", lineHeight: "1.7", textAlign: "right" }} className="reveal-right">
            4 étapes, zéro prise de tête.
          </p>
        </div>
        <div className="how-grid">
          {[
            { n: "1", icon: "💆🏾‍♀️", h: "Choisis ta coiffure", p: "Knotless, nattes avec perles ou crochet : chaque box est pensée pour une coiffure précise." },
            { n: "2", icon: "📏", h: "Ta longueur, ta couleur", p: "Courte, mi-longue ou longue : on met le bon nombre de paquets, dans la couleur que tu veux." },
            { n: "3", icon: "🛵", h: "Livrée aujourd'hui", p: "Commande avant 14h, livrée le jour même partout à Toulouse. Sinon, le lendemain." },
            { n: "4", icon: "✨", h: "Tu brilles", p: "Tu as tout sous la main pour te coiffer le soir même, sans courir les magasins." },
          ].map((s, i) => (
            <div key={i} className={`how-step reveal delay-${i + 1}`}>
              <div className="step-bg-num">{s.n}</div>
              <span className="step-icon">{s.icon}</span>
              <div className="step-h">{s.h}</div>
              <p className="step-p">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold"></div>

      {/* LIVRAISON */}
      <section className="extra-section" id="livraison">
        <div className="boxes-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">Toulouse uniquement, pour l&apos;instant</div>
            <h2 className="sec-title">
              La <em>livraison.</em>
            </h2>
          </div>
          <p className="boxes-header-note reveal-right">
            On livre dans tout Toulouse (31000 à 31500).
            <br />
            D&apos;autres villes arrivent bientôt.
          </p>
        </div>
        <div className="ship-grid">
          {[
            { p: "3,90€", h: "Le jour même", t: "Commande passée avant 14h, livrée dans la soirée.", hl: true },
            { p: "1,90€", h: "Le lendemain", t: "Commande passée après 14h, livrée le jour suivant." },
            { p: "Offerte", h: "Dès 40€ d'achat", t: "Valable sur la livraison du jour même comme du lendemain." },
            { p: "0€", h: "Retrait en main propre", t: "On convient ensemble d'un point de rendez-vous à Toulouse." },
          ].map((c, i) => (
            <div key={i} className={`ship-card reveal delay-${i + 1}${c.hl ? " hl" : ""}`}>
              <div className="ship-price">{c.p}</div>
              <div className="ship-h">{c.h}</div>
              <p className="ship-t">{c.t}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold"></div>

      {/* FAQ */}
      <section className="extra-section" id="faq">
        <div className="boxes-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">Questions</div>
            <h2 className="sec-title">
              Tu te <em>demandes…</em>
            </h2>
          </div>
        </div>
        <div className="faq-list">
          {[
            { q: "Combien de paquets de mèches il me faut ?", a: "La longueur choisie fixe le nombre de paquets : 3 pour une coiffure courte, 5 pour une mi-longue, 7 pour une longue. Pour des tresses très fines ou très volumineuses, écris-nous et on adapte la box." },
            { q: "Comment je passe commande ?", a: "Ajoute ta box au panier, choisis ta livraison et remplis ton adresse. Ta commande s'envoie sur notre WhatsApp, on te la confirme et on te donne l'heure de livraison." },
            { q: "Comment je paie ?", a: "Par carte, avec un paiement sécurisé SumUp, ou à la livraison." },
            { q: "Je peux choisir la couleur des mèches ?", a: "Oui : noir naturel, brun foncé, châtain, miel, cuivré ou blond. Pour un mélange de couleurs, précise-le dans la note de commande." },
            { q: "Vous livrez en dehors de Toulouse ?", a: "Pas encore. On commence par Toulouse pour garantir la livraison rapide, et on ouvre d'autres villes bientôt." },
          ].map((f, i) => (
            <details key={i} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-bg"></div>
        <div className="cta-overlay"></div>
        <div className="cta-content reveal">
          <h2 className="cta-h">
            Prête à être{" "}
            <em>
              coiffée
              <br />
              et confiante ?
            </em>
          </h2>
          <p className="cta-sub">Commande avant 14h, coiffe-toi ce soir.</p>
          <button className="btn-gold" data-scroll="boxes">Choisir ma box →</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <Logo id="fG" size={28} />
              <div>
                <span className="nav-brand" style={{ fontSize: "15px" }}>Afro Beauty</span>
                <span className="nav-sub" style={{ display: "block" }}>Box · Tresses · Toulouse</span>
              </div>
            </div>
            <p className="footer-brand-p">
              La box qui te livre tout pour te coiffer, sans chercher. WhatsApp : 06 02 56 74 74
            </p>
          </div>
          <div className="footer-col">
            <h5>Box</h5>
            <ul>
              <li><span className="footer-link" data-scroll="boxes">Knotless Braids</span></li>
              <li><span className="footer-link" data-scroll="boxes">Nattes avec Perles</span></li>
              <li><span className="footer-link" data-scroll="boxes">Crochet Braids</span></li>
              <li><span className="footer-link" data-scroll="accessoires">Accessoires</span></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Aide</h5>
            <ul>
              <li><span className="footer-link" data-scroll="livraison">Livraison</span></li>
              <li><span className="footer-link" data-scroll="faq">FAQ</span></li>
              <li><a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">Contact WhatsApp</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Suivre</h5>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 <span>Afro Beauty</span> · Tous droits réservés
          </div>
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>

      {/* MODAL PRODUIT */}
      <div className="modal-overlay" id="productModal">
        <div className="modal-backdrop"></div>
        <div className="modal-box">
          <button className="modal-close" id="modalCloseBtn" aria-label="Fermer">✕</button>
          <div className="modal-img-side">
            <img id="modalImg" src="" alt="" />
            <div className="modal-img-gradient"></div>
            <div className="modal-img-badge" id="modalBadge"></div>
            <div className="modal-price-overlay">
              <div className="modal-price-big">
                <span id="modalPriceBig"></span>
                <span className="save" id="modalSaveBig"></span>
              </div>
            </div>
          </div>
          <div className="modal-content-side">
            <div className="modal-eyebrow" id="modalCat"></div>
            <h2 className="modal-title" id="modalTitle"></h2>
            <div className="modal-subtitle" id="modalSub"></div>
            <div className="modal-meta" id="modalMeta"></div>
            <p className="modal-desc" id="modalDesc"></p>
            <div id="modalOptions"></div>
            <div className="modal-includes-title">Dans ta box</div>
            <div className="modal-includes-grid" id="modalIncludes"></div>
            <div className="modal-actions">
              <div className="modal-btn-row">
                <button className="btn-modal-add" id="modalAddBtn">
                  <span id="modalAddIcon">🛒</span>
                  <span id="modalAddText">Ajouter au panier</span>
                </button>
              </div>
              <div className="modal-guarantee">
                <span className="guarantee-item">Livrée le jour même à Toulouse</span>
                <span className="guarantee-item">Offerte dès 40€</span>
                <span className="guarantee-item">Retrait possible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DRAWER PANIER */}
      <div className="drawer-overlay" id="drawerOverlay"></div>
      <div className="drawer" id="drawer">
        <div className="drawer-head">
          <div className="drawer-title">Mon panier</div>
          <button className="drawer-close" id="drawerCloseBtn" aria-label="Fermer le panier">✕</button>
        </div>
        <div className="drawer-body" id="drawerBody">
          <div className="d-empty">
            <span>🛒</span>
            <p>Ton panier est vide</p>
          </div>
        </div>
        <div className="drawer-foot" id="drawerFoot" style={{ display: "none" }}>
          <div className="d-line"><span>Sous-total</span><span id="drawerSub">0€</span></div>
          <div className="d-line"><span>Livraison</span><span id="drawerShip">0€</span></div>
          <div className="d-total">
            <span className="d-total-lbl">Total</span>
            <span className="d-total-price" id="drawerTotal">0€</span>
          </div>
          <div className="d-err" id="drawerErr" role="alert"></div>
          <a className="d-checkout d-wa" id="waBtn" href="#" target="_blank" rel="noopener noreferrer">
            Envoyer ma commande sur WhatsApp
          </a>
          <button className="d-checkout d-card" id="checkoutBtn" style={{ display: "none" }}>
            💳 Payer par carte
          </button>
          <p className="d-note">On te confirme ta commande et l&apos;heure de livraison sur WhatsApp.</p>
        </div>
      </div>
    </>
  );
}

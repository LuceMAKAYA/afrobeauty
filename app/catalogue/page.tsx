"use client";

import { useEffect } from "react";

/* ══════════════════════════════════════
   DONNÉES CATALOGUE
══════════════════════════════════════ */
const BOXES = [
  {
    id: "knotless",
    name: "Knotless Braids",
    category: "tresses",
    catLabel: "Coiffure tressée",
    subtitle: "Légères, naturelles, sans nœuds",
    badge: "⭐ Best-seller",
    badgeClass: "badge-pop",
    price: 49,
    oldPrice: 65,
    diff: 2,
    duration: "4–6h",
    rating: 4.9,
    ratingCount: 142,
    img: "https://images.unsplash.com/photo-1614104895792-1d6cb01bce78?w=800&q=80",
    imgCart:
      "https://images.unsplash.com/photo-1614104895792-1d6cb01bce78?w=200&q=80",
    desc: "La coiffure tendance par excellence. Légères sur le cuir chevelu, sans nœud à la racine — elles durent jusqu'à 8 semaines et s'adaptent à tous les styles.",
    includes: [
      { icon: "🧶", label: "Mèches knotless premium (3 paquets)" },
      { icon: "🪮", label: "Peigne à queue professionnel" },
      { icon: "🔴", label: "Élastiques noirs assortis (×50)" },
      { icon: "💧", label: "Huile de soin pour les pointes" },
      { icon: "📋", label: "Guide illustré étape par étape" },
      { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
    ],
    reviews: [
      {
        text: "Mes knotless sont impeccables au premier essai ! Le guide est tellement clair.",
        author: "Aminata D. · Paris",
      },
      {
        text: "La qualité des mèches est vraiment top, elles tiennent super bien.",
        author: "Koné S. · Lyon",
      },
    ],
  },
  {
    id: "nattes-perles",
    name: "Nattes avec Perles",
    category: "tresses",
    catLabel: "Coiffure tressée",
    subtitle: "Élégantes & personnalisables",
    badge: "Nouveau",
    badgeClass: "badge-new",
    price: 44,
    oldPrice: 58,
    diff: 2,
    duration: "3–5h",
    rating: 4.8,
    ratingCount: 67,
    img: "https://images.unsplash.com/photo-1622476793601-9c754dc38380?w=800&q=80",
    imgCart:
      "https://images.unsplash.com/photo-1622476793601-9c754dc38380?w=200&q=80",
    desc: "Des nattes classiques sublimées par des perles dorées, argentées ou colorées. La box inclut une sélection de perles assorties pour personnaliser entièrement ta coiffure.",
    includes: [
      { icon: "🧶", label: "Mèches lisses premium (3 paquets)" },
      { icon: "🪮", label: "Peigne à queue + crochet" },
      {
        icon: "✨",
        label: "Set de perles assorties (dorées, argentées, colorées)",
      },
      { icon: "🔴", label: "Élastiques fins transparents" },
      { icon: "📋", label: "Guide illustré étape par étape" },
      { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
    ],
    reviews: [
      {
        text: "Les perles sont tellement jolies ! J'ai eu plein de compliments.",
        author: "Fatoumata B. · Bordeaux",
      },
      {
        text: "Super facile à faire avec le tuto. Les mèches sont de très bonne qualité.",
        author: "Mariama C. · Marseille",
      },
    ],
  },
  {
    id: "twist-vanille",
    name: "Twist Vanille",
    category: "twists",
    catLabel: "Coiffure twistée",
    subtitle: "Douceur & élégance naturelle",
    badge: "Tendance",
    badgeClass: "badge-tend",
    price: 42,
    oldPrice: 56,
    diff: 1,
    duration: "2–4h",
    rating: 4.8,
    ratingCount: 89,
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
    imgCart:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    desc: "Le twist vanille, c'est le côté romantique et naturel de la coiffure afro. Rapide à réaliser, cette coiffure met en valeur la texture naturelle de tes cheveux.",
    includes: [
      { icon: "🧶", label: "Mèches twist premium (4 paquets)" },
      { icon: "💧", label: "Crème hydratante coiffante" },
      { icon: "🪮", label: "Peigne à dents larges" },
      { icon: "✨", label: "Huile de finition brillance" },
      { icon: "📋", label: "Guide illustré étape par étape" },
      { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
    ],
    reviews: [
      {
        text: "Mes twists vanille ont tenu 3 semaines. C'est ma coiffure préférée maintenant !",
        author: "Nadia M. · Bordeaux",
      },
      {
        text: "Parfait pour débuter. La crème coiffante est excellente.",
        author: "Aïcha T. · Nantes",
      },
    ],
  },
  {
    id: "passion-twists",
    name: "Passion Twists",
    category: "twists",
    catLabel: "Coiffure twistée",
    subtitle: "Look bohème & romantique",
    badge: null,
    badgeClass: "",
    price: 39,
    oldPrice: 52,
    diff: 2,
    duration: "3–5h",
    rating: 4.7,
    ratingCount: 63,
    img: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=800&q=80",
    imgCart:
      "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=200&q=80",
    desc: "Les passion twists ont envahi TikTok et Instagram. Leur texture frisée crée un effet bohème irrésistible, parfaites pour toutes les occasions.",
    includes: [
      { icon: "🧶", label: "Mèches frisées passion (4 paquets)" },
      { icon: "🪮", label: "Peigne à queue fin" },
      { icon: "💧", label: "Mousse coiffante légère" },
      { icon: "✨", label: "Huile brillance finition" },
      { icon: "📋", label: "Guide illustré étape par étape" },
      { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
    ],
    reviews: [
      {
        text: "Le look bohème que je voulais ! Tellement de compliments en une semaine.",
        author: "Inès K. · Paris",
      },
      {
        text: "Les mèches sont douces et naturelles, super résultat.",
        author: "Rokia D. · Toulouse",
      },
    ],
  },
  {
    id: "crochet",
    name: "Crochet Braids",
    category: "crochet",
    catLabel: "Crochet",
    subtitle: "Rapide, volumineuse & protectrice",
    badge: "⚡ Rapide",
    badgeClass: "badge-excl",
    price: 46,
    oldPrice: 60,
    diff: 1,
    duration: "1–2h",
    rating: 4.9,
    ratingCount: 114,
    img: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=800&q=80",
    imgCart:
      "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=200&q=80",
    desc: "La technique crochet est parfaite si tu veux un résultat rapide et impressionnant. En 1 à 2h seulement, tu obtiens une coiffure volumineuse et protectrice qui dure des semaines.",
    includes: [
      { icon: "🧶", label: "Mèches crochet (6 paquets)" },
      { icon: "🪡", label: "Aiguille crochet professionnelle" },
      { icon: "🔴", label: "Élastiques et épingles invisibles" },
      { icon: "💧", label: "Spray hydratant protection" },
      { icon: "📋", label: "Guide illustré étape par étape" },
      { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
    ],
    reviews: [
      {
        text: "En 90 minutes chrono ! Je n'arrive pas à croire que c'est aussi rapide et beau.",
        author: "Binta F. · Strasbourg",
      },
      {
        text: "L'aiguille crochet incluse est de très bonne qualité, ça change tout.",
        author: "Djénéba M. · Lille",
      },
    ],
  },
  {
    id: "boho-braids",
    name: "Boho Braids",
    category: "boho",
    catLabel: "Style Boho",
    subtitle: "Sauvage, libre & romantique",
    badge: "✦ Exclusif",
    badgeClass: "badge-excl",
    price: 52,
    oldPrice: 68,
    diff: 3,
    duration: "5–8h",
    rating: 5.0,
    ratingCount: 38,
    img: "https://images.unsplash.com/photo-1596879711960-7e97b90a8680?w=800&q=80",
    imgCart:
      "https://images.unsplash.com/photo-1596879711960-7e97b90a8680?w=200&q=80",
    desc: "Les boho braids combinent des tresses classiques avec des mèches lâches frisées qui s'échappent pour un rendu romantique et sauvage. La coiffure la plus photographiée de notre collection.",
    includes: [
      { icon: "🧶", label: "Mèches braids (3 paquets)" },
      { icon: "🌿", label: "Mèches boho frisées (2 paquets)" },
      { icon: "🪮", label: "Peigne à queue + crochet" },
      { icon: "💧", label: "Sérum anti-frizz finition" },
      { icon: "📋", label: "Guide illustré étape par étape" },
      { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
    ],
    reviews: [
      {
        text: "La coiffure la plus belle que j'ai jamais portée. Tout le monde me demande où je l'ai apprise !",
        author: "Safi O. · Paris",
      },
      {
        text: "Un peu plus long à faire mais le résultat vaut VRAIMENT le coup.",
        author: "Djeneba R. · Lyon",
      },
    ],
  },
];

export default function Catalogue() {
  useEffect(() => {
    /* ══ THÈME ══ */
    const saved = localStorage.getItem("abTheme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon(saved);

    function updateThemeIcon(t: string) {
      const icon = document.getElementById("themeIcon");
      if (icon) icon.textContent = t === "dark" ? "🌙" : "☀️";
    }
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("abTheme", next);
      updateThemeIcon(next);
    });

    /* ══ CURSEUR SIMPLE ══ */
    const dot = document.getElementById("cursorDot")!;
    document.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });
    document
      .querySelectorAll("button, a, .cat-card, .cc-img-wrap")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => dot.classList.add("hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("hover"));
      });

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

    /* ══ STATE ══ */
    let activeFilter = "all";
    let currentProduct: any = null;
    let wishlist: string[] = [];
    let cart: any[] = [];
    let drawerOpen = false;

    /* ══ FILTRES ══ */
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = (btn as HTMLElement).dataset.filter || "all";
        renderGrid();
      });
    });
    document
      .getElementById("sortSelect")
      ?.addEventListener("change", renderGrid);

    /* ══ RENDER GRILLE ══ */
    function getFiltered() {
      let boxes =
        activeFilter === "all"
          ? [...BOXES]
          : BOXES.filter((b) => b.category === activeFilter);
      const sort = (document.getElementById("sortSelect") as HTMLSelectElement)
        ?.value;
      if (sort === "price-asc") boxes.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") boxes.sort((a, b) => b.price - a.price);
      if (sort === "diff-asc") boxes.sort((a, b) => a.diff - b.diff);
      return boxes;
    }

    function diffDots(level: number) {
      return [1, 2, 3]
        .map(
          (i) =>
            `<div class="cc-diff-dot${i <= level ? " filled" : ""}"></div>`,
        )
        .join("");
    }

    function stars(r: number) {
      return "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
    }

    function renderGrid() {
      const boxes = getFiltered();
      const grid = document.getElementById("catGrid")!;
      const count = document.getElementById("resultCount")!;
      count.textContent =
        boxes.length + " box disponible" + (boxes.length > 1 ? "s" : "");

      if (boxes.length === 0) {
        grid.innerHTML = `<div class="cat-empty"><div class="cat-empty-icon">🔍</div><div class="cat-empty-h">Aucune box trouvée</div><p class="cat-empty-p">Essaie un autre filtre !</p></div>`;
        return;
      }

      const pct = (b: any) => Math.round((1 - b.price / b.oldPrice) * 100);

      grid.innerHTML = boxes
        .map(
          (b, i) => `
        <div class="cat-card reveal" data-id="${b.id}" style="animation-delay:${i * 0.08}s">
          <div class="cc-img-wrap">
            <img src="${b.img}" alt="${b.name}" loading="lazy">
            <div class="cc-overlay"></div>
            ${b.badge ? `<div class="cc-badge ${b.badgeClass}">${b.badge}</div>` : ""}
            <div class="cc-diff">${diffDots(b.diff)}</div>
            <div class="cc-img-text">
              <div class="cc-cat">${b.catLabel}</div>
              <div class="cc-name">${b.name}</div>
            </div>
          </div>
          <div class="cc-bottom">
            <div class="cc-bottom-row">
              <div class="cc-price-block">
                <span class="cc-price">${b.price}€</span>
                <span class="cc-price-old">${b.oldPrice}€</span>
                <span class="cc-save">−${pct(b)}%</span>
              </div>
            </div>
            <div class="cc-stars">${stars(b.rating)}<span class="cc-stars-count">${b.rating} (${b.ratingCount} avis)</span></div>
            <div class="cc-pills">
              ${b.includes
                .slice(0, 3)
                .map(
                  (inc: any) =>
                    `<span class="cc-pill">${inc.icon} ${inc.label.split("(")[0].trim()}</span>`,
                )
                .join("")}
            </div>
            <div class="cc-actions">
              <button class="btn-detail" data-detail="${b.id}">Voir le détail</button>
              <button class="btn-add" data-add="${b.id}">Ajouter au panier</button>
            </div>
          </div>
        </div>
      `,
        )
        .join("");

      // Rebind events
      grid.querySelectorAll("[data-detail]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openProduct((btn as HTMLElement).dataset.detail!);
        });
      });
      grid.querySelectorAll("[data-add]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          quickAdd((btn as HTMLElement).dataset.add!);
        });
      });
      grid.querySelectorAll(".cat-card").forEach((card) => {
        card.addEventListener("click", () =>
          openProduct((card as HTMLElement).dataset.id!),
        );
      });

      // Cursor hover sur nouvelles cards
      grid.querySelectorAll(".cat-card, button").forEach((el) => {
        el.addEventListener("mouseenter", () => dot.classList.add("hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("hover"));
      });

      // Scroll reveal
      requestAnimationFrame(() => {
        grid.querySelectorAll(".reveal").forEach((el) => {
          if (!el.classList.contains("visible")) revObs.observe(el);
        });
      });
    }

    /* ══ MODAL ══ */
    function openProduct(id: string) {
      const p = BOXES.find((b) => b.id === id);
      if (!p) return;
      currentProduct = p;
      const pct = Math.round((1 - p.price / p.oldPrice) * 100);

      const img = document.getElementById("catModalImg") as HTMLImageElement;
      img.src = p.img;
      img.alt = p.name;

      const badge = document.getElementById("catModalBadge")!;
      badge.textContent = p.badge || "";
      badge.style.display = p.badge ? "block" : "none";
      document.getElementById("catModalPriceBig")!.textContent = p.price + "€";
      document.getElementById("catModalOldBig")!.textContent = p.oldPrice + "€";
      document.getElementById("catModalSaveBig")!.textContent = "−" + pct + "%";
      document.getElementById("catModalCat")!.textContent = p.catLabel;
      document.getElementById("catModalTitle")!.innerHTML = p.name.replace(
        /(Knotless|Vanille|Passion|Boho|Crochet|Perles)/i,
        "<em>$1</em>",
      );
      document.getElementById("catModalSub")!.textContent = p.subtitle;
      document.getElementById("catModalStars")!.textContent = "★".repeat(
        Math.round(p.rating),
      );
      document.getElementById("catModalScore")!.textContent = String(p.rating);
      document.getElementById("catModalRevCount")!.textContent =
        "(" + p.ratingCount + " avis)";

      const diffLabels = ["", "Facile", "Intermédiaire", "Avancée"];
      document.getElementById("catModalMeta")!.innerHTML = `
        <div class="cat-meta-item"><span class="cat-meta-icon">⏱</span> ${p.duration}</div>
        <div class="cat-meta-item">
          <span class="cat-meta-icon">💪</span>
          <div class="cat-meta-dots">${[1, 2, 3].map((i) => `<div class="cat-meta-dot${i <= p.diff ? " on" : ""}"></div>`).join("")}</div>
          ${diffLabels[p.diff]}
        </div>`;

      document.getElementById("catModalDesc")!.textContent = p.desc;

      document.getElementById("catModalIncludes")!.innerHTML = p.includes
        .map(
          (inc: any) =>
            `<div class="cat-m-inc"><span class="cat-m-inc-icon">${inc.icon}</span><span>${inc.label}</span></div>`,
        )
        .join("");

      document.getElementById("catModalRevs")!.innerHTML = p.reviews
        .map(
          (r: any) => `
        <div class="cat-m-rev">
          <div class="cat-m-rev-stars">★★★★★</div>
          <div class="cat-m-rev-text">«${r.text}»</div>
          <div class="cat-m-rev-auth">${r.author}</div>
        </div>`,
        )
        .join("");

      const wb = document.getElementById("catModalWishBtn")!;
      wb.textContent = wishlist.includes(p.id) ? "♥" : "♡";
      wb.classList.toggle("wished", wishlist.includes(p.id));

      const addBtn = document.getElementById("catModalAddBtn")!;
      addBtn.classList.remove("added");
      document.getElementById("catModalAddIcon")!.textContent = "🛒";
      document.getElementById("catModalAddText")!.textContent =
        "Ajouter au panier";

      document.getElementById("catModal")!.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      document.getElementById("catModal")!.classList.remove("open");
      document.body.style.overflow = drawerOpen ? "hidden" : "";
    }

    document.getElementById("catModal")?.addEventListener("click", (e) => {
      const t = e.target as HTMLElement;
      if (t.id === "catModal" || t.classList.contains("cat-modal-backdrop"))
        closeModal();
    });
    document
      .getElementById("catModalCloseBtn")
      ?.addEventListener("click", closeModal);

    document.getElementById("catModalAddBtn")?.addEventListener("click", () => {
      if (!currentProduct) return;
      addToCart({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        img: currentProduct.imgCart,
      });
      document.getElementById("catModalAddBtn")!.classList.add("added");
      document.getElementById("catModalAddIcon")!.textContent = "✓";
      document.getElementById("catModalAddText")!.textContent = "Ajouté !";
      setTimeout(() => closeModal(), 800);
    });

    document
      .getElementById("catModalWishBtn")
      ?.addEventListener("click", () => {
        if (!currentProduct) return;
        const id = currentProduct.id;
        const wb = document.getElementById("catModalWishBtn")!;
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter((w) => w !== id);
          wb.textContent = "♡";
          wb.classList.remove("wished");
          showToast("Retiré des favoris");
        } else {
          wishlist.push(id);
          wb.textContent = "♥";
          wb.classList.add("wished");
          showToast("✦ Ajouté aux favoris !");
        }
      });

    /* ══ PANIER ══ */
    function quickAdd(id: string) {
      const p = BOXES.find((b) => b.id === id);
      if (p)
        addToCart({ id: p.id, name: p.name, price: p.price, img: p.imgCart });
    }

    function addToCart(product: any) {
      const ex = cart.find((i) => i.id === product.id);
      if (ex) ex.qty++;
      else cart.push({ ...product, qty: 1 });
      renderCart();
      showToast("✦ " + product.name + " ajouté !");
      openDrawer();
    }

    function removeFromCart(id: string) {
      cart = cart.filter((i) => i.id !== id);
      renderCart();
    }

    function updateQty(id: string, delta: number) {
      const item = cart.find((i) => i.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) removeFromCart(id);
      else renderCart();
    }

    function renderCart() {
      const count = cart.reduce((s, i) => s + i.qty, 0);
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const badge = document.getElementById("cartBadge")!;
      badge.textContent = String(count);
      badge.style.display = count > 0 ? "flex" : "none";
      document.getElementById("drawerTotal")!.textContent = total + "€";
      const foot = document.getElementById("drawerFoot")!;
      const body = document.getElementById("drawerBody")!;
      if (cart.length === 0) {
        body.innerHTML =
          '<div class="d-empty"><span>🛒</span><p>Ton panier est vide</p></div>';
        foot.style.display = "none";
        return;
      }
      foot.style.display = "block";
      body.innerHTML = cart
        .map(
          (item) => `
        <div class="d-item">
          <img class="d-img" src="${item.img}" alt="${item.name}" onerror="this.style.display='none'">
          <div class="d-info"><div class="d-name">${item.name}</div><div class="d-price">${item.price * item.qty}€</div></div>
          <div class="d-qty">
            <button class="qty-b" data-id="${item.id}" data-delta="-1">−</button>
            <span class="qty-n">${item.qty}</span>
            <button class="qty-b" data-id="${item.id}" data-delta="1">+</button>
          </div>
          <button class="d-rm" data-id="${item.id}">✕</button>
        </div>`,
        )
        .join("");
      body
        .querySelectorAll(".qty-b")
        .forEach((btn) =>
          btn.addEventListener("click", () =>
            updateQty(
              (btn as HTMLElement).dataset.id!,
              parseInt((btn as HTMLElement).dataset.delta!),
            ),
          ),
        );
      body
        .querySelectorAll(".d-rm")
        .forEach((btn) =>
          btn.addEventListener("click", () =>
            removeFromCart((btn as HTMLElement).dataset.id!),
          ),
        );
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
    function toggleDrawer() {
      drawerOpen ? closeDrawer() : openDrawer();
    }

    document
      .getElementById("navCartBtn")
      ?.addEventListener("click", toggleDrawer);
    document
      .getElementById("drawerOverlay")
      ?.addEventListener("click", toggleDrawer);
    document
      .getElementById("drawerCloseBtn")
      ?.addEventListener("click", toggleDrawer);

    document
      .getElementById("checkoutBtn")
      ?.addEventListener("click", async () => {
        if (!cart.length) return;
        const btn = document.getElementById("checkoutBtn") as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Redirection...';
        try {
          const res = await fetch("/api/create-checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: cart.map((i) => ({
                productId: i.id,
                name: i.name,
                price: i.price * 100,
                quantity: i.qty,
              })),
            }),
          });
          const data = await res.json();
          if (data.url) window.location.href = data.url;
          else alert("Erreur de redirection.");
        } catch {
          btn.disabled = false;
          btn.innerHTML = "🔒 Payer maintenant";
          alert("Erreur de connexion.");
        }
      });

    /* ══ TOAST ══ */
    function showToast(msg: string) {
      const t = document.getElementById("toast")!;
      t.textContent = msg;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 2600);
    }

    /* ══ KEYBOARD ══ */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeDrawer();
      }
    });

    /* ══ INIT ══ */
    renderGrid();
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="toast" id="toast"></div>

      {/* NAV */}
      <nav>
        <a className="nav-logo" href="/">
          <svg viewBox="0 0 34 34" fill="none" width="32" height="32">
            <defs>
              <linearGradient id="nG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8C97A" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
            </defs>
            <line
              x1="17"
              y1="3"
              x2="17"
              y2="31"
              stroke="url(#nG)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M5 31 L17 3"
              stroke="url(#nG)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="21"
              x2="17"
              y2="21"
              stroke="url(#nG)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M17 3 Q29 3 29 9 Q29 17 17 17"
              stroke="url(#nG)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M17 17 Q31 17 31 24 Q31 31 17 31"
              stroke="url(#nG)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="17" cy="3" r="2.2" fill="#E8C97A" />
            <circle cx="17" cy="31" r="2.2" fill="#E8C97A" />
          </svg>
          <div>
            <span className="nav-brand">Afro Beauty</span>
            <span className="nav-sub">Box · Beauté · Afro</span>
          </div>
        </a>
        <ul className="nav-links">
          <li>
            <a className="nav-link" href="/">
              Accueil
            </a>
          </li>
          <li>
            <a className="nav-link active" href="/catalogue">
              Catalogue
            </a>
          </li>
          <li>
            <a className="nav-link" href="/#how">
              Comment ça marche
            </a>
          </li>
          <li>
            <a className="nav-link" href="/#reviews">
              Avis
            </a>
          </li>
        </ul>
        <div className="nav-right">
          <div
            className="theme-toggle"
            id="themeToggle"
            title="Changer le thème"
          >
            <div className="theme-toggle-knob">
              <span id="themeIcon">🌙</span>
            </div>
          </div>
          <button className="nav-cart" id="navCartBtn">
            🛒 Panier
            <span
              className="cart-badge"
              id="cartBadge"
              style={{ display: "none" }}
            >
              0
            </span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="cat-hero">
        <div className="cat-hero-lines"></div>
        <div className="cat-hero-content">
          <div className="cat-hero-eyebrow">Collection 2025</div>
          <h1 className="cat-hero-title">
            Choisis ta
            <br />
            <em>coiffure.</em>
          </h1>
          <p className="cat-hero-sub">
            Une box, une coiffure. Tout le matériel, le guide et le tuto vidéo —
            livrés chez toi en 48h.
          </p>
          <div className="cat-stats">
            <div className="cat-stat">
              <div className="cat-stat-num">6</div>
              <div className="cat-stat-lbl">Box disponibles</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-num">500+</div>
              <div className="cat-stat-lbl">Clientes</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-num">4.9★</div>
              <div className="cat-stat-lbl">Note moyenne</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-num">48h</div>
              <div className="cat-stat-lbl">Livraison</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTRES */}
      <div className="filters-bar" id="filtersBar">
        <span className="filter-label">Filtrer par</span>
        <button className="filter-btn active" data-filter="all">
          Toutes <span className="filter-count">6</span>
        </button>
        <button className="filter-btn" data-filter="tresses">
          Tressées <span className="filter-count">2</span>
        </button>
        <button className="filter-btn" data-filter="twists">
          Twists <span className="filter-count">2</span>
        </button>
        <button className="filter-btn" data-filter="crochet">
          Crochet <span className="filter-count">1</span>
        </button>
        <button className="filter-btn" data-filter="boho">
          Boho <span className="filter-count">1</span>
        </button>
      </div>

      {/* GRILLE */}
      <section className="catalogue-section">
        <div className="catalogue-header">
          <div className="cat-result-count" id="resultCount">
            6 box disponibles
          </div>
          <div className="cat-sort">
            <span className="cat-sort-label">Trier</span>
            <select id="sortSelect">
              <option value="default">Popularité</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="diff-asc">Difficulté facile</option>
            </select>
          </div>
        </div>
        <div className="cat-grid" id="catGrid"></div>
      </section>

      {/* MODAL */}
      <div className="cat-modal-overlay" id="catModal">
        <div className="cat-modal-backdrop"></div>
        <div className="cat-modal-box">
          <button className="cat-modal-close" id="catModalCloseBtn">
            ✕
          </button>
          <div className="cat-modal-img-side">
            <img id="catModalImg" src="" alt="" />
            <div className="cat-modal-img-gradient"></div>
            <div className="cat-modal-img-badge" id="catModalBadge"></div>
            <div className="cat-modal-price-overlay">
              <div className="cat-modal-price-big">
                <span id="catModalPriceBig"></span>
                <span className="old" id="catModalOldBig"></span>
                <span className="save" id="catModalSaveBig"></span>
              </div>
            </div>
          </div>
          <div className="cat-modal-content">
            <div className="cat-modal-eyebrow" id="catModalCat"></div>
            <h2 className="cat-modal-title" id="catModalTitle"></h2>
            <div className="cat-modal-subtitle" id="catModalSub"></div>
            <div className="cat-modal-rating">
              <div className="cat-modal-stars" id="catModalStars"></div>
              <span className="cat-modal-score" id="catModalScore"></span>
              <span
                className="cat-modal-rev-count"
                id="catModalRevCount"
              ></span>
            </div>
            <div className="cat-modal-meta" id="catModalMeta"></div>
            <p className="cat-modal-desc" id="catModalDesc"></p>
            <div className="cat-modal-includes-label">Contenu de la box</div>
            <div className="cat-modal-includes" id="catModalIncludes"></div>
            <div className="cat-modal-rev-label">Avis clientes</div>
            <div className="cat-modal-revs" id="catModalRevs"></div>
            <div className="cat-modal-actions">
              <div className="cat-modal-action-btns">
                <button className="btn-cat-add" id="catModalAddBtn">
                  <span id="catModalAddIcon">🛒</span>
                  <span id="catModalAddText">Ajouter au panier</span>
                </button>
                <button
                  className="btn-cat-wish"
                  id="catModalWishBtn"
                  title="Favoris"
                >
                  ♡
                </button>
              </div>
              <div className="cat-guarantee">
                <span className="cat-guarantee-item">Livraison offerte</span>
                <span className="cat-guarantee-item">Retour 14 jours</span>
                <span className="cat-guarantee-item">Paiement sécurisé</span>
                <span className="cat-guarantee-item">Tuto vidéo inclus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <div className="drawer-overlay" id="drawerOverlay"></div>
      <div className="drawer" id="drawer">
        <div className="drawer-head">
          <div className="drawer-title">Mon panier</div>
          <button className="drawer-close" id="drawerCloseBtn">
            ✕
          </button>
        </div>
        <div className="drawer-body" id="drawerBody">
          <div className="d-empty">
            <span>🛒</span>
            <p>Ton panier est vide</p>
          </div>
        </div>
        <div
          className="drawer-foot"
          id="drawerFoot"
          style={{ display: "none" }}
        >
          <div className="d-total">
            <span className="d-total-lbl">Total</span>
            <span className="d-total-price" id="drawerTotal">
              0€
            </span>
          </div>
          <button className="d-checkout" id="checkoutBtn">
            🔒 Payer maintenant
          </button>
          <p className="d-note">
            Paiement sécurisé · Visa · Mastercard · Apple Pay
          </p>
        </div>
      </div>
    </>
  );
}

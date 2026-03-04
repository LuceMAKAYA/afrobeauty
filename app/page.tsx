"use client";
import { useEffect } from "react";

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
    img: "/boxes/natte.jpg",
    imgCart: "/boxes/natte.jpg",
    desc: "Des nattes classiques sublimées par des perles dorées, argentées ou colorées. La box inclut une sélection de perles assorties pour personnaliser entièrement ta coiffure.",
    includes: [
      { icon: "🧶", label: "Mèches lisses premium (3 paquets)" },
      { icon: "🪮", label: "Peigne à queue + crochet" },
      { icon: "✨", label: "Set de perles assorties" },
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
    img: "./images/twist vanille.jpg",
    imgCart: "./images/twist vanille.jpg",
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
    img: "./boxes/twist.jpg",
    imgCart: "./images/twist.jpg",
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
    img: "/boxes/crochet.jpg",
    imgCart: "/boxes/crochet.jpg",
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
    img: "/boxes/braid 1.jpg",
    imgCart: "/boxes/braid 1.jpg",
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

export default function Home() {
  useEffect(() => {
    /* ══ THÈME ══ */
    let theme = localStorage.getItem("abTheme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    syncThemeIcon();
    function syncThemeIcon() {
      const el = document.getElementById("themeIcon");
      if (el) el.textContent = theme === "dark" ? "🌙" : "☀️";
    }
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("abTheme", theme);
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
    document
      .querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach((el) => revObs.observe(el));

    /* ══ PARALLAX + NAV SHADOW ══ */
    const heroBg = document.querySelector(".hero-bg-img") as HTMLElement;
    window.addEventListener(
      "scroll",
      () => {
        const s = window.scrollY;
        if (s < window.innerHeight && heroBg)
          heroBg.style.transform = `translateY(${s * 0.3}px)`;
        const nav = document.querySelector("nav") as HTMLElement;
        if (nav)
          nav.style.boxShadow = s > 60 ? "0 8px 40px rgba(0,0,0,.3)" : "none";
      },
      { passive: true },
    );

    /* ══ SCROLL LINKS ══ */
    document.querySelectorAll("[data-scroll]").forEach((el) => {
      el.addEventListener("click", () => {
        document
          .getElementById((el as HTMLElement).dataset.scroll!)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    });

    /* ══ FILTRES CATALOGUE ══ */
    let activeFilter = "all";
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

    function renderGrid() {
      const boxes = getFiltered();
      const grid = document.getElementById("catGrid")!;
      const cnt = document.getElementById("resultCount");
      if (cnt)
        cnt.textContent =
          boxes.length + " box disponible" + (boxes.length > 1 ? "s" : "");

      const pct = (b: any) => Math.round((1 - b.price / b.oldPrice) * 100);
      const stars = (r: number) =>
        "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
      const dots = (d: number) =>
        [1, 2, 3]
          .map(
            (i) => `<div class="cc-diff-dot${i <= d ? " filled" : ""}"></div>`,
          )
          .join("");

      grid.innerHTML = boxes
        .map(
          (b, i) => `
        <div class="cat-card reveal" data-id="${b.id}" style="animation-delay:${i * 0.08}s">
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
            <div class="cc-price-block">
              <span class="cc-price">${b.price}€</span>
              <span class="cc-price-old">${b.oldPrice}€</span>
              <span class="cc-save">−${pct(b)}%</span>
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
        </div>`,
        )
        .join("");

      grid.querySelectorAll("[data-detail]").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openProduct((btn as HTMLElement).dataset.detail!);
        }),
      );
      grid.querySelectorAll("[data-add]").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          quickAdd((btn as HTMLElement).dataset.add!);
        }),
      );
      grid
        .querySelectorAll(".cat-card")
        .forEach((card) =>
          card.addEventListener("click", () =>
            openProduct((card as HTMLElement).dataset.id!),
          ),
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

    /* ══ MODAL ══ */
    let currentProduct: any = null;
    let wishlist: string[] = [];
    let drawerOpen = false;

    function openProduct(id: string) {
      const p = BOXES.find((b) => b.id === id);
      if (!p) return;
      currentProduct = p;
      const pct = Math.round((1 - p.price / p.oldPrice) * 100);

      const img = document.getElementById("modalImg") as HTMLImageElement;
      img.src = p.img;
      img.alt = p.name;

      const badge = document.getElementById("modalBadge")!;
      badge.textContent = p.badge || "";
      badge.style.display = p.badge ? "block" : "none";
      document.getElementById("modalPriceBig")!.textContent = p.price + "€";
      document.getElementById("modalOldBig")!.textContent = p.oldPrice + "€";
      document.getElementById("modalSaveBig")!.textContent = "−" + pct + "%";
      document.getElementById("modalCat")!.textContent = p.catLabel;
      document.getElementById("modalTitle")!.innerHTML = p.name.replace(
        /(Knotless|Vanille|Passion|Boho|Crochet|Perles)/i,
        "<em>$1</em>",
      );
      document.getElementById("modalSub")!.textContent = p.subtitle;
      document.getElementById("modalStars")!.textContent = "★".repeat(
        Math.round(p.rating),
      );
      document.getElementById("modalScore")!.textContent = String(p.rating);
      document.getElementById("modalRevCount")!.textContent =
        "(" + p.ratingCount + " avis)";

      const diffLabels = ["", "Facile", "Intermédiaire", "Avancée"];
      document.getElementById("modalMeta")!.innerHTML = `
        <div class="cat-meta-item"><span class="cat-meta-icon">⏱</span> ${p.duration}</div>
        <div class="cat-meta-item">
          <span class="cat-meta-icon">💪</span>
          <div class="cat-meta-dots">${[1, 2, 3].map((i) => `<div class="cat-meta-dot${i <= p.diff ? " on" : ""}"></div>`).join("")}</div>
          ${diffLabels[p.diff]}
        </div>`;

      document.getElementById("modalDesc")!.textContent = p.desc;

      document.getElementById("modalIncludes")!.innerHTML = p.includes
        .map(
          (inc: any) =>
            `<div class="cat-m-inc"><span class="cat-m-inc-icon">${inc.icon}</span><span>${inc.label}</span></div>`,
        )
        .join("");

      document.getElementById("modalRevs")!.innerHTML = p.reviews
        .map(
          (r: any) => `
        <div class="cat-m-rev">
          <div class="cat-m-rev-stars">★★★★★</div>
          <div class="cat-m-rev-text">«${r.text}»</div>
          <div class="cat-m-rev-auth">${r.author}</div>
        </div>`,
        )
        .join("");

      const wb = document.getElementById("modalWishBtn")!;
      wb.textContent = wishlist.includes(p.id) ? "♥" : "♡";
      wb.classList.toggle("wished", wishlist.includes(p.id));

      document.getElementById("modalAddBtn")!.classList.remove("added");
      document.getElementById("modalAddIcon")!.textContent = "🛒";
      document.getElementById("modalAddText")!.textContent =
        "Ajouter au panier";

      document.getElementById("productModal")!.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeProduct() {
      document.getElementById("productModal")!.classList.remove("open");
      document.body.style.overflow = drawerOpen ? "hidden" : "";
    }

    document.getElementById("productModal")?.addEventListener("click", (e) => {
      const t = e.target as HTMLElement;
      if (t.id === "productModal" || t.classList.contains("modal-backdrop"))
        closeProduct();
    });
    document
      .getElementById("modalCloseBtn")
      ?.addEventListener("click", closeProduct);

    document.getElementById("modalAddBtn")?.addEventListener("click", () => {
      if (!currentProduct) return;
      addToCart({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        img: currentProduct.imgCart,
      });
      document.getElementById("modalAddBtn")!.classList.add("added");
      document.getElementById("modalAddIcon")!.textContent = "✓";
      document.getElementById("modalAddText")!.textContent = "Ajouté !";
      setTimeout(() => closeProduct(), 800);
    });

    document.getElementById("modalWishBtn")?.addEventListener("click", () => {
      if (!currentProduct) return;
      const id = currentProduct.id;
      const wb = document.getElementById("modalWishBtn")!;
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
    let cart: any[] = [];

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
      if (!cart.length) {
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
  }, []);

  /* ════════════════ JSX ════════════════ */
  return (
    <>
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="toast" id="toast"></div>

      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#">
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
            <span className="nav-link" data-scroll="boxes">
              Nos box
            </span>
          </li>
          <li>
            <span className="nav-link" data-scroll="how">
              Comment ça marche
            </span>
          </li>
          <li>
            <span className="nav-link" data-scroll="reviews">
              Avis
            </span>
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
      <section className="hero">
        <div className="hero-bg-img"></div>
        <div className="hero-dark-overlay"></div>
        <div className="hero-particles" id="particles"></div>
        <div className="hero-content">
          <div className="hero-tag">✦ La box beauté afro</div>
          <h1 className="hero-title">
            Coiffée,
            <br />
            <em>confiante,</em>
            <br />
            toi.
          </h1>
          <p className="hero-sub">
            Tout ce qu&apos;il te faut dans une box — mèches, accessoires &amp;
            tuto vidéo inclus.
          </p>
          <div className="hero-btns">
            <button className="btn-bord" data-scroll="boxes">
              Choisir ma box
            </button>
            <button className="btn-outline" data-scroll="how">
              Comment ça marche
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <div>
              <div className="hstat-num">500+</div>
              <div className="hstat-lbl">Clientes</div>
            </div>
          </div>
          <div className="hstat">
            <div>
              <div className="hstat-num">4.9★</div>
              <div className="hstat-lbl">Note moyenne</div>
            </div>
          </div>
          <div className="hstat">
            <div>
              <div className="hstat-num">48h</div>
              <div className="hstat-lbl">Livraison</div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* STRIP */}
      <div className="strip">
        <div className="strip-track">
          {[
            "Livraison offerte en France",
            "Tuto vidéo inclus",
            "Paiement Stripe sécurisé",
            "Retours gratuits sous 14 jours",
            "4.9★ sur 500+ avis vérifiés",
            "Mèches premium sélectionnées",
            "Livraison offerte en France",
            "Tuto vidéo inclus",
            "Paiement Stripe sécurisé",
            "Retours gratuits sous 14 jours",
            "4.9★ sur 500+ avis vérifiés",
            "Mèches premium sélectionnées",
          ].map((t, i) => (
            <div key={i} className="strip-item">
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* ══ CATALOGUE INTÉGRÉ ══ */}
      <section className="boxes-section" id="boxes">
        {/* En-tête */}
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
            Une box, une coiffure.
            <br />
            Tout est inclus.
          </p>
        </div>

        {/* Filtres */}
        <div className="filters-inline">
          <span className="filter-label">Filtrer</span>
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
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span className="filter-label" id="resultCount">
              6 box
            </span>
            <select id="sortSelect" className="sort-select">
              <option value="default">Popularité</option>
              <option value="price-asc">Prix ↑</option>
              <option value="price-desc">Prix ↓</option>
              <option value="diff-asc">Plus facile</option>
            </select>
          </div>
        </div>

        {/* Grille */}
        <div className="cat-grid" id="catGrid"></div>
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
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-3)",
              maxWidth: "260px",
              lineHeight: "1.7",
              textAlign: "right",
            }}
            className="reveal-right"
          >
            4 étapes, zéro prise de tête.
          </p>
        </div>
        <div className="how-grid">
          {[
            {
              n: "1",
              icon: "💆🏾‍♀️",
              h: "Choisis ta coiffure",
              p: "Braids, twists, knotless… Tu sélectionnes la box de la coiffure que tu veux réaliser.",
            },
            {
              n: "2",
              icon: "📦",
              h: "On prépare ta box",
              p: "Mèches, accessoires, guide illustré et QR code tuto — tout est dedans, sans oubli.",
            },
            {
              n: "3",
              icon: "🚚",
              h: "Livraison en 48h",
              p: "Partout en France et en Europe. Emballage soigné, livraison suivie.",
            },
            {
              n: "4",
              icon: "✨",
              h: "Tu brilles",
              p: "Suis le tuto vidéo exclusif, utilise le guide et obtiens la coiffure que tu voulais.",
            },
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

      {/* REVIEWS */}
      <section className="reviews-section" id="reviews">
        <div className="reviews-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">Avis clients</div>
            <h2 className="sec-title">
              Elles parlent
              <br />
              mieux que <em>nous.</em>
            </h2>
          </div>
          <div className="reviews-score reveal-right">
            <div className="score-big">4.9</div>
            <div className="score-stars">★★★★★</div>
            <div className="score-lbl">+500 avis vérifiés</div>
          </div>
        </div>
        <div className="reviews-grid">
          {[
            {
              tag: "Knotless Braids",
              text: "J'ai réussi mes knotless du premier coup grâce au tuto. Je suis trop fière !",
              av: "A",
              name: "Aminata D.",
              city: "Paris · il y a 2 semaines",
            },
            {
              tag: "Crochet Braids",
              text: "En 1h30 j'avais une coiffure de rêve. L'aiguille crochet incluse change tout !",
              av: "B",
              name: "Binta F.",
              city: "Lyon · il y a 1 mois",
            },
            {
              tag: "Boho Braids",
              text: "La coiffure la plus belle que j'ai jamais portée. Tout le monde me demande où je l'ai apprise !",
              av: "S",
              name: "Safi O.",
              city: "Bordeaux · il y a 3 semaines",
            },
          ].map((r, i) => (
            <div key={i} className={`review-card reveal delay-${i + 1}`}>
              <div className="rev-tag">{r.tag}</div>
              <div className="rev-stars">★★★★★</div>
              <div className="rev-text">&ldquo;{r.text}&rdquo;</div>
              <div className="rev-author">
                <div className="rev-av">{r.av}</div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-city">{r.city}</div>
                </div>
              </div>
            </div>
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
          <p className="cta-sub">
            Rejoins les 500+ femmes qui ont dit stop à la galère.
          </p>
          <button className="btn-gold" data-scroll="boxes">
            Choisir ma box →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <svg viewBox="0 0 34 34" fill="none" width="28" height="28">
                <defs>
                  <linearGradient id="fG" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8C97A" />
                    <stop offset="100%" stopColor="#8B6914" />
                  </linearGradient>
                </defs>
                <line
                  x1="17"
                  y1="3"
                  x2="17"
                  y2="31"
                  stroke="url(#fG)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 31 L17 3"
                  stroke="url(#fG)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <line
                  x1="8"
                  y1="21"
                  x2="17"
                  y2="21"
                  stroke="url(#fG)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M17 3 Q29 3 29 9 Q29 17 17 17"
                  stroke="url(#fG)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M17 17 Q31 17 31 24 Q31 31 17 31"
                  stroke="url(#fG)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="17" cy="3" r="2.2" fill="#E8C97A" />
                <circle cx="17" cy="31" r="2.2" fill="#E8C97A" />
              </svg>
              <div>
                <span className="nav-brand" style={{ fontSize: "15px" }}>
                  Afro Beauty
                </span>
                <span className="nav-sub" style={{ display: "block" }}>
                  Box · Beauté · Afro
                </span>
              </div>
            </div>
            <p className="footer-brand-p">
              La box qui te livre tout pour te coiffer, sans chercher.
            </p>
          </div>
          <div className="footer-col">
            <h5>Box</h5>
            <ul>
              <li>
                <span className="footer-link" data-scroll="boxes">
                  Knotless Braids
                </span>
              </li>
              <li>
                <span className="footer-link" data-scroll="boxes">
                  Nattes avec Perles
                </span>
              </li>
              <li>
                <span className="footer-link" data-scroll="boxes">
                  Twist Vanille
                </span>
              </li>
              <li>
                <span className="footer-link" data-scroll="boxes">
                  Crochet Braids
                </span>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Aide</h5>
            <ul>
              <li>
                <a href="#">Livraison</a>
              </li>
              <li>
                <a href="#">Retours</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Suivre</h5>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">TikTok</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2025 <span>Afro Beauty</span> · Tous droits réservés
          </div>
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </footer>

      {/* MODAL PRODUIT */}
      <div className="modal-overlay" id="productModal">
        <div className="modal-backdrop"></div>
        <div className="modal-box">
          <button className="modal-close" id="modalCloseBtn">
            ✕
          </button>
          <div className="modal-img-side">
            <img id="modalImg" src="" alt="" />
            <div className="modal-img-gradient"></div>
            <div className="modal-img-badge" id="modalBadge"></div>
            <div className="modal-price-overlay">
              <div className="modal-price-big">
                <span id="modalPriceBig"></span>
                <span className="old" id="modalOldBig"></span>
                <span className="save" id="modalSaveBig"></span>
              </div>
            </div>
          </div>
          <div className="modal-content-side">
            <div className="modal-eyebrow" id="modalCat"></div>
            <h2 className="modal-title" id="modalTitle"></h2>
            <div className="modal-subtitle" id="modalSub"></div>
            <div className="modal-rating">
              <div className="modal-stars" id="modalStars"></div>
              <span className="modal-score" id="modalScore"></span>
              <span className="modal-rev-count" id="modalRevCount"></span>
            </div>
            <div className="modal-meta" id="modalMeta"></div>
            <p className="modal-desc" id="modalDesc"></p>
            <div className="modal-includes-title">Contenu de la box</div>
            <div className="modal-includes-grid" id="modalIncludes"></div>
            <div className="modal-reviews-label">Avis clientes</div>
            <div className="modal-revs-list" id="modalRevs"></div>
            <div className="modal-actions">
              <div className="modal-btn-row">
                <button className="btn-modal-add" id="modalAddBtn">
                  <span id="modalAddIcon">🛒</span>
                  <span id="modalAddText">Ajouter au panier</span>
                </button>
                <button className="btn-modal-wish" id="modalWishBtn">
                  ♡
                </button>
              </div>
              <div className="modal-guarantee">
                <span className="guarantee-item">Livraison offerte</span>
                <span className="guarantee-item">Retour 14 jours</span>
                <span className="guarantee-item">Paiement sécurisé</span>
                <span className="guarantee-item">Tuto vidéo inclus</span>
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

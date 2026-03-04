"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    /* ══ THÈME ══ */
    let currentTheme = localStorage.getItem("abTheme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeUI();

    function toggleTheme() {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("abTheme", currentTheme);
      updateThemeUI();
    }
    function updateThemeUI() {
      const icon = document.getElementById("themeIcon");
      if (icon) icon.textContent = currentTheme === "dark" ? "🌙" : "☀️";
    }
    document.getElementById("themeToggle")!.onclick = toggleTheme;

    /* ══ CURSEUR SIMPLE ══ */
    const dot = document.getElementById("cursorDot")!;
    document.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });
    document
      .querySelectorAll(
        "button, a, .box-card, .box-featured, .how-step, .review-card",
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () => dot.classList.add("hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("hover"));
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
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach((el) => obs.observe(el));

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

    /* ══ PRODUITS ══ */
    const PRODUCTS: Record<string, any> = {
      knotless: {
        id: "knotless",
        name: "Box Knotless",
        titleHtml: "Box <em>Knotless</em>",
        subtitle: "Braids sans noeuds",
        category: "Coiffure tressée · Best-seller",
        badge: "⭐ Best-seller",
        reviews: "142 avis vérifiés",
        desc: "Notre box la plus populaire. Tout ce qu'il faut pour des knotless braids parfaites — mèches premium, accessoires, tuto vidéo pas à pas.",
        price: 49,
        oldPrice: 65,
        img: "https://images.unsplash.com/photo-1614104895792-1d6cb01bce78?w=900&q=80",
        imgCart:
          "https://images.unsplash.com/photo-1614104895792-1d6cb01bce78?w=200&q=80",
        includes: [
          { icon: "🧶", label: "Mèches knotless premium (3 paquets)" },
          { icon: "🪮", label: "Peigne à queue professionnel" },
          { icon: "🔴", label: "Élastiques noirs assortis (x50)" },
          { icon: "💧", label: "Huile de soin pour les pointes" },
          { icon: "📋", label: "Guide illustré étape par étape" },
          { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
        ],
      },
      braids: {
        id: "braids",
        name: "Box Braids",
        titleHtml: "Box <em>Braids</em>",
        subtitle: "Box braids classiques",
        category: "Coiffure tressée · Nouveau",
        badge: "Nouveau",
        reviews: "87 avis vérifiés",
        desc: "La box braids classique revisitée. Des mèches de qualité supérieure pour un résultat net, durable et sans casse.",
        price: 39,
        oldPrice: 52,
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80",
        imgCart:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
        includes: [
          { icon: "🧶", label: "Mèches lisses premium (3 paquets)" },
          { icon: "🪮", label: "Peigne à queue + démêloir" },
          { icon: "🔴", label: "Élastiques noirs assortis" },
          { icon: "✨", label: "Spray brillance finition" },
          { icon: "📋", label: "Guide illustré étape par étape" },
          { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
        ],
      },
      twists: {
        id: "twists",
        name: "Box Passion Twists",
        titleHtml: "Box <em>Passion Twists</em>",
        subtitle: "Look bohème & romantique",
        category: "Coiffure twistée · Tendance",
        badge: "Tendance",
        reviews: "63 avis vérifiés",
        desc: "Des passion twists bohèmes et romantiques. Le look tendance TikTok, sans les heures de recherche.",
        price: 42,
        oldPrice: 56,
        img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80",
        imgCart:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
        includes: [
          { icon: "🧶", label: "Mèches frisées passion (4 paquets)" },
          { icon: "🪮", label: "Peigne à queue fin" },
          { icon: "💧", label: "Mousse coiffante légère" },
          { icon: "✨", label: "Huile brillance finition" },
          { icon: "📋", label: "Guide illustré étape par étape" },
          { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
        ],
      },
      budget: {
        id: "budget",
        name: "Budget Queen",
        titleHtml: "<em>Budget Queen</em>",
        subtitle: "Qualité max, prix mini",
        category: "Gamme Étudiante ✦",
        badge: "✦ Étudiante",
        reviews: "198 avis vérifiés",
        desc: "Parce que chaque reine mérite d'être coiffée. La même qualité, les mêmes tutos, au prix le plus accessible.",
        price: 29,
        oldPrice: 39,
        img: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=900&q=80",
        imgCart:
          "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=200&q=80",
        includes: [
          { icon: "🧶", label: "Mèches sélectionnées qualité" },
          { icon: "🪮", label: "Accessoires essentiels" },
          { icon: "📋", label: "Guide illustré complet" },
          { icon: "📱", label: "QR code · Tuto vidéo exclusif" },
          { icon: "💌", label: "Carte de bienvenue" },
          { icon: "💛", label: "Accès communauté privée" },
        ],
      },
    };

    /* ══ MODAL ══ */
    let currentProduct: any = null;
    let wishlist: string[] = [];
    let modalOpen = false;

    function openProduct(id: string) {
      const p = PRODUCTS[id];
      if (!p) return;
      currentProduct = p;
      const pct = Math.round((1 - p.price / p.oldPrice) * 100);
      const imgEl = document.getElementById("modalImg") as HTMLImageElement;
      imgEl.src = p.img;
      imgEl.alt = p.name;
      const s = (id: string, val: string, html = false) => {
        const el = document.getElementById(id);
        if (el) html ? (el.innerHTML = val) : (el.textContent = val);
      };
      s("modalBadge", p.badge);
      s("modalImgPrice", p.price + "€");
      s("modalImgOld", p.oldPrice + "€");
      s("modalImgSave", "−" + pct + "%");
      s("modalCat", p.category);
      s("modalTitle", p.titleHtml, true);
      s("modalSubtitle", p.subtitle);
      s("modalReviews", p.reviews);
      s("modalDesc", p.desc);
      s("modalPriceMain", p.price + "€");
      s("modalPriceOld", p.oldPrice + "€");
      s("modalSaveTag", "−" + pct + "%");
      const inc = document.getElementById("modalIncludes")!;
      inc.innerHTML = p.includes
        .map(
          (i: any) =>
            `<div class="m-include"><span class="m-include-icon">${i.icon}</span><span>${i.label}</span></div>`,
        )
        .join("");
      const wb = document.getElementById("modalWishBtn")!;
      wb.textContent = wishlist.includes(p.id) ? "♥" : "♡";
      wb.classList.toggle("wished", wishlist.includes(p.id));
      document.getElementById("modalAddBtn")!.classList.remove("added");
      s("modalAddIcon", "🛒");
      s("modalAddText", "Ajouter au panier");
      modalOpen = true;
      document.getElementById("productModal")!.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeProduct() {
      modalOpen = false;
      document.getElementById("productModal")!.classList.remove("open");
      document.body.style.overflow = drawerOpen ? "hidden" : "";
    }

    document.getElementById("productModal")!.addEventListener("click", (e) => {
      const t = e.target as HTMLElement;
      if (t.id === "productModal" || t.classList.contains("modal-backdrop"))
        closeProduct();
    });
    document
      .getElementById("modalCloseBtn")!
      .addEventListener("click", closeProduct);

    document.getElementById("modalAddBtn")!.addEventListener("click", () => {
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

    document.getElementById("modalWishBtn")!.addEventListener("click", () => {
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

    document.querySelectorAll("[data-product]").forEach((el) => {
      el.addEventListener("click", () =>
        openProduct((el as HTMLElement).dataset.product!),
      );
    });

    /* ══ PANIER ══ */
    let cart: any[] = [];
    let drawerOpen = false;

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
      body.querySelectorAll(".qty-b").forEach((btn) =>
        btn.addEventListener("click", () => {
          updateQty(
            (btn as HTMLElement).dataset.id!,
            parseInt((btn as HTMLElement).dataset.delta!),
          );
        }),
      );
      body.querySelectorAll(".d-rm").forEach((btn) =>
        btn.addEventListener("click", () => {
          removeFromCart((btn as HTMLElement).dataset.id!);
        }),
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
      .getElementById("navCartBtn")!
      .addEventListener("click", toggleDrawer);
    document
      .getElementById("drawerOverlay")!
      .addEventListener("click", toggleDrawer);
    document
      .getElementById("drawerCloseBtn")!
      .addEventListener("click", toggleDrawer);

    document.querySelectorAll("[data-add-cart]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const el = btn as HTMLElement;
        addToCart({
          id: el.dataset.addCart,
          name: el.dataset.name,
          price: Number(el.dataset.price),
          img: el.dataset.img,
        });
      });
    });

    /* ══ CHECKOUT ══ */
    document
      .getElementById("checkoutBtn")!
      .addEventListener("click", async () => {
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
        closeProduct();
        closeDrawer();
      }
    });
  }, []);

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

      {/* NOS BOX */}
      <section className="boxes-section" id="boxes">
        <div className="boxes-header">
          <div className="reveal-left">
            <div className="sec-eyebrow">Nos box</div>
            <h2 className="sec-title">
              La coiffure
              <br />
              que tu <em>veux.</em>
            </h2>
          </div>
          <p className="boxes-header-note reveal-right">
            Tout est inclus.
            <br />
            Rien à chercher.
          </p>
        </div>

        {/* FEATURED */}
        <div className="box-featured reveal-scale" data-product="knotless">
          <div className="feat-img-wrap">
            <div className="feat-badge">⭐ Best-seller</div>
            <img
              src="https://images.unsplash.com/photo-1614104895792-1d6cb01bce78?w=900&q=80"
              alt="Knotless braids"
            />
            <div className="feat-img-gradient"></div>
          </div>
          <div className="feat-info">
            <div className="feat-cat">Coiffure tressée</div>
            <div className="feat-title">
              Box <em>Knotless</em>
            </div>
            <p className="feat-desc">
              Braids sans nœuds, légères et naturelles. Notre box la plus
              demandée.
            </p>
            <div className="feat-pills">
              <div className="pill">🧶 Mèches premium</div>
              <div className="pill">🪮 Accessoires</div>
              <div className="pill">💧 Huile de soin</div>
              <div className="pill">📱 Tuto vidéo</div>
              <div className="pill">📋 Guide illustré</div>
              <div className="pill">🚚 Livraison offerte</div>
            </div>
            <div className="feat-price-row">
              <div className="feat-price">49€</div>
              <div className="feat-old">65€</div>
              <div className="feat-save">−25%</div>
              <button
                className="btn-bord"
                data-add-cart="knotless"
                data-name="Box Knotless"
                data-price="49"
                data-img="https://images.unsplash.com/photo-1614104895792-1d6cb01bce78?w=200&q=80"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="boxes-grid">
          <div className="box-card reveal delay-1" data-product="braids">
            <div className="card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80"
                alt="Box Braids"
              />
              <div className="card-img-overlay"></div>
              <div className="card-badge">Nouveau</div>
              <div className="card-img-info">
                <div className="card-cat">Coiffure tressée</div>
                <div className="card-name">Box Braids</div>
                <div className="card-sub">Classiques &amp; durables</div>
              </div>
            </div>
            <div className="card-bottom">
              <div>
                <span className="card-price">39€</span>
                <span className="card-price-old">52€</span>
              </div>
              <button
                className="btn-sm"
                data-add-cart="braids"
                data-name="Box Braids"
                data-price="39"
                data-img="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80"
              >
                Commander
              </button>
            </div>
          </div>

          <div className="box-card reveal delay-2" data-product="twists">
            <div className="card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80"
                alt="Passion Twists"
              />
              <div className="card-img-overlay"></div>
              <div className="card-img-info">
                <div className="card-cat">Coiffure twistée</div>
                <div className="card-name">Passion Twists</div>
                <div className="card-sub">Bohème &amp; romantique</div>
              </div>
            </div>
            <div className="card-bottom">
              <div>
                <span className="card-price">42€</span>
                <span className="card-price-old">56€</span>
              </div>
              <button
                className="btn-sm"
                data-add-cart="twists"
                data-name="Box Passion Twists"
                data-price="42"
                data-img="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80"
              >
                Commander
              </button>
            </div>
          </div>

          <div className="box-card reveal delay-3" data-product="budget">
            <div className="card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=600&q=80"
                alt="Budget Queen"
              />
              <div className="card-img-overlay"></div>
              <div
                className="card-badge"
                style={{ background: "var(--gold-d)" }}
              >
                ✦ Étudiante
              </div>
              <div className="card-img-info">
                <div className="card-cat">Budget accessible</div>
                <div className="card-name">Budget Queen</div>
                <div className="card-sub">Qualité max, prix mini</div>
              </div>
            </div>
            <div className="card-bottom">
              <div>
                <span className="card-price">29€</span>
                <span className="card-price-old">39€</span>
              </div>
              <button
                className="btn-sm"
                data-add-cart="budget"
                data-name="Budget Queen"
                data-price="29"
                data-img="https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=200&q=80"
              >
                Commander
              </button>
            </div>
          </div>
        </div>
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
              tag: "Box Knotless",
              text: "J'ai réussi mes knotless du premier coup grâce au tuto. Je suis trop fière !",
              av: "A",
              name: "Aminata D.",
              city: "Paris · il y a 2 semaines",
            },
            {
              tag: "Box Braids",
              text: "La qualité des mèches est top. Tout est dans la box, j'ai rien eu à acheter en plus !",
              av: "F",
              name: "Fatou K.",
              city: "Lyon · il y a 1 mois",
            },
            {
              tag: "Budget Queen",
              text: "Étudiante avec petit budget, le résultat est vraiment beau. Le packaging est trop joli !",
              av: "N",
              name: "Nadia M.",
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
                <a href="#">Box Knotless</a>
              </li>
              <li>
                <a href="#">Box Braids</a>
              </li>
              <li>
                <a href="#">Passion Twists</a>
              </li>
              <li>
                <a href="#">Budget Queen</a>
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
            <div className="modal-img-overlay-text">
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span className="modal-img-price" id="modalImgPrice"></span>
                <span className="modal-img-old" id="modalImgOld"></span>
                <span className="modal-img-save" id="modalImgSave"></span>
              </div>
            </div>
          </div>
          <div className="modal-content-side">
            <div className="modal-eyebrow" id="modalCat"></div>
            <h2 className="modal-title" id="modalTitle"></h2>
            <div className="modal-subtitle" id="modalSubtitle"></div>
            <div className="modal-stars">★★★★★</div>
            <div className="modal-reviews-count" id="modalReviews"></div>
            <p className="modal-desc" id="modalDesc"></p>
            <div className="modal-includes-title">Contenu de la box</div>
            <div className="modal-includes-grid" id="modalIncludes"></div>
            <div className="modal-actions">
              <div className="modal-price-row">
                <div className="modal-price-main" id="modalPriceMain"></div>
                <div className="modal-price-old" id="modalPriceOld"></div>
                <div className="modal-save-tag" id="modalSaveTag"></div>
              </div>
              <div className="modal-btn-row">
                <button className="btn-modal-add" id="modalAddBtn">
                  <span id="modalAddIcon">🛒</span>
                  <span id="modalAddText">Ajouter au panier</span>
                </button>
                <button
                  className="btn-modal-wish"
                  id="modalWishBtn"
                  title="Favoris"
                >
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

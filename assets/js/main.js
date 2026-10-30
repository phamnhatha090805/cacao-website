/* Bazan Cacao — header, footer, giỏ hàng, form, chatbot */
(function () {
  "use strict";
  var BZ = window.BZ;
  var cfg = BZ.config;

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function money(n) { return n.toLocaleString("vi-VN") + "đ"; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function plain(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase(); }
  function product(id) { return BZ.products.find(function (p) { return p.id === id; }); }
  function page() { var f = location.pathname.split("/").pop(); return f || "index.html"; }

  var I = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 10h8M8 13h5"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12 20 4l-6 16-3-7-7-1Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.7 3.6 3.9 3.8v3a7 7 0 0 1-3.9-1.2v6.2A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2 2.7V3h3.8Z"/></svg>',
    shopee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4.5 8h15l-1 12.5h-13L4.5 8Z"/><path d="M8.5 8a3.5 3.5 0 0 1 7 0"/><path d="M14 12.2c-.6-.5-1.3-.7-2-.7-1 0-1.8.5-1.8 1.3 0 1.8 4 1 4 2.9 0 .9-.9 1.5-2.1 1.5-.8 0-1.6-.3-2.2-.8"/></svg>'
  };
  BZ.icons = I;

  var NAV = [
    ["san-pham.html", "Sản phẩm"],
    ["qua-tang.html", "Quà tặng"],
    ["doanh-nghiep.html", "Giải pháp B2B"],
    ["blog.html", "Blog"],
    ["cau-chuyen.html", "Về chúng tôi"],
    ["lien-he.html", "Liên hệ"]
  ];
  var SOCIAL = [
    ["facebook", "Facebook"], ["instagram", "Instagram"], ["shopee", "Shopee"], ["tiktok", "TikTok Shop"]
  ];

  /* ---------- Cart store (localStorage, an toàn khi bị chặn) ---------- */
  var CART_KEY = "bz-cart";
  var memCart = [];
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return memCart; }
  }
  function saveCart(c) {
    memCart = c;
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    updateCount();
  }
  function addToCart(id, variant, qty) {
    var c = getCart();
    var line = c.find(function (l) { return l.id === id && l.v === variant; });
    if (line) line.q += qty; else c.push({ id: id, v: variant, q: qty });
    saveCart(c);
  }
  function linePrice(l) {
    var p = product(l.id);
    var v = p && p.variants.find(function (x) { return x.label === l.v; });
    return v ? v.price * l.q : 0;
  }
  function updateCount() {
    var n = getCart().reduce(function (s, l) { return s + l.q; }, 0);
    $$(".cart-count").forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
  }

  function packHTML(p, size) {
    return '<div class="pack' + (p.combo ? " pack--combo" : "") + '"><div class="pack__box" style="--c1:' + p.colors[0] + ";--c2:" + p.colors[1] + '">' +
      '<span class="pack__brand">Bazan Cacao</span><span class="pack__name">' + esc(p.name) + '</span><span class="pack__size">' + esc(size || p.variants[0].label) + "</span></div></div>";
  }
  BZ.packHTML = packHTML;

  /* ---------- Header ---------- */
  function renderHeader() {
    var el = $("#site-header");
    if (!el) return;
    var cur = page();
    if (cur === "san-pham-chi-tiet.html") cur = "san-pham.html";
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === cur ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
    el.outerHTML =
      '<header class="header"><div class="wrap header__bar">' +
      '<a class="logo" href="index.html" aria-label="Bazan Cacao — Trang chủ"><img class="logo__mark" src="assets/img/logo-mark.png" alt=""><img class="logo__word" src="assets/img/logo-word.png" alt="Bazan Cacao"></a>' +
      '<nav class="nav" aria-label="Menu chính">' + links + "</nav>" +
      '<div class="header__tools">' +
      '<a class="icon-btn" href="gio-hang.html" aria-label="Giỏ hàng">' + I.cart + '<span class="cart-count" hidden>0</span></a>' +
      '<button class="icon-btn menu-toggle" aria-expanded="false" aria-controls="mnav" aria-label="Mở menu">' + I.menu + "</button>" +
      "</div></div></header>" +
      '<nav class="mnav" id="mnav" aria-label="Menu">' + links +
      '<div class="mnav__foot muted">Đậm Vị Nắng Gió — cacao nguyên bản từ đất đỏ bazan.</div></nav>';

    var btn = $(".menu-toggle"), mnav = $("#mnav");
    btn.addEventListener("click", function () {
      var open = !mnav.classList.contains("is-open");
      mnav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      btn.innerHTML = open ? I.close : I.menu;
    });
  }

  /* ---------- Contact details (from config) ---------- */
  function contactHTML(kind) {
    if (kind === "email" && cfg.email) return '<a href="mailto:' + cfg.email + '">' + cfg.email + "</a>";
    if (kind === "phone" && cfg.phone) {
      var digits = cfg.phone.replace(/\D/g, "");
      return '<a href="tel:' + digits + '">' + esc(cfg.phone) + '</a> · <a href="https://zalo.me/' + digits + '" target="_blank" rel="noopener">Zalo</a>';
    }
    if (kind === "address" && cfg.address) return esc(cfg.address);
    return "—";
  }
  function renderContacts() {
    $$("[data-contact]").forEach(function (el) { el.innerHTML = contactHTML(el.dataset.contact); });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var el = $("#site-footer");
    if (!el) return;
    var socials = [["facebook", "Facebook"], ["instagram", "Instagram"], ["shopee", "Shopee"], ["tiktok", "TikTok"]].map(function (s) {
      return '<a href="' + cfg.links[s[0]] + '" aria-label="' + s[1] + '" target="_blank" rel="noopener">' + I[s[0]] + "</a>";
    }).join("");
    function col(title, items) {
      return '<div class="fcol"><details><summary>' + title + "</summary><ul>" +
        items.map(function (i) { return '<li><a href="' + i[0] + '">' + i[1] + "</a></li>"; }).join("") +
        "</ul></details></div>";
    }
    el.outerHTML =
      '<footer class="footer"><div class="wrap"><div class="footer__grid">' +
      '<div class="footer__brand"><a class="logo logo--footer" href="index.html"><img class="logo__mark" src="assets/img/logo-mark-cream.png" alt=""><img class="logo__word" src="assets/img/logo-word-cream.png" alt="Bazan Cacao"></a>' +
      '<div class="footer__slogan">Đậm Vị Nắng Gió</div>' +
      "<p>Cacao nguyên bản, ít đường, từ vùng đất đỏ bazan.</p>" +
      '<div class="socials">' + socials + "</div></div>" +
      col("Khám phá", NAV.slice(0, 5)) +
      col("Hỗ trợ", [["lien-he.html", "Liên hệ"], ["blog.html#faq", "Câu hỏi thường gặp"], ["chinh-sach.html#giao-hang", "Giao hàng"], ["chinh-sach.html#doi-tra", "Đổi trả"], ["chinh-sach.html#bao-mat", "Bảo mật thông tin"]]) +
      '<div class="fcol fcol--contact"><h4>Liên hệ</h4>' +
      "<p>Email: " + contactHTML("email") + "</p>" +
      "<p>SĐT/Zalo: " + contactHTML("phone") + "</p>" +
      "<p>Kho/Văn phòng: " + contactHTML("address") + "</p></div>" +
      "</div>" +
      '<p class="footer__member">Tham gia <strong>Hội Một Vị</strong> — tích điểm, nhận quà sinh nhật. <a href="gio-hang.html#hoi-mot-vi">Tìm hiểu</a></p>' +
      '<div class="footer__bottom">© 2026 Bazan Cacao.</div>' +
      "</div></footer>";

    // Desktop: các cột luôn mở; điện thoại: cột 2–3 mở/đóng
    var mq = window.matchMedia("(min-width: 900px)");
    function sync() { $$(".fcol details").forEach(function (d) { d.open = mq.matches; }); }
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
  }

  /* ---------- Floating buttons + chatbot ---------- */
  function renderFab() {
    var social = SOCIAL.map(function (s) {
      return '<a href="' + cfg.links[s[0]] + '" target="_blank" rel="noopener">' + I[s[0]] + s[1] + "</a>";
    }).join("");
    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<div class="fab"><div class="fab__social" id="fab-social" hidden>' + social + "</div>" +
      '<button class="fab__btn" aria-expanded="false" aria-controls="fab-social" aria-label="Kênh mua hàng & mạng xã hội">' + I.share + "</button>" +
      '<button class="fab__btn fab__btn--chat" aria-expanded="false" aria-controls="chat" aria-label="Trò chuyện với trợ lý">' + I.chat + "</button></div>" +
      '<section class="chat" id="chat" hidden aria-label="Trợ lý Bazan Cacao">' +
      '<div class="chat__head"><div><strong>Trợ lý Bazan</strong><small>Giải đáp nhanh về sản phẩm & đặt hàng</small></div>' +
      '<button class="icon-btn" data-close aria-label="Đóng">' + I.close + "</button></div>" +
      '<div class="chat__body" aria-live="polite"></div>' +
      '<form class="chat__form"><label class="sr-only" for="chat-in">Câu hỏi</label><input id="chat-in" autocomplete="off" placeholder="Nhập câu hỏi…"><button aria-label="Gửi">' + I.send + "</button></form></section>";
    document.body.appendChild(wrap);

    var btns = $$(".fab__btn", wrap), list = $("#fab-social"), chat = $("#chat"), body = $(".chat__body", chat);
    btns[0].addEventListener("click", function () {
      list.hidden = !list.hidden;
      btns[0].setAttribute("aria-expanded", !list.hidden);
    });

    function say(text, who) {
      var m = document.createElement("div");
      m.className = "msg msg--" + who;
      m.innerHTML = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function chips() {
      var c = document.createElement("div");
      c.className = "chips";
      BZ.faq.slice(0, 5).forEach(function (f) {
        var b = document.createElement("button");
        b.type = "button"; b.textContent = f.q;
        b.addEventListener("click", function () { ask(f.q); });
        c.appendChild(b);
      });
      body.appendChild(c);
    }
    function answer(q) {
      var t = plain(q), best = null, score = 0;
      BZ.faq.forEach(function (f) {
        var s = 0;
        f.k.forEach(function (k) { if (t.indexOf(k) > -1) s += k.split(" ").length; });
        if (plain(f.q) === t) s += 10;
        if (s > score) { score = s; best = f; }
      });
      if (best) return esc(best.a);
      return 'Mình chưa có câu trả lời cho câu hỏi này. Bạn để lại lời nhắn ở <a href="lien-he.html">trang Liên hệ</a>, đội ngũ Bazan Cacao sẽ phản hồi sớm nhé.';
    }
    function ask(q) {
      say(esc(q), "me");
      setTimeout(function () { say(answer(q), "bot"); }, 300);
    }
    var started = false;
    function toggleChat(open) {
      chat.hidden = !open;
      btns[1].setAttribute("aria-expanded", open);
      if (open && !started) {
        started = true;
        say("Xin chào! Mình là trợ lý của Bazan Cacao. Bạn muốn hỏi gì về sản phẩm, cách pha hay đặt hàng?", "bot");
        chips();
      }
      if (open) $("#chat-in").focus();
    }
    btns[1].addEventListener("click", function () { toggleChat(chat.hidden); });
    $("[data-close]", chat).addEventListener("click", function () { toggleChat(false); btns[1].focus(); });
    $(".chat__form", chat).addEventListener("submit", function (e) {
      e.preventDefault();
      var inp = $("#chat-in"), q = inp.value.trim();
      if (!q) return;
      inp.value = "";
      ask(q);
    });
  }

  /* ---------- Forms: gửi về email ---------- */
  function sendForm(subject, data) {
    var lines = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
    if (cfg.formEndpoint && cfg.formKey) {
      return fetch(cfg.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ access_key: cfg.formKey, subject: subject, from_name: "Website Bazan Cacao" }, data))
      }).then(function (r) { return r.json(); })
        .then(function (res) { if (!res.success) throw new Error(res.message); });
    }
    location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines);
    return Promise.resolve();
  }
  function bindForms() {
    $$("form[data-form]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = {};
        $$("[name]", f).forEach(function (i) {
          if (i.type === "checkbox") { if (i.checked) data[i.name] = "Có"; }
          else if (i.value.trim()) data[i.name] = i.value.trim();
        });
        if (f.dataset.form === "order") {
          var c = getCart();
          if (!c.length) return;
          data["Đơn hàng"] = c.map(function (l) { return product(l.id).name + " (" + l.v + ") x" + l.q + " = " + money(linePrice(l)); }).join("; ");
          data["Tổng"] = money(c.reduce(function (s, l) { return s + linePrice(l); }, 0));
        }
        var btn = $("button[type=submit]", f), msg = $(".form-msg", f.parentNode);
        btn.disabled = true;
        sendForm(f.dataset.subject || "Website Bazan Cacao", data).then(function () {
          f.hidden = true;
          if (msg) { msg.hidden = false; msg.focus(); }
          if (f.dataset.form === "order") { saveCart([]); renderCartList(); }
        }).catch(function () {
          btn.disabled = false;
          alert("Chưa gửi được. Vui lòng thử lại hoặc liên hệ qua Zalo.");
        });
      });
    });
  }

  /* ---------- Pages ---------- */
  function cardHTML(p) {
    var price = p.variants.length > 1 ? "Từ " + money(p.variants[0].price) : money(p.variants[0].price);
    var size = p.variants.map(function (v) { return v.label; }).join(" · ");
    return '<a class="card" href="san-pham-chi-tiet.html?id=' + p.id + '">' + packHTML(p) +
      '<h3 class="card__name">' + esc(p.name) + '</h3><div class="card__meta"><span>' + esc(size) + '</span><span class="card__price">' + price + "</span></div></a>";
  }
  function renderGrids() {
    $$("[data-products]").forEach(function (el) {
      var ids = el.dataset.products;
      var list = ids === "all" ? BZ.products
        : ids === "combos" ? BZ.products.filter(function (p) { return p.combo; })
        : ids.split(",").map(product);
      el.innerHTML = list.map(cardHTML).join("");
    });
  }

  function renderDetail() {
    var el = $("#product-detail");
    if (!el) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = product(id) || BZ.products[0];
    document.title = p.name + " — Bazan Cacao";
    var variants = p.variants.length > 1
      ? '<fieldset class="variants"><legend class="sr-only">Khối lượng</legend>' + p.variants.map(function (v, i) {
          return '<label class="variant"><input type="radio" name="variant" value="' + v.label + '"' + (i === 0 ? " checked" : "") + "><span>" + v.label + "</span></label>";
        }).join("") + "</fieldset>"
      : '<p class="muted">Quy cách: ' + esc(p.variants[0].label) + "</p>";
    var info = [
      p.contents ? ["Trong combo", p.contents] : null,
      ["Thành phần", p.ingredients], ["Cách dùng", p.usage], ["Bảo quản", p.storage]
    ].filter(Boolean).map(function (r, i) {
      return "<details" + (i === 0 ? " open" : "") + "><summary>" + r[0] + "</summary><div><p>" + esc(r[1]) + "</p></div></details>";
    }).join("");

    el.innerHTML =
      '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="san-pham.html">Sản phẩm</a> / ' + esc(p.name) + "</nav>" +
      '<div class="pd"><div class="pd__media">' + packHTML(p) + "</div><div>" +
      '<span class="eyebrow">' + (p.combo ? "Quà tặng" : "Một Vị, Muôn Cách") + "</span>" +
      "<h1>" + esc(p.name) + "</h1>" +
      '<div class="pd__price" id="pd-price">' + money(p.variants[0].price) + "</div>" +
      variants +
      '<div class="pd__buy"><div class="qty"><button type="button" data-q="-1" aria-label="Giảm">−</button><input id="pd-qty" type="number" min="1" value="1" aria-label="Số lượng"><button type="button" data-q="1" aria-label="Tăng">+</button></div>' +
      '<button class="btn" id="pd-add">Thêm vào giỏ</button></div>' +
      '<p class="added" id="pd-added" hidden>Đã thêm vào giỏ. <a href="gio-hang.html">Xem giỏ hàng</a></p>' +
      '<div class="pd__shops"><span class="muted">Hoặc mua tại:</span><a href="' + cfg.links.shopee + '" target="_blank" rel="noopener">Shopee</a><a href="' + cfg.links.tiktok + '" target="_blank" rel="noopener">TikTok Shop</a></div>' +
      '<p class="lead">' + esc(p.desc) + "</p>" +
      '<div class="acc">' + info + "</div></div></div></div>";

    var qty = $("#pd-qty");
    $$("[data-q]", el).forEach(function (b) {
      b.addEventListener("click", function () { qty.value = Math.max(1, (+qty.value || 1) + +b.dataset.q); });
    });
    function variant() { var r = $("input[name=variant]:checked", el); return r ? r.value : p.variants[0].label; }
    $$("input[name=variant]", el).forEach(function (r) {
      r.addEventListener("change", function () {
        var v = p.variants.find(function (x) { return x.label === r.value; });
        $("#pd-price").textContent = money(v.price);
        $(".pack__size", el).textContent = v.label;
      });
    });
    $("#pd-add").addEventListener("click", function () {
      addToCart(p.id, variant(), Math.max(1, +qty.value || 1));
      $("#pd-added").hidden = false;
    });
  }

  function renderCartList() {
    var el = $("#cart-list");
    if (!el) return;
    var c = getCart();
    var form = $("#order-wrap");
    if (!c.length) {
      el.innerHTML = '<div class="empty"><p class="quote">Giỏ hàng đang trống.</p><a class="link" href="san-pham.html">Xem sản phẩm</a></div>';
      if (form && !$(".form-msg:not([hidden])", form)) form.hidden = true;
      return;
    }
    if (form) form.hidden = false;
    var total = 0;
    el.innerHTML = '<ul class="cart-list">' + c.map(function (l, i) {
      var p = product(l.id); if (!p) return "";
      var lp = linePrice(l); total += lp;
      return '<li class="cart-item">' + packHTML(p, l.v) +
        '<div><h3><a href="san-pham-chi-tiet.html?id=' + p.id + '">' + esc(p.name) + '</a></h3><div class="cart-item__meta">' + esc(l.v) + " · " + money(lp / l.q) + "</div></div>" +
        '<div class="cart-item__right"><div class="qty"><button type="button" data-i="' + i + '" data-d="-1" aria-label="Giảm">−</button><input value="' + l.q + '" readonly aria-label="Số lượng"><button type="button" data-i="' + i + '" data-d="1" aria-label="Tăng">+</button></div>' +
        '<strong>' + money(lp) + '</strong><button class="remove" data-rm="' + i + '">Xóa</button></div></li>';
    }).join("") + "</ul>" +
      '<div class="cart-total"><span>Tạm tính</span><span>' + money(total) + "</span></div>" +
      '<p class="muted" style="font-size:.88rem">Phí giao hàng sẽ được báo khi chúng tôi gọi xác nhận đơn.</p>';

    $$("[data-d]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var c2 = getCart(), l = c2[+b.dataset.i];
        l.q = Math.max(1, l.q + +b.dataset.d);
        saveCart(c2); renderCartList();
      });
    });
    $$("[data-rm]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var c2 = getCart(); c2.splice(+b.dataset.rm, 1);
        saveCart(c2); renderCartList();
      });
    });
  }

  function renderFaq() {
    var el = $("#faq-list");
    if (!el) return;
    el.innerHTML = BZ.faq.map(function (f) {
      return "<details><summary>" + esc(f.q) + "</summary><div><p>" + esc(f.a) + "</p></div></details>";
    }).join("");
  }

  function renderRecipes() {
    var el = $("#recipes");
    if (!el) return;
    el.innerHTML = BZ.recipes.map(function (r, i) {
      var media = r.img
        ? '<div class="ph ph--photo"><img src="' + r.img + '" loading="lazy" alt="' + esc(r.name) + '"></div>'
        : '<div class="ph' + (i === 1 ? " ph--teal" : "") + '" data-label="' + esc(r.name) + '"></div>';
      return '<article class="recipe">' + media +
        '<span class="recipe__time">' + r.time + "</span><h3>" + esc(r.name) + "</h3>" +
        "<h4>Nguyên liệu</h4><ul>" + r.ing.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        "<h4>Cách làm</h4><ol>" + r.steps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></article>";
    }).join("");
  }

  function renderIcons() {
    $$("[data-icon]").forEach(function (el) { el.insertAdjacentHTML("afterbegin", I[el.dataset.icon] || ""); });
    $$("[data-link]").forEach(function (el) { el.href = cfg.links[el.dataset.link]; });
  }

  renderHeader();
  renderFooter();
  renderFab();
  renderIcons();
  renderContacts();
  renderGrids();
  renderDetail();
  renderCartList();
  renderFaq();
  renderRecipes();
  bindForms();
  updateCount();
})();

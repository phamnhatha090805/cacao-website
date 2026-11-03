/* Bazan Cacao — header, footer, giỏ hàng, form, chatbot (tiếng Việt + tiếng Anh) */
(function () {
  "use strict";
  var BZ = window.BZ;
  var cfg = BZ.config;
  var EN = document.documentElement.lang === "en";
  // Trang tiếng Anh nằm trong /en/, nên đường dẫn tới assets cần lùi một cấp
  var ROOT = EN ? "../" : "";

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function money(n) { return EN ? n.toLocaleString("en-US") + " VND" : n.toLocaleString("vi-VN") + "đ"; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function plain(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase(); }
  function product(id) { return BZ.products.find(function (p) { return p.id === id; }); }
  function page() { var f = location.pathname.split("/").pop().replace(/\.html$/, ""); return f && f !== "index" ? f : "./"; }

  // Link cũ có đuôi .html (bookmark, Facebook, Google) vẫn mở được; chỉ làm gọn địa chỉ trên thanh URL
  if (/\.html$/.test(location.pathname) && history.replaceState) {
    history.replaceState(null, "", location.pathname.replace(/(index)?\.html$/, "") + location.search + location.hash);
  }

  /* ---------- Ngôn ngữ ---------- */
  // Trang tiếng Việt ↔ trang tiếng Anh tương ứng
  var SLUGS = [
    ["./", "./"], ["san-pham", "products"], ["san-pham-chi-tiet", "product"], ["qua-tang", "gifts"],
    ["doanh-nghiep", "business"], ["blog", "blog"], ["cau-chuyen", "about"], ["lien-he", "contact"],
    ["gio-hang", "cart"], ["chinh-sach", "policies"]
  ];
  // Link nội bộ viết theo tên trang tiếng Việt; trên trang tiếng Anh đổi sang tên tiếng Anh
  function L(href) {
    if (!EN) return href;
    var m = href.match(/^([^?#]*)(.*)$/);
    var pair = SLUGS.find(function (s) { return s[0] === m[1]; });
    return (pair ? pair[1] : m[1]) + m[2];
  }
  function otherLangHref() {
    var cur = page();
    var pair = SLUGS.find(function (s) { return s[EN ? 1 : 0] === cur; }) || SLUGS[0];
    var target = pair[EN ? 0 : 1];
    return (EN ? "../" : "en/") + (target === "./" ? "" : target) + location.search + location.hash;
  }
  var T = EN ? {
    home: "Bazan Cacao — Home", mainMenu: "Main menu", cart: "Cart", openMenu: "Open menu", closeMenu: "Close menu",
    menuFoot: "Đậm Vị Nắng Gió — pure cacao from red basalt soil.", lang: "Tiếng Việt",
    tagline: "Pure cacao from the red basalt soil of Vietnam.", explore: "Explore", support: "Support", contact: "Contact",
    faq: "FAQ", shipping: "Shipping", returns: "Returns", privacy: "Privacy", phone: "Phone/Zalo", office: "Office",
    channels: "Shops & social media", chatOpen: "Chat with our assistant", chatName: "Bazan assistant",
    chatSub: "Quick answers on products & orders", close: "Close", question: "Question", ask: "Type your question…", send: "Send",
    hello: "Hi! I'm the Bazan Cacao assistant. What would you like to know about our products, brewing or ordering?",
    noAnswer: 'I don\'t have an answer for that yet. Leave us a message on the <a href="contact">Contact page</a> and the Bazan Cacao team will reply soon.',
    sendFail: "Could not send. Please try again or contact us on Zalo.",
    from: "From ", add: "Add {0} to cart", added: "Added {0} to cart.", viewCart: "View cart",
    weight: "Weight", packSize: "Pack size: ", inBox: "In the box", storage: "Storage", boxStorage: "Follow the instructions for each product in the box.",
    ingredients: "Ingredients", usage: "How to use", photo: "Photo ", priceNote: "(price depends on weight)", products: "Products",
    less: "Decrease", more: "Increase", qty: "Quantity", addCart: "Add to cart", addedCart: "Added to cart.", orBuy: "Or buy on:",
    related: "You may also like", empty: "Your cart is empty.", seeProducts: "See products", remove: "Remove", subtotal: "Subtotal",
    shipNote: "We will confirm the shipping fee when we call to confirm your order.", ing: "Ingredients", steps: "Method"
  } : {
    home: "Bazan Cacao — Trang chủ", mainMenu: "Menu chính", cart: "Giỏ hàng", openMenu: "Mở menu", closeMenu: "Đóng menu",
    menuFoot: "Đậm Vị Nắng Gió — cacao nguyên bản từ đất đỏ bazan.", lang: "English",
    tagline: "Cacao nguyên chất từ vùng đất đỏ bazan.", explore: "Khám phá", support: "Hỗ trợ", contact: "Liên hệ",
    faq: "Câu hỏi thường gặp", shipping: "Giao hàng", returns: "Đổi trả", privacy: "Bảo mật thông tin", phone: "SĐT/Zalo", office: "Kho/Văn phòng",
    channels: "Kênh mua hàng & mạng xã hội", chatOpen: "Trò chuyện với trợ lý", chatName: "Trợ lý Bazan",
    chatSub: "Giải đáp nhanh về sản phẩm & đặt hàng", close: "Đóng", question: "Câu hỏi", ask: "Nhập câu hỏi…", send: "Gửi",
    hello: "Xin chào! Mình là trợ lý của Bazan Cacao. Bạn muốn hỏi gì về sản phẩm, cách pha hay đặt hàng?",
    noAnswer: 'Mình chưa có câu trả lời cho câu hỏi này. Bạn để lại lời nhắn ở <a href="lien-he">trang Liên hệ</a>, đội ngũ Bazan Cacao sẽ phản hồi sớm nhé.',
    sendFail: "Chưa gửi được. Vui lòng thử lại hoặc liên hệ qua Zalo.",
    from: "Từ ", add: "Thêm {0} vào giỏ", added: "Đã thêm {0} vào giỏ.", viewCart: "Xem giỏ hàng",
    weight: "Khối lượng", packSize: "Quy cách: ", inBox: "Trong bộ có", storage: "Bảo quản", boxStorage: "Theo hướng dẫn của từng sản phẩm trong bộ.",
    ingredients: "Thành phần", usage: "Cách dùng", photo: "Ảnh ", priceNote: "(giá đổi theo khối lượng)", products: "Sản phẩm",
    less: "Giảm", more: "Tăng", qty: "Số lượng", addCart: "Thêm vào giỏ", addedCart: "Đã thêm vào giỏ.", orBuy: "Hoặc mua tại:",
    related: "Có thể bạn thích", empty: "Giỏ hàng đang trống.", seeProducts: "Xem sản phẩm", remove: "Xóa", subtotal: "Tạm tính",
    shipNote: "Phí giao hàng sẽ được báo khi chúng tôi gọi xác nhận đơn.", ing: "Nguyên liệu", steps: "Cách làm"
  };
  function fill(s, v) { return s.replace("{0}", v); }
  // Nhãn quy cách lưu trong giỏ giữ tiếng Việt; chỉ dịch khi hiển thị
  function vlabel(l) { return EN && l === "Hộp quà" ? "Gift box" : l; }

  // Tên sản phẩm tiếng Việt cho email đơn hàng (giữ lại trước khi bản dịch ghi đè)
  BZ.viNames = {};
  BZ.products.forEach(function (p) { BZ.viNames[p.id] = p.name; });
  // Trang tiếng Anh: thay nội dung sản phẩm, FAQ, công thức bằng bản dịch (assets/js/data-en.js)
  if (EN && BZ.en) {
    BZ.products.forEach(function (p) { Object.assign(p, BZ.en.products[p.id]); });
    BZ.faq = BZ.en.faq;
    BZ.recipes = BZ.en.recipes;
  }
  BZ.products.forEach(function (p) { if (p.images) p.images = p.images.map(function (src) { return ROOT + src; }); });

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

  var NAV = (EN
    ? [["san-pham", "Products"], ["qua-tang", "Gifts"], ["doanh-nghiep", "B2B Solutions"], ["blog", "Blog"], ["cau-chuyen", "About us"], ["lien-he", "Contact"]]
    : [["san-pham", "Sản phẩm"], ["qua-tang", "Quà tặng"], ["doanh-nghiep", "Giải pháp B2B"], ["blog", "Blog"], ["cau-chuyen", "Về chúng tôi"], ["lien-he", "Liên hệ"]]
  ).map(function (n) { return [L(n[0]), n[1]]; });
  var SOCIAL = [
    ["facebook", "Facebook"], ["instagram", "Instagram"], ["shopee", "Shopee"], ["tiktok", "TikTok Shop"]
  ];

  /* ---------- Cart store (localStorage, an toàn khi bị chặn) ---------- */
  var CART_KEY = "bz-cart";
  var memCart = [];
  function getCart() {
    var c;
    try { c = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { c = memCart; }
    // Bỏ sản phẩm đã đổi mã/ngừng bán còn sót trong giỏ cũ
    return c.filter(function (l) { return product(l.id); });
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
    if (p.images) return '<div class="pack pack--photo"><img src="' + p.images[0] + '" loading="lazy" alt="' + esc(p.name) + '"></div>';
    return '<div class="pack' + (p.combo ? " pack--combo" : "") + '"><div class="pack__box" style="--c1:' + p.colors[0] + ";--c2:" + p.colors[1] + '">' +
      '<span class="pack__brand">Bazan Cacao</span><span class="pack__name">' + esc(p.name) + '</span><span class="pack__size">' + esc(vlabel(size || p.variants[0].label)) + "</span></div></div>";
  }
  BZ.packHTML = packHTML;

  /* ---------- Header ---------- */
  function renderHeader() {
    var el = $("#site-header");
    if (!el) return;
    var cur = page();
    if (cur === L("san-pham-chi-tiet")) cur = L("san-pham");
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === cur ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
    var lang = '<a class="lang" href="' + otherLangHref() + '" hreflang="' + (EN ? "vi" : "en") + '" aria-label="' + T.lang + '">' +
      "<span" + (EN ? "" : ' class="is-on"') + ">VI</span><span" + (EN ? ' class="is-on"' : "") + ">EN</span></a>";
    el.outerHTML =
      '<header class="header"><div class="wrap header__bar">' +
      '<a class="logo" href="./" aria-label="' + T.home + '"><img class="logo__mark" src="' + ROOT + 'assets/img/logo-mark.png" alt=""><img class="logo__word" src="' + ROOT + 'assets/img/logo-word.png" alt="Bazan Cacao"></a>' +
      '<nav class="nav" aria-label="' + T.mainMenu + '">' + links + "</nav>" +
      '<div class="header__tools">' + lang +
      '<a class="icon-btn cart-link" href="' + L("gio-hang") + '"' + (cur === L("gio-hang") ? ' aria-current="page"' : "") + ">" + I.cart + '<span class="cart-link__label">' + T.cart + '</span><span class="cart-count" hidden>0</span></a>' +
      '<button class="icon-btn menu-toggle" aria-expanded="false" aria-controls="mnav" aria-label="' + T.openMenu + '">' + I.menu + "</button>" +
      "</div></div></header>" +
      '<nav class="mnav" id="mnav" aria-label="Menu">' + links +
      '<div class="mnav__foot muted">' + T.menuFoot + "</div></nav>";

    var btn = $(".menu-toggle"), mnav = $("#mnav");
    btn.addEventListener("click", function () {
      var open = !mnav.classList.contains("is-open");
      mnav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? T.closeMenu : T.openMenu);
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
    if (kind === "address" && cfg.address) return esc(EN && cfg.addressEn ? cfg.addressEn : cfg.address);
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
      '<div class="footer__brand"><a class="logo logo--footer" href="./"><img class="logo__mark" src="' + ROOT + 'assets/img/logo-mark-cream.png" alt=""><img class="logo__word" src="' + ROOT + 'assets/img/logo-word-cream.png" alt="Bazan Cacao"></a>' +
      '<div class="footer__slogan">Đậm Vị Nắng Gió</div>' +
      "<p>" + T.tagline + "</p>" +
      '<div class="socials">' + socials + "</div></div>" +
      col(T.explore, NAV.slice(0, 5)) +
      col(T.support, [[L("lien-he"), T.contact], [L("blog#faq"), T.faq], [L("chinh-sach#giao-hang"), T.shipping], [L("chinh-sach#doi-tra"), T.returns], [L("chinh-sach#bao-mat"), T.privacy]]) +
      '<div class="fcol fcol--contact"><h4>' + T.contact + "</h4>" +
      "<p>Email: " + contactHTML("email") + "</p>" +
      "<p>" + T.phone + ": " + contactHTML("phone") + "</p>" +
      "<p>" + T.office + ": " + contactHTML("address") + "</p></div>" +
      "</div>" +
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
      '<button class="fab__btn" aria-expanded="false" aria-controls="fab-social" aria-label="' + T.channels + '">' + I.share + "</button>" +
      '<button class="fab__btn fab__btn--chat" aria-expanded="false" aria-controls="chat" aria-label="' + T.chatOpen + '">' + I.chat + "</button></div>" +
      '<section class="chat" id="chat" hidden aria-label="' + T.chatName + '">' +
      '<div class="chat__head"><div><strong>' + T.chatName + "</strong><small>" + T.chatSub + "</small></div>" +
      '<button class="icon-btn" data-close aria-label="' + T.close + '">' + I.close + "</button></div>" +
      '<div class="chat__body" aria-live="polite"></div>' +
      '<form class="chat__form"><label class="sr-only" for="chat-in">' + T.question + '</label><input id="chat-in" autocomplete="off" placeholder="' + T.ask + '"><button aria-label="' + T.send + '">' + I.send + "</button></form></section>";
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
      return T.noAnswer;
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
        say(T.hello, "bot");
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

  /* ---------- Forms: gửi về email (nội dung email luôn bằng tiếng Việt cho đội ngũ) ---------- */
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
        if (EN) data["Ngôn ngữ"] = "Tiếng Anh (khách đặt từ trang tiếng Anh)";
        if (f.dataset.form === "order") {
          var c = getCart();
          if (!c.length) return;
          data["Đơn hàng"] = c.map(function (l) {
            var v = product(l.id).variants.find(function (x) { return x.label === l.v; });
            return BZ.viNames[l.id] + " (" + l.v + ") x" + l.q + " = " + (v.price * l.q).toLocaleString("vi-VN") + "đ";
          }).join("; ");
          data["Tổng"] = c.reduce(function (s, l) { return s + linePrice(l); }, 0).toLocaleString("vi-VN") + "đ";
        }
        var btn = $("button[type=submit]", f), msg = $(".form-msg", f.parentNode);
        btn.disabled = true;
        sendForm(f.dataset.subject || "Website Bazan Cacao", data).then(function () {
          f.hidden = true;
          if (msg) { msg.hidden = false; msg.focus(); }
          if (f.dataset.form === "order") { saveCart([]); renderCartList(); }
        }).catch(function () {
          btn.disabled = false;
          alert(T.sendFail);
        });
      });
    });
  }

  /* ---------- Pages ---------- */
  function fromPrice(p) {
    return p.variants.length > 1 ? T.from + money(p.variants[0].price) : money(p.variants[0].price);
  }
  function cardHTML(p) {
    return '<div class="card"><a class="card__link" href="' + L("san-pham-chi-tiet") + "?id=" + p.id + '">' + packHTML(p) +
      '<h3 class="card__name">' + esc(p.name) + "</h3></a>" +
      '<div class="card__meta"><span class="card__price">' + fromPrice(p) + "</span>" +
      '<button type="button" class="card__add" data-add="' + p.id + '" aria-label="' + esc(fill(T.add, p.name)) + '">' + I.cart + "</button></div></div>";
  }

  // Thêm nhanh từ thẻ sản phẩm: lấy quy cách đầu tiên (nhỏ nhất)
  var toastTimer;
  function toast(html) {
    var t = $(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.innerHTML = html;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, 3200);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-add]");
    if (!b) return;
    var p = product(b.dataset.add);
    addToCart(p.id, p.variants[0].label, 1);
    var v = p.variants.length > 1 ? " (" + p.variants[0].label + ")" : "";
    toast(fill(T.added, esc(p.name + v)) + '<a href="' + L("gio-hang") + '">' + T.viewCart + "</a>");
  });
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
      ? '<fieldset class="variants"><legend class="sr-only">' + T.weight + "</legend>" + p.variants.map(function (v, i) {
          return '<label class="variant"><input type="radio" name="variant" value="' + v.label + '"' + (i === 0 ? " checked" : "") + "><span>" + v.label + "</span></label>";
        }).join("") + "</fieldset>"
      : '<p class="muted">' + T.packSize + esc(vlabel(p.variants[0].label)) + "</p>";
    var info = (p.combo
      ? [[T.inBox, p.contents], [T.storage, T.boxStorage]]
      : [[T.ingredients, p.ingredients], [T.usage, p.usage], [T.storage, p.storage]]
    ).map(function (r, i) {
      return "<details" + (i === 0 ? " open" : "") + "><summary>" + r[0] + "</summary><div><p>" + esc(r[1]).replace(/\n/g, "<br>") + "</p></div></details>";
    }).join("");
    var thumbs = p.images && p.images.length > 1
      ? '<div class="thumbs">' + p.images.map(function (src, i) {
          return '<button type="button" data-img="' + src + '"' + (i === 0 ? ' aria-current="true"' : "") + ' aria-label="' + T.photo + (i + 1) + '"><img src="' + src + '" alt=""></button>';
        }).join("") + "</div>"
      : "";
    var priceNote = p.variants.length > 1 ? " <small>" + T.priceNote + "</small>" : "";
    var related = BZ.products.filter(function (x) { return x.id !== p.id && !!x.combo === !!p.combo; }).slice(0, 3);
    var cart = L("gio-hang");

    el.innerHTML =
      '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="' + L("san-pham") + '">' + T.products + "</a> / " + esc(p.name) + "</nav>" +
      '<div class="pd"><div class="pd__media">' + packHTML(p) + thumbs + "</div><div>" +
      '<span class="eyebrow">' + esc(p.category) + "</span>" +
      "<h1>" + esc(p.name) + "</h1>" +
      '<div class="pd__price" id="pd-price">' + fromPrice(p) + priceNote + "</div>" +
      variants +
      '<div class="pd__buy"><div class="qty"><button type="button" data-q="-1" aria-label="' + T.less + '">−</button><input id="pd-qty" type="number" min="1" value="1" aria-label="' + T.qty + '"><button type="button" data-q="1" aria-label="' + T.more + '">+</button></div>' +
      '<button class="btn" id="pd-add">' + T.addCart + "</button></div>" +
      '<p class="added" id="pd-added" hidden>' + T.addedCart + ' <a href="' + cart + '">' + T.viewCart + "</a></p>" +
      '<div class="pd__shops"><span class="muted">' + T.orBuy + '</span><a href="' + cfg.links.shopee + '" target="_blank" rel="noopener">Shopee</a><a href="' + cfg.links.tiktok + '" target="_blank" rel="noopener">TikTok Shop</a></div>' +
      '<p class="lead">' + esc(p.desc) + "</p>" +
      '<div class="acc">' + info + "</div></div></div>" +
      '<section class="related"><h2>' + T.related + '</h2><div class="cards cards--3">' + related.map(cardHTML).join("") + "</div></section></div>";

    var qty = $("#pd-qty");
    $$("[data-q]", el).forEach(function (b) {
      b.addEventListener("click", function () { qty.value = Math.max(1, (+qty.value || 1) + +b.dataset.q); });
    });
    function variant() { var r = $("input[name=variant]:checked", el); return r ? r.value : p.variants[0].label; }
    $$("input[name=variant]", el).forEach(function (r) {
      r.addEventListener("change", function () {
        var v = p.variants.find(function (x) { return x.label === r.value; });
        $("#pd-price").innerHTML = money(v.price) + priceNote;
        var size = $(".pack__size", el);
        if (size) size.textContent = v.label;
      });
    });
    $$("[data-img]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        $(".pd__media .pack img", el).src = b.dataset.img;
        $$("[data-img]", el).forEach(function (x) { x.removeAttribute("aria-current"); });
        b.setAttribute("aria-current", "true");
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
      el.innerHTML = '<div class="empty"><p class="quote">' + T.empty + '</p><a class="link" href="' + L("san-pham") + '">' + T.seeProducts + "</a></div>";
      if (form && !$(".form-msg:not([hidden])", form)) form.hidden = true;
      return;
    }
    if (form) form.hidden = false;
    var total = 0;
    el.innerHTML = '<ul class="cart-list">' + c.map(function (l, i) {
      var p = product(l.id); if (!p) return "";
      var lp = linePrice(l); total += lp;
      return '<li class="cart-item">' + packHTML(p, l.v) +
        '<div><h3><a href="' + L("san-pham-chi-tiet") + "?id=" + p.id + '">' + esc(p.name) + '</a></h3><div class="cart-item__meta">' + esc(vlabel(l.v)) + " · " + money(lp / l.q) + "</div></div>" +
        '<div class="cart-item__right"><div class="qty"><button type="button" data-i="' + i + '" data-d="-1" aria-label="' + T.less + '">−</button><input value="' + l.q + '" readonly aria-label="' + T.qty + '"><button type="button" data-i="' + i + '" data-d="1" aria-label="' + T.more + '">+</button></div>' +
        "<strong>" + money(lp) + '</strong><button class="remove" data-rm="' + i + '">' + T.remove + "</button></div></li>";
    }).join("") + "</ul>" +
      '<div class="cart-total"><span>' + T.subtotal + "</span><span>" + money(total) + "</span></div>" +
      '<p class="muted" style="font-size:.88rem">' + T.shipNote + "</p>";

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
        ? '<div class="ph ph--photo"><img src="' + ROOT + r.img + '" loading="lazy" alt="' + esc(r.name) + '"></div>'
        : '<div class="ph' + (i === 1 ? " ph--teal" : "") + '" data-label="' + esc(r.name) + '"></div>';
      return '<article class="recipe">' + media +
        '<span class="recipe__time">' + r.time + "</span><h3>" + esc(r.name) + "</h3>" +
        "<h4>" + T.ing + "</h4><ul>" + r.ing.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        "<h4>" + T.steps + "</h4><ol>" + r.steps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></article>";
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

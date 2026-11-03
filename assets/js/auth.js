/* Bazan Cacao — đăng nhập bằng Google (Firebase Authentication).
   Chỉ bật khi BZ.config.firebase đã có apiKey; chưa cấu hình thì không hiện nút đăng nhập.
   Tên + email lấy từ Google; SĐT khách tự nhập, lưu trên trình duyệt để điền sẵn khi đặt hàng. */
(function () {
  "use strict";
  var BZ = window.BZ;
  var fb = BZ.config.firebase;
  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  var en = document.documentElement.lang === "en";
  var T = en
    ? { login: "Sign in", google: "Continue with Google", note: "Sign in to fill in your details automatically at checkout.", phone: "Phone number", save: "Save", saved: "Saved.", logout: "Sign out", account: "Account", fail: "Could not sign in. Please try again." }
    : { login: "Đăng nhập", google: "Tiếp tục với Google", note: "Đăng nhập để điền sẵn thông tin khi đặt hàng.", phone: "Số điện thoại", save: "Lưu", saved: "Đã lưu.", logout: "Đăng xuất", account: "Tài khoản", fail: "Chưa đăng nhập được. Vui lòng thử lại." };
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/></svg>';

  if (!fb || !fb.apiKey) return;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function load(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
  }
  function profileKey(u) { return "bz-profile-" + u.uid; }
  function getPhone(u) { try { return JSON.parse(localStorage.getItem(profileKey(u))).phone || ""; } catch (e) { return ""; } }
  function savePhone(u, phone) { try { localStorage.setItem(profileKey(u), JSON.stringify({ phone: phone })); } catch (e) {} }

  var tools = $(".header__tools");
  if (!tools) return;
  var wrap = document.createElement("div");
  wrap.className = "account";
  wrap.innerHTML =
    '<button type="button" class="icon-btn account__btn" aria-expanded="false" aria-controls="account-panel" aria-label="' + T.login + '">' + ICON + "</button>" +
    '<div class="account__panel" id="account-panel" hidden></div>';
  tools.insertBefore(wrap, tools.firstChild);
  var btn = $(".account__btn", wrap), panel = $(".account__panel", wrap);

  function toggle(open) {
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", open);
  }
  btn.addEventListener("click", function () { toggle(panel.hidden); });
  document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) toggle(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });

  function fillOrderForm(u) {
    var f = $('form[data-form="order"]');
    if (!f) return;
    var name = $("#o-name", f), phone = $("#o-phone", f), email = $('input[name="Email"]', f);
    if (name && !name.value) name.value = u.displayName || "";
    if (phone && !phone.value) phone.value = getPhone(u);
    if (email) email.value = u.email || "";
  }

  function render(auth, u) {
    if (!u) {
      btn.setAttribute("aria-label", T.login);
      btn.classList.remove("is-in");
      panel.innerHTML = "<p>" + T.note + '</p><button type="button" class="btn btn--block account__google">' + T.google + '</button><p class="account__err" hidden>' + T.fail + "</p>";
      $(".account__google", panel).addEventListener("click", function () {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function () {
          $(".account__err", panel).hidden = false;
        });
      });
      return;
    }
    btn.setAttribute("aria-label", T.account + ": " + (u.displayName || u.email));
    btn.classList.add("is-in");
    panel.innerHTML =
      '<p class="account__who"><strong>' + esc(u.displayName || "") + "</strong><span>" + esc(u.email || "") + "</span></p>" +
      '<form class="account__phone"><label for="acc-phone">' + T.phone + '</label><div><input id="acc-phone" type="tel" autocomplete="tel" value="' + esc(getPhone(u)) + '"><button class="btn">' + T.save + '</button></div><small hidden>' + T.saved + "</small></form>" +
      '<button type="button" class="link account__out">' + T.logout + "</button>";
    $(".account__phone", panel).addEventListener("submit", function (e) {
      e.preventDefault();
      savePhone(u, $("#acc-phone", panel).value.trim());
      $(".account__phone small", panel).hidden = false;
      fillOrderForm(u);
    });
    $(".account__out", panel).addEventListener("click", function () { auth.signOut(); toggle(false); });
    fillOrderForm(u);
  }

  load(SDK + "firebase-app-compat.js")
    .then(function () { return load(SDK + "firebase-auth-compat.js"); })
    .then(function () {
      firebase.initializeApp(fb);
      var auth = firebase.auth();
      auth.languageCode = en ? "en" : "vi";
      auth.onAuthStateChanged(function (u) { render(auth, u); });
    })
    .catch(function () { wrap.remove(); });
})();

# cacao-website
This is the website for the clients. The product is Bazan Cacao

Static site (HTML/CSS/JS, no build step), Vietnamese with an English version under `en/`, mobile first.

## Run locally

```bash
python serve.py
```

Then open http://localhost:5500

Links have no `.html` (`/san-pham`, not `/san-pham.html`). GitHub Pages resolves them, and
`serve.py` does the same locally (`python -m http.server` would 404 on them).

## Pages

| File | Page |
|---|---|
| `index.html` | Trang chủ |
| `cau-chuyen.html` | Câu chuyện / Về chúng tôi |
| `san-pham.html` | Sản phẩm (lưới thẻ) |
| `san-pham-chi-tiet.html?id=…` | Chi tiết sản phẩm |
| `qua-tang.html` | Quà tặng |
| `doanh-nghiep.html` | Giải pháp B2B |
| `blog.html` | Công thức, workshop, FAQ |
| `lien-he.html` | Liên hệ |
| `gio-hang.html` | Giỏ hàng + form đặt hàng |
| `chinh-sach.html` | Giao hàng · Đổi trả · Bảo mật |

Header, footer, floating buttons and chatbot are rendered by `assets/js/main.js`.
Products, prices, FAQ (shared with the chatbot) and recipes live in `assets/js/data.js`.

## Before launch

- `assets/js/data.js` → `config`: email, phone/Zalo, address, Shopee/TikTok/Facebook/Instagram links.
- Forms (order, B2B quote, contact) open the visitor's email app unless `config.formEndpoint`
  is set to a form service (e.g. Formspree). Set one so orders arrive without relying on the visitor's mail client.
- Replace image placeholders (`.ph` blocks, label says which photo goes there) and product
  "wrapper" illustrations (`.pack`) with real photos.
- Search for `CẬP NHẬT` to find content still to be supplied (ingredients, combo contents,
  discount thresholds, workshop chapters, team, policies, full origin story from report Chapter 1–2).
- Chatbot is keyword-matched against the FAQ; swap `answer()` in `main.js` for a real AI backend later.

## Google login (Firebase)

The header shows a sign-in button only once `config.firebase` in `assets/js/data.js` is filled in.
Signing in pre-fills name, phone and email on the order form. There is no database: Firebase keeps
the list of users (name, email), the phone number stays in the visitor's browser, and orders still
arrive by email.

Setup (done once, by the account that should own the customer list):

1. https://console.firebase.google.com → Add project (Google Analytics not needed).
2. Build → Authentication → Get started → Sign-in method → Google → Enable → set the support email.
3. Authentication → Settings → Authorized domains → add `bazancacao.vn` (and any other domain the site uses).
4. Project settings → Your apps → Web (`</>`) → register the app → copy `apiKey`, `authDomain`,
   `projectId`, `appId` into `config.firebase`.

## English version

- English pages live in `en/` with English names (`en/products`, `en/about`…); the VI | EN switch in the
  header maps each page to its counterpart (`SLUGS` in `assets/js/main.js`).
- Header, footer, cart, chatbot and product labels: the `T` string table in `assets/js/main.js`.
- Product texts, FAQ and recipes in English: `assets/js/data-en.js` (prices, sizes and photos come from `data.js`).
- Any change to Vietnamese copy needs the same change in the English page or `data-en.js`.
- Forms on English pages still email the team in Vietnamese, with a "Ngôn ngữ: Tiếng Anh" line.

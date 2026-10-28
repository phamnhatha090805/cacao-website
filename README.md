# cacao-website
This is the website for the clients. The product is Bazan Cacao

Static site (HTML/CSS/JS, no build step), Vietnamese only, mobile first.

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500

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

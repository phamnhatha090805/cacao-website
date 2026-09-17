// ================================
// SHOP STATE
// ================================

const state = {
  size: '150g',
  unitPrice: 129000,
  quantity: 1,
  cart: []
};


// ================================
// TRANSLATIONS
// ================================

const translations = {
  vi: {
    announcement:
      'Miễn phí vận chuyển cho đơn hàng trên 500,000 ₫ · Cacao sản xuất theo mẻ nhỏ',

    navShop: 'Sản phẩm',
    navStory: 'Câu chuyện',
    navRitual: 'Cách pha cacao',
    navContact: 'Liên hệ',

    cart: 'Giỏ hàng',

    heroEyebrow: 'Cacao nguyên chất · Nguồn gốc rõ ràng',
    notePure: '100% cacao',
    noteBalanced: 'Đậm đà & cân bằng',

    productEyebrow: 'Bột cacao nguyên chất',
    productTitle: 'Cacao Nguyên Chất',
    productSubtitle: 'Rang Cân Bằng',

    productIntro:
      'Hương chocolate đậm đà, hậu vị sạch và vị đắng tự nhiên cân bằng. Thích hợp để pha cacao nóng, cacao đá, làm bánh và sử dụng mỗi ngày.',

    size: 'Khối lượng',
    quantity: 'Số lượng',
    addToCart: 'Thêm vào giỏ',

    trustNoAdditives: '✓ Không phụ gia',
    trustVegan: '✓ Thuần chay',
    trustSmallBatch: '✓ Sản xuất theo mẻ nhỏ',

    marquee:
      'CACAO NGUYÊN CHẤT ✦ RANG CHẬM ✦ NGUỒN GỐC RÕ RÀNG ✦ HƯƠNG VỊ TỰ NHIÊN ✦',

    storyEyebrow: 'Từ hạt cacao đến ly cacao',
    storyTitle: 'Cacao nguyên bản, không có gì để che giấu.',

    storyParagraphOne:
      'Chúng tôi giữ danh sách thành phần thật đơn giản và chú trọng vào từng bước trong quá trình sản xuất. Hạt cacao được lựa chọn dựa trên hương vị, rang để giữ lại hương thơm tự nhiên, sau đó được nghiền thành bột mịn phù hợp cho cả đồ uống nóng và lạnh.',

    storyParagraphTwo:
      'Hãy thay phần nội dung này bằng câu chuyện thật của thương hiệu: vùng trồng cacao, nông trại, quá trình lên men, rang, nguồn nguyên liệu hoặc câu chuyện của người sáng lập.',

    featureOneTitle: 'Thành phần nguyên chất',
    featureOneText:
      '100% bột cacao. Không chất độn, không hương liệu nhân tạo và không có các thành phần không cần thiết.',

    featureTwoTitle: 'Hương vị cân bằng',
    featureTwoText:
      'Hương chocolate đậm đà, độ chua nhẹ tự nhiên và hậu vị rang mượt mà.',

    featureThreeTitle: 'Dễ dàng sử dụng mỗi ngày',
    featureThreeText:
      'Pha cùng sữa, xay với đá, thêm vào yến mạch hoặc sử dụng khi làm bánh.',

    ritualEyebrow: 'Thói quen cacao mỗi ngày',
    ritualTitle: 'Uống nóng. Uống lạnh. Pha theo cách của bạn.',

    ritualStepOneTitle: '10g cacao',
    ritualStepOneText: 'Cho khoảng hai thìa cà phê cacao vào ly.',

    ritualStepTwoTitle: '60ml nước nóng',
    ritualStepTwoText:
      'Khuấy hoặc đánh đều cho đến khi hỗn hợp mịn và bóng.',

    ritualStepThreeTitle: 'Hoàn thiện theo sở thích',
    ritualStepThreeText:
      'Thêm 120–180ml sữa, chất tạo ngọt, gia vị hoặc đá.',

    productDetails: 'Thông tin sản phẩm',
    detailsTitle: 'Những điều cần biết.',

    ingredients: 'Thành phần',
    ingredientsValue: '100% bột cacao',

    flavour: 'Hương vị',
    flavourValue: 'Chocolate đen · rang thơm · cân bằng',

    bestFor: 'Phù hợp',
    bestForValue: 'Đồ uống · làm bánh · bữa sáng',

    storage: 'Bảo quản',
    storageValue: 'Nơi khô ráo, thoáng mát · đóng kín sau khi mở',

    origin: 'Xuất xứ',
    originValue: 'Thay bằng nguồn gốc cacao thật của bạn',

    shelfLife: 'Hạn sử dụng',
    shelfLifeValue: 'Thay bằng hạn sử dụng thực tế',

    quote:
      '“Một loại cacao có hương vị của nguyên liệu thật, không phải hương liệu.”',

    newsletterEyebrow: 'Kết nối cùng chúng tôi',
    newsletterTitle:
      'Công thức, sản phẩm mới và những câu chuyện về cacao.',

    emailAddress: 'Địa chỉ email',
    emailPlaceholder: 'Địa chỉ email của bạn',
    join: 'Đăng ký',

    footerExplore: 'Khám phá',
    footerHelp: 'Hỗ trợ',
    footerFollow: 'Theo dõi',

    shippingReturns: 'Giao hàng & đổi trả',
    privacy: 'Chính sách bảo mật',

    copyrightText:
      'Hãy thay tất cả thông tin doanh nghiệp mẫu trước khi đưa website vào hoạt động.',

    yourCart: 'Giỏ hàng của bạn',
    emptyCart: 'Giỏ hàng của bạn đang trống.',

    subtotal: 'Tạm tính',
    checkout: 'Thanh toán',

    checkoutDemo:
      'Nút thanh toán hiện chỉ là bản demo — hãy kết nối Shopify, Stripe hoặc nhà cung cấp thanh toán khác trước khi ra mắt.',

    qty: 'SL',
    each: 'mỗi sản phẩm',

    cartProductName: 'Cacao Nguyên Chất',

    checkoutAlert:
      'Đây hiện chỉ là bản thanh toán demo. Hãy kết nối Shopify, Stripe, WooCommerce hoặc nhà cung cấp thanh toán thực tế trước khi ra mắt.',

    newsletterSuccess:
      'Cảm ơn bạn! Biểu mẫu demo này đã sẵn sàng để kết nối với Mailchimp, Klaviyo hoặc nền tảng email của bạn.'
  },


  en: {
    announcement:
      'Free shipping on orders over 500,000 VND · Small-batch cacao',

    navShop: 'Shop',
    navStory: 'Our story',
    navRitual: 'Cacao ritual',
    navContact: 'Contact',

    cart: 'Cart',

    heroEyebrow: 'Single-origin · Pure cacao',
    notePure: '100% cacao',
    noteBalanced: 'Rich & balanced',

    productEyebrow: 'Signature cacao powder',
    productTitle: 'Pure Cacao',
    productSubtitle: 'Balanced Roast',

    productIntro:
      'Deep chocolate notes, a clean finish, and just enough natural bitterness. Made for morning cups, iced cacao, baking, and everything in between.',

    size: 'Size',
    quantity: 'Quantity',
    addToCart: 'Add to cart',

    trustNoAdditives: '✓ No additives',
    trustVegan: '✓ Vegan',
    trustSmallBatch: '✓ Small batch',

    marquee:
      'PURE CACAO ✦ SLOW ROASTED ✦ TRACEABLE ORIGIN ✦ NATURALLY RICH ✦',

    storyEyebrow: 'From bean to cup',
    storyTitle: 'Cacao with nothing to hide.',

    storyParagraphOne:
      'We keep the ingredient list short and the process thoughtful. Our cacao is selected for character, roasted to preserve aroma, then milled into a fine powder that dissolves beautifully in hot or cold drinks.',

    storyParagraphTwo:
      'Replace this text with your own farm, sourcing, origin, fermentation, roasting, or founder story.',

    featureOneTitle: 'Pure ingredient',
    featureOneText:
      '100% cacao powder. No fillers, artificial flavouring, or unnecessary extras.',

    featureTwoTitle: 'Balanced flavour',
    featureTwoText:
      'Bold chocolate character with gentle acidity and a smooth roasted finish.',

    featureThreeTitle: 'Everyday versatile',
    featureThreeText:
      'Whisk into milk, blend with ice, add to oats, or use as your baking cacao.',

    ritualEyebrow: 'Your daily ritual',
    ritualTitle: 'Make it hot. Make it iced. Make it yours.',

    ritualStepOneTitle: '10g cacao',
    ritualStepOneText: 'Add roughly two teaspoons to your cup.',

    ritualStepTwoTitle: '60ml hot water',
    ritualStepTwoText: 'Whisk until glossy and smooth.',

    ritualStepThreeTitle: 'Finish your way',
    ritualStepThreeText:
      'Add 120–180ml milk, sweetener, spice, or ice.',

    productDetails: 'Product details',
    detailsTitle: 'The essentials.',

    ingredients: 'Ingredients',
    ingredientsValue: '100% cacao powder',

    flavour: 'Flavour',
    flavourValue: 'Dark chocolate · roasted · balanced',

    bestFor: 'Best for',
    bestForValue: 'Drinks · baking · breakfast',

    storage: 'Storage',
    storageValue: 'Cool, dry place · reseal after opening',

    origin: 'Origin',
    originValue: 'Edit with your cacao origin',

    shelfLife: 'Shelf life',
    shelfLifeValue: 'Edit with your real shelf life',

    quote:
      '“A cacao that tastes like an ingredient, not a flavouring.”',

    newsletterEyebrow: 'Stay close',
    newsletterTitle: 'Recipes, releases & cacao notes.',

    emailAddress: 'Email address',
    emailPlaceholder: 'Your email address',
    join: 'Join',

    footerExplore: 'Explore',
    footerHelp: 'Help',
    footerFollow: 'Follow',

    shippingReturns: 'Shipping & returns',
    privacy: 'Privacy',

    copyrightText:
      'Replace all placeholder business details before launch.',

    yourCart: 'Your cart',
    emptyCart: 'Your cart is empty.',

    subtotal: 'Subtotal',
    checkout: 'Checkout',

    checkoutDemo:
      'Demo checkout button — connect Shopify, Stripe, or another payment provider before launch.',

    qty: 'Qty',
    each: 'each',

    cartProductName: 'Pure Cacao',

    checkoutAlert:
      'Demo checkout only. Connect your real Shopify, Stripe, WooCommerce, or other checkout before launch.',

    newsletterSuccess:
      'Thanks — this demo form is ready to connect to Mailchimp, Klaviyo, or your email platform.'
  }
};


// ================================
// LANGUAGE
// ================================

// Vietnamese is the default.
//
// If the visitor previously chose English,
// localStorage remembers their choice.
let currentLanguage = localStorage.getItem('language') || 'vi';

if (!translations[currentLanguage]) {
  currentLanguage = 'vi';
}


// ================================
// MONEY FORMAT
// ================================

function money(value) {
  const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-IE';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND'
  }).format(value);
}


// ================================
// DOM ELEMENTS
// ================================

const price = document.querySelector('#price');
const buttonPrice = document.querySelector('#buttonPrice');

const qtyValue = document.querySelector('#quantityValue');

const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const cartItems = document.querySelector('#cartItems');

const cartDrawer = document.querySelector('#cartDrawer');
const overlay = document.querySelector('#overlay');

const languageSelector = document.querySelector('#languageSelector');

const emailInput = document.querySelector('#email');


// ================================
// PRODUCT PRICE
// ================================

function refreshProductPrice() {
  price.textContent = money(state.unitPrice);

  buttonPrice.textContent = money(
    state.unitPrice * state.quantity
  );

  qtyValue.textContent = state.quantity;
}


// ================================
// CHANGE PRODUCT SIZE
// ================================

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelectorAll('.size-btn').forEach(button => {
      button.classList.remove('active');
    });

    btn.classList.add('active');

    state.size = btn.dataset.size;
    state.unitPrice = Number(btn.dataset.price);

    refreshProductPrice();
  });
});


// ================================
// QUANTITY
// ================================

document.querySelector('#minus').addEventListener('click', () => {

  state.quantity = Math.max(
    1,
    state.quantity - 1
  );

  refreshProductPrice();
});


document.querySelector('#plus').addEventListener('click', () => {

  state.quantity += 1;

  refreshProductPrice();
});


// ================================
// OPEN / CLOSE CART
// ================================

function openCart() {
  cartDrawer.classList.add('open');

  cartDrawer.setAttribute(
    'aria-hidden',
    'false'
  );

  overlay.classList.add('show');

  document.body.style.overflow = 'hidden';
}


function closeCart() {
  cartDrawer.classList.remove('open');

  cartDrawer.setAttribute(
    'aria-hidden',
    'true'
  );

  overlay.classList.remove('show');

  document.body.style.overflow = '';
}


// ================================
// RENDER CART
// ================================

function renderCart() {

  const count = state.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = count;
  cartTotal.textContent = money(total);


  // Empty cart
  if (!state.cart.length) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        ${translations[currentLanguage].emptyCart}
      </p>
    `;

    return;
  }


  // Cart with products
  cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item">

      <div>

        <strong>
          ${translations[currentLanguage].cartProductName}
          ·
          ${item.size}
        </strong>

        <br>

        <small>
          ${translations[currentLanguage].qty}
          ${item.quantity}
          ·
          ${money(item.price)}
          ${translations[currentLanguage].each}
        </small>

      </div>

      <strong>
        ${money(item.price * item.quantity)}
      </strong>

    </div>
  `).join('');
}


// ================================
// ADD TO CART
// ================================

document.querySelector('#addToCart').addEventListener('click', () => {

  const existing = state.cart.find(
    item => item.size === state.size
  );


  if (existing) {

    existing.quantity += state.quantity;

  } else {

    state.cart.push({
      size: state.size,
      price: state.unitPrice,
      quantity: state.quantity
    });

  }


  state.quantity = 1;

  refreshProductPrice();

  renderCart();

  openCart();
});


// ================================
// CART EVENTS
// ================================

document
  .querySelector('#cartButton')
  .addEventListener('click', openCart);


document
  .querySelector('#closeCart')
  .addEventListener('click', closeCart);


overlay.addEventListener(
  'click',
  closeCart
);


// ================================
// CHECKOUT
// ================================

document
  .querySelector('#checkoutButton')
  .addEventListener('click', () => {

    alert(
      translations[currentLanguage].checkoutAlert
    );

  });


// ================================
// MOBILE NAVIGATION
// ================================

const menuToggle = document.querySelector('.menu-toggle');

const nav = document.querySelector('.nav');


menuToggle.addEventListener('click', () => {

  const open = nav.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    String(open)
  );
});


nav.querySelectorAll('a').forEach(link => {

  link.addEventListener('click', () => {

    nav.classList.remove('open');

    menuToggle.setAttribute(
      'aria-expanded',
      'false'
    );

  });

});


// ================================
// NEWSLETTER
// ================================

document
  .querySelector('#newsletterForm')
  .addEventListener('submit', event => {

    event.preventDefault();

    document.querySelector('#formMessage').textContent =
      translations[currentLanguage].newsletterSuccess;

    event.currentTarget.reset();

  });


// ================================
// CHANGE LANGUAGE
// ================================

function setLanguage(language) {

  if (!translations[language]) {
    language = 'vi';
  }

  currentLanguage = language;


  // Update HTML language
  document.documentElement.lang = language;


  // Save visitor preference
  localStorage.setItem(
    'language',
    language
  );


  // Update language dropdown
  if (languageSelector) {
    languageSelector.value = language;
  }


  // Translate all data-i18n elements
  document
    .querySelectorAll('[data-i18n]')
    .forEach(element => {

      const key = element.dataset.i18n;

      if (translations[language][key] !== undefined) {

        element.textContent =
          translations[language][key];

      }

    });


  // Translate email placeholder
  if (emailInput) {

    emailInput.placeholder =
      translations[language].emailPlaceholder;

  }


  // Translate aria labels
  updateAccessibilityLabels();


  // Price formatting may change depending on language
  refreshProductPrice();


  // Cart may contain dynamic text
  renderCart();


  // Clear old newsletter response when switching language
  const formMessage =
    document.querySelector('#formMessage');

  if (formMessage) {
    formMessage.textContent = '';
  }
}


// ================================
// ACCESSIBILITY TRANSLATIONS
// ================================

function updateAccessibilityLabels() {

  const isVietnamese =
    currentLanguage === 'vi';


  document
    .querySelector('.menu-toggle')
    .setAttribute(
      'aria-label',
      isVietnamese
        ? 'Mở menu'
        : 'Open menu'
    );


  document
    .querySelector('#cartButton')
    .setAttribute(
      'aria-label',
      isVietnamese
        ? 'Mở giỏ hàng'
        : 'Open cart'
    );


  document
    .querySelector('#closeCart')
    .setAttribute(
      'aria-label',
      isVietnamese
        ? 'Đóng giỏ hàng'
        : 'Close cart'
    );


  document
    .querySelector('#minus')
    .setAttribute(
      'aria-label',
      isVietnamese
        ? 'Giảm số lượng'
        : 'Decrease quantity'
    );


  document
    .querySelector('#plus')
    .setAttribute(
      'aria-label',
      isVietnamese
        ? 'Tăng số lượng'
        : 'Increase quantity'
    );


  if (languageSelector) {

    languageSelector.setAttribute(
      'aria-label',
      isVietnamese
        ? 'Chọn ngôn ngữ'
        : 'Choose language'
    );

  }
}


// ================================
// LANGUAGE DROPDOWN EVENT
// ================================

if (languageSelector) {

  languageSelector.addEventListener(
    'change',
    event => {

      setLanguage(
        event.target.value
      );

    }
  );

}


// ================================
// CURRENT YEAR
// ================================

document.querySelector('#year').textContent =
  new Date().getFullYear();


// ================================
// INITIALISE WEBSITE
// ================================

// Apply Vietnamese by default,
// or restore visitor's previous choice.
setLanguage(currentLanguage);
/* Bazan Cacao — dữ liệu site.
   Mọi chỗ ghi "CẬP NHẬT" là nội dung chờ khách hàng cung cấp/duyệt. */
window.BZ = {
  config: {
    // Email nhận đơn hàng, báo giá, liên hệ (CẬP NHẬT)
    email: "",
    // Nếu dùng dịch vụ form (Formspree, Getform...), dán URL vào đây; để trống sẽ mở ứng dụng email.
    formEndpoint: "",
    phone: "",
    address: "",
    links: {
      shopee: "#",
      tiktok: "#",
      facebook: "https://www.facebook.com/BazanCacao",
      instagram: "https://www.instagram.com/bazancacao.vn"
    }
  },

  products: [
    {
      id: "bot-cacao",
      name: "Bột cacao nguyên chất",
      short: "Vị cacao đậm, nguyên bản từ đất đỏ bazan.",
      variants: [
        { label: "150g", price: 149000 },
        { label: "250g", price: 239000 },
        { label: "500g", price: 449000 }
      ],
      colors: ["#5E0101", "#FFF1D6"],
      desc: "Bột cacao nguyên chất từ hạt cacao trồng trên đất đỏ bazan, giữ trọn vị đậm và hương thơm tự nhiên. Một vị nguyên bản cho muôn cách thưởng thức: pha nóng, pha đá, làm bánh hay nấu chè.",
      ingredients: "CẬP NHẬT theo nhãn sản phẩm.",
      usage: "Pha 2 muỗng cà phê (khoảng 10g) với 150ml nước nóng hoặc sữa ấm, khuấy đều. Thêm đá hoặc chút mật ong tùy khẩu vị.",
      storage: "Đậy kín sau khi mở, bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp."
    },
    {
      id: "socola-80",
      name: "Socola 80% cacao",
      short: "Đắng thanh, ít đường, tan chậm.",
      variants: [{ label: "40g", price: 95000 }],
      colors: ["#1F2D13", "#FFF1D6"],
      desc: "Thanh socola 80% cacao với vị đắng thanh, hậu vị trái cây đặc trưng của cacao vùng bazan. Ít đường, dành cho người thích vị cacao thật.",
      ingredients: "CẬP NHẬT theo nhãn sản phẩm.",
      usage: "Dùng trực tiếp, để tan chậm trong miệng để cảm nhận trọn tầng hương. Kết hợp cùng cà phê hoặc trà.",
      storage: "Bảo quản ở 18–22°C, nơi khô ráo, tránh ánh nắng và nhiệt độ cao."
    },
    {
      id: "tra-vo-lua",
      name: "Trà vỏ lụa cacao",
      short: "Hương cacao dịu nhẹ trong một tách trà.",
      variants: [{ label: "60g", price: 95000 }],
      colors: ["#8A4B2A", "#FFF1D6"],
      desc: "Trà làm từ lớp vỏ lụa bao quanh hạt cacao, phần thường bị bỏ đi sau khi rang. Nước trà màu hổ phách, hương cacao dịu nhẹ, không caffeine đậm như cà phê.",
      ingredients: "CẬP NHẬT theo nhãn sản phẩm.",
      usage: "Hãm 3–5g trà với 200ml nước sôi trong 3–5 phút. Có thể pha thêm sữa hoặc mật ong.",
      storage: "Đóng kín túi sau khi dùng, bảo quản nơi khô ráo, thoáng mát."
    },
    {
      id: "hat-phu-socola",
      name: "Hạt phủ socola",
      short: "Món nhâm nhi giòn bùi, phủ socola đậm.",
      variants: [{ label: "100g", price: 120000 }],
      colors: ["#2B0000", "#E9C9A0"],
      desc: "Hạt giòn bùi phủ lớp socola đậm vị cacao — món ăn vặt ít ngọt cho giờ trà chiều hay những buổi làm việc dài.",
      ingredients: "CẬP NHẬT theo nhãn sản phẩm.",
      usage: "Dùng trực tiếp. Ngon hơn khi để mát.",
      storage: "Bảo quản nơi khô ráo, thoáng mát, dưới 25°C. Đóng kín túi sau khi mở."
    },
    {
      id: "combo-cacaoholic",
      name: "Combo CacaoHolic",
      combo: true,
      short: "Dành cho người mê vị cacao đậm.",
      variants: [{ label: "Combo", price: 399000 }],
      colors: ["#5E0101", "#E9C9A0"],
      desc: "Bộ quà dành cho người yêu vị cacao đậm đà.",
      contents: "CẬP NHẬT sản phẩm trong combo.",
      ingredients: "Xem thành phần từng sản phẩm trong combo.",
      usage: "Xem hướng dẫn trên từng sản phẩm.",
      storage: "Bảo quản nơi khô ráo, thoáng mát."
    },
    {
      id: "combo-hao-vat",
      name: "Combo Hảo Vặt",
      combo: true,
      short: "Những món nhâm nhi ít ngọt.",
      variants: [{ label: "Combo", price: 399000 }],
      colors: ["#8A4B2A", "#2B0000"],
      desc: "Bộ quà cho những người thích ăn vặt mà vẫn muốn ít đường.",
      contents: "CẬP NHẬT sản phẩm trong combo.",
      ingredients: "Xem thành phần từng sản phẩm trong combo.",
      usage: "Xem hướng dẫn trên từng sản phẩm.",
      storage: "Bảo quản nơi khô ráo, thoáng mát."
    },
    {
      id: "combo-nham-nhi",
      name: "Combo Nhâm Nhi",
      combo: true,
      short: "Một tách trà, một miếng socola.",
      variants: [{ label: "Combo", price: 399000 }],
      colors: ["#1F2D13", "#E9C9A0"],
      desc: "Bộ quà cho những khoảng nghỉ chậm rãi.",
      contents: "CẬP NHẬT sản phẩm trong combo.",
      ingredients: "Xem thành phần từng sản phẩm trong combo.",
      usage: "Xem hướng dẫn trên từng sản phẩm.",
      storage: "Bảo quản nơi khô ráo, thoáng mát."
    },
    {
      id: "combo-tron-ven",
      name: "Combo Trọn vẹn Cacao",
      combo: true,
      short: "Đủ 4 dòng sản phẩm Bazan Cacao.",
      variants: [{ label: "Đủ 4 dòng", price: 599000 }],
      colors: ["#2B0000", "#FFF1D6"],
      desc: "Trọn bộ 4 dòng sản phẩm: bột cacao nguyên chất, socola 80% cacao, trà vỏ lụa cacao và hạt phủ socola. Một vị nguyên bản, muôn vàn trải nghiệm.",
      contents: "Bột cacao nguyên chất · Socola 80% cacao · Trà vỏ lụa cacao · Hạt phủ socola (quy cách: CẬP NHẬT).",
      ingredients: "Xem thành phần từng sản phẩm trong combo.",
      usage: "Xem hướng dẫn trên từng sản phẩm.",
      storage: "Bảo quản nơi khô ráo, thoáng mát."
    }
  ],

  // Dùng chung cho trang Blog và chatbot. Câu trả lời là bản nháp — CẬP NHẬT/duyệt với khách hàng.
  faq: [
    {
      q: "Bột cacao Bazan Cacao có đường không?",
      a: "Bột cacao nguyên chất là cacao nguyên bản, không pha sẵn đường. Bạn có thể tự điều chỉnh độ ngọt khi pha.",
      k: ["duong", "ngot", "it duong", "khong duong", "clean label"]
    },
    {
      q: "Pha bột cacao như thế nào cho ngon?",
      a: "Pha 2 muỗng cà phê (khoảng 10g) với 150ml nước nóng hoặc sữa ấm, khuấy đều. Thích uống lạnh thì thêm đá. Xem thêm các công thức pha trên trang Blog.",
      k: ["pha", "cong thuc", "cach dung", "uong", "nong", "da"]
    },
    {
      q: "Bảo quản sản phẩm thế nào?",
      a: "Đậy kín sau khi mở, để nơi khô ráo, thoáng mát, tránh ánh nắng. Socola nên giữ ở 18–22°C.",
      k: ["bao quan", "han", "han dung", "hong", "de duoc"]
    },
    {
      q: "Tôi có thể mua ở đâu?",
      a: "Bạn đặt trực tiếp trên website này, hoặc mua qua gian hàng Shopee và TikTok Shop của Bazan Cacao.",
      k: ["mua", "o dau", "shopee", "tiktok", "dat hang", "dat"]
    },
    {
      q: "Giao hàng mất bao lâu?",
      a: "Sau khi nhận đơn, chúng tôi gọi xác nhận và báo thời gian, phí giao hàng cụ thể theo địa chỉ của bạn.",
      k: ["giao", "ship", "van chuyen", "bao lau", "phi"]
    },
    {
      q: "Quán cà phê, nhà hàng có thể nhập sỉ không?",
      a: "Có. Bột cacao cho doanh nghiệp được cung cấp từ 10kg. Vui lòng gửi yêu cầu ở trang Giải pháp B2B để nhận báo giá.",
      k: ["si", "b2b", "nhap", "doanh nghiep", "quan", "cafe", "nha hang", "khach san", "kg", "bao gia"]
    },
    {
      q: "Có quà tặng doanh nghiệp in logo không?",
      a: "Có. Quà tặng doanh nghiệp được chiết khấu 10%, 15% hoặc 20% theo số lượng và có thể in logo công ty. Gửi yêu cầu ở trang Giải pháp B2B.",
      k: ["qua", "qua tang", "logo", "chiet khau", "tet", "trung thu", "giang sinh"]
    },
    {
      q: "Hội Một Vị là gì?",
      a: "Hội Một Vị là chương trình thành viên của Bazan Cacao: tích điểm cho mỗi đơn hàng và nhận quà sinh nhật. Bạn có thể đăng ký khi đặt hàng.",
      k: ["hoi mot vi", "thanh vien", "tich diem", "sinh nhat", "member"]
    },
    {
      q: "Workshop \"Hành Trình Một Vị\" diễn ra thế nào?",
      a: "Workshop gồm 5 chương theo mùa, tối đa 30 chỗ mỗi buổi. Lịch các buổi sẽ được thông báo trên trang Blog và fanpage.",
      k: ["workshop", "hanh trinh", "su kien", "lop", "trai nghiem"]
    }
  ],

  recipes: [
    {
      name: "Cacao nóng nguyên bản",
      time: "5 phút",
      // Ảnh: Karthick Gislen / Unsplash — https://unsplash.com/photos/GHnsgYYsY8M
      img: "assets/img/cacao-nong.jpg",
      ing: ["10g bột cacao nguyên chất", "150ml sữa tươi hoặc nước nóng", "Mật ong hoặc đường (tùy chọn)"],
      steps: ["Hòa bột cacao với 2 muỗng nước nóng cho tan thành sệt.", "Rót sữa ấm vào, khuấy đều.", "Nêm ngọt tùy khẩu vị, thưởng thức khi còn ấm."]
    },
    {
      name: "Cacao sữa đá",
      time: "5 phút",
      // Ảnh: American Heritage Chocolate / Unsplash — https://unsplash.com/photos/e0cEh3LURnI
      img: "assets/img/cacao-sua-da.jpg",
      ing: ["15g bột cacao nguyên chất", "30ml nước nóng", "100ml sữa tươi", "Đá viên"],
      steps: ["Hòa bột cacao với nước nóng cho tan hoàn toàn.", "Cho đá vào ly, rót sữa tươi.", "Rót cacao lên trên, khuấy đều khi uống."]
    },
    {
      name: "Trà vỏ lụa cacao sữa",
      time: "7 phút",
      ing: ["5g trà vỏ lụa cacao", "150ml nước sôi", "50ml sữa tươi", "Mật ong (tùy chọn)"],
      steps: ["Hãm trà với nước sôi 4–5 phút rồi lọc bỏ bã.", "Thêm sữa tươi ấm và mật ong.", "Dùng nóng, hoặc để nguội rồi thêm đá."]
    }
  ]
};

/* Bazan Cacao — dữ liệu site.
   Mọi chỗ ghi "CẬP NHẬT" là nội dung chờ khách hàng cung cấp/duyệt. */
window.BZ = {
  config: {
    // Email nhận đơn hàng, báo giá, liên hệ (CẬP NHẬT)
    email: "bazancacaoo@gmail.com",
    // Web3Forms: dán Access Key (nhận qua email khi tạo form trên web3forms.com) vào formKey.
    // Để trống formKey sẽ mở ứng dụng email của khách.
    formEndpoint: "https://api.web3forms.com/submit",
    formKey: "896ad7a0-e7b3-4d59-b6ed-0d3ba32de878",
    phone: "098 632 26 65",
    address: "Phường Yên Hoà, Thành phố Hà Nội",
    // Đăng nhập Google (Firebase). Dán cấu hình từ Firebase Console > Project settings > Your apps.
    // Để trống apiKey thì website không hiện nút đăng nhập. Hướng dẫn: README.md.
    firebase: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      appId: ""
    },
    links: {
      shopee: "#",
      tiktok: "#",
      facebook: "https://www.facebook.com/BazanCacao",
      instagram: "https://www.instagram.com/bazancacao.vn"
    }
  },

  // category: dòng chữ nhỏ trên tên sản phẩm. Combo chỉ có "contents" (Trong bộ có).
  // images: ảnh thật (ảnh đầu dùng cho thẻ sản phẩm); chưa có ảnh thì hiện hình minh họa bao bì.
  products: [
    {
      id: "bot-cacao",
      category: "Bột cacao",
      name: "Bột cacao nguyên chất",
      images: ["assets/img/sp-bot-cacao.jpg", "assets/img/sp-bot-cacao-ngang.jpg"],
      variants: [
        { label: "150g", price: 149000 },
        { label: "250g", price: 239000 },
        { label: "500g", price: 449000 }
      ],
      colors: ["#5E0101", "#FFF1D6"],
      desc: "100% cacao nguyên chất, không đường. Vị đắng sâu, chua thanh nhẹ, hợp pha nóng, pha đá hay làm bánh.",
      ingredients: "100% bột cacao nguyên chất.\nKhông dùng nếu dị ứng với thành phần trên.",
      usage: "Gợi ý: 40g bột + 1 muỗng sữa + 100ml nước nóng, khuấy đều. Tăng giảm lượng bột, sữa hoặc đường theo khẩu vị.",
      storage: "Nơi khô ráo, thoáng mát, nhiệt độ 18–26°C. Tránh ánh nắng trực tiếp. Đậy kín sau khi mở."
    },
    {
      id: "socola-85",
      category: "Socola",
      name: "Socola đen 85% cacao",
      images: ["assets/img/sp-socola-85.jpg", "assets/img/sp-socola-85-ngang.jpg"],
      variants: [{ label: "40g", price: 95000 }],
      colors: ["#1F2D13", "#FFF1D6"],
      desc: "Thanh socola đen 85% cacao, ít ngọt. Đắng đậm, tan chậm, hợp nhâm nhi cùng cà phê hoặc trà.",
      ingredients: "Hạt cacao, đường mía, bơ cacao. Hàm lượng cacao 85%.\nCó thể chứa vết các loại hạt cây. Không dùng nếu dị ứng với thành phần trên.",
      usage: "Dùng ngay sau khi mở bao bì. Gợi ý: bẻ từng miếng nhỏ, để tan dần trên lưỡi để cảm nhận rõ vị.",
      storage: "Nơi khô ráo, nhiệt độ 18–23°C. Tránh ánh nắng trực tiếp."
    },
    {
      id: "tra-vo-lua",
      category: "Trà",
      name: "Trà vỏ lụa cacao",
      variants: [{ label: "60g", price: 95000 }],
      colors: ["#8A4B2A", "#FFF1D6"],
      desc: "Trà làm từ lớp vỏ lụa bao quanh hạt cacao, phần thường bị bỏ đi khi chế biến. Nước trà màu hổ phách, thơm nhẹ mùi cacao, uống nóng hay lạnh đều hợp.",
      ingredients: "Vỏ lụa hạt cacao, bột cacao và bơ cacao.\nKhông dùng nếu dị ứng với thành phần trên.",
      usage: "Gợi ý: 3–5g trà + 200ml nước sôi khoảng 90°C, hãm 3–5 phút. Thêm mật ong hoặc chanh tùy khẩu vị.",
      storage: "Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đóng kín túi sau khi mở để giữ hương."
    },
    {
      id: "hat-dieu-phu-socola",
      category: "Hạt điều phủ socola",
      name: "Hạt điều phủ socola",
      variants: [{ label: "100g", price: 120000 }],
      colors: ["#2B0000", "#E9C9A0"],
      desc: "Hạt điều giòn, bọc lớp socola đen. Món ăn vặt ít ngọt cho giờ làm việc hay những buổi trò chuyện.",
      ingredients: "Hạt điều, socola đen.\nKhông dùng nếu dị ứng với các loại hạt hoặc thành phần trên.",
      usage: "Dùng ngay. Ngon hơn khi để mát khoảng 10 phút trước khi ăn.",
      storage: "Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đóng kín túi sau khi mở để hạt giữ độ giòn."
    },
    {
      id: "ghien-cacao",
      category: "Quà tặng",
      name: "Ghiền Cacao",
      combo: true,
      variants: [{ label: "Hộp quà", price: 399000 }],
      colors: ["#5E0101", "#E9C9A0"],
      desc: "Hộp quà dành cho người ghiền thức uống từ cacao.",
      contents: "Bột cacao nguyên chất 250g · Trà vỏ lụa cacao (5 gói) · Tặng 1 thìa vàng"
    },
    {
      id: "hao-vat",
      category: "Quà tặng",
      name: "Hảo Vặt",
      combo: true,
      variants: [{ label: "Hộp quà", price: 399000 }],
      colors: ["#8A4B2A", "#2B0000"],
      desc: "Hộp quà cho những giờ ăn vặt ít ngọt.",
      contents: "Bột cacao nguyên chất 250g · Socola 85% cacao 40g · Tặng 1 thìa vàng"
    },
    {
      id: "nham-nhi",
      category: "Quà tặng",
      name: "Nhâm Nhi",
      combo: true,
      variants: [{ label: "Hộp quà", price: 399000 }],
      colors: ["#1F2D13", "#E9C9A0"],
      desc: "Hộp quà cho những buổi trà chiều thong thả.",
      contents: "Bột cacao nguyên chất 150g · Socola 85% cacao 40g · Hạt điều phủ socola 100g"
    },
    {
      id: "tron-ven-cacao",
      category: "Quà tặng",
      name: "Trọn Vẹn Cacao",
      combo: true,
      variants: [{ label: "Hộp quà", price: 599000 }],
      colors: ["#2B0000", "#FFF1D6"],
      desc: "Hộp quà trọn vẹn trải nghiệm với cacao.",
      contents: "Bột cacao nguyên chất 150g · Trà vỏ lụa cacao (5 gói) · Socola 85% cacao 40g · Hạt điều phủ socola 100g"
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
      a: "Gợi ý: 40g bột + 1 muỗng sữa + 100ml nước nóng, khuấy đều, tăng giảm theo khẩu vị. Thích uống lạnh thì thêm đá. Xem thêm các công thức pha trên trang Blog.",
      k: ["pha", "cong thuc", "cach dung", "uong", "nong", "da"]
    },
    {
      q: "Bảo quản sản phẩm thế nào?",
      a: "Đậy kín sau khi mở, để nơi khô ráo, thoáng mát, tránh ánh nắng. Socola nên giữ ở 18–23°C.",
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
      name: "Trà vỏ lụa cacao",
      time: "5 phút",
      // Ảnh: Aniketh Kanukurthi / Unsplash — https://unsplash.com/photos/Qaor6nxikUM
      img: "assets/img/tra-vo-lua.jpg",
      ing: ["5g trà vỏ lụa cacao", "200ml nước sôi", "Mật ong (tùy chọn)"],
      steps: ["Tráng ấm bằng nước sôi, cho trà vào.", "Hãm với 200ml nước sôi trong 4–5 phút rồi lọc bỏ bã.", "Thưởng thức nóng, hoặc để nguội rồi thêm đá. Thêm chút mật ong nếu thích."]
    }
  ]
};

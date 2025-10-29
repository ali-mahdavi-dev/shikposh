import { http, HttpResponse } from 'msw';

// Mock database - in a real app, this would be imported from db.json
// For MSW, we'll define it inline to avoid import issues
const db = {
  products: [
    {
      id: "1",
      name: "پیراهن مجلسی زنانه",
      brand: "Fashion Elite",
      rating: 4.8,
      reviewCount: 156,
      description: "پیراهن مجلسی شیک و زیبا با طراحی مدرن و پارچه با کیفیت بالا. مناسب برای مهمانی‌ها و مراسم خاص.",
      features: ["پارچه ساتن با کیفیت بالا", "طراحی مدرن و شیک", "قابل شستشو در ماشین لباسشویی", "مناسب برای تمام فصول"],
      colors: { red: { name: "قرمز" }, blue: { name: "آبی" } },
      variants: {
        red: {
          S: { price: 299000, stock: 3, discount: 10, images: ["/images/dress-main.jpg", "/images/dress-alt1.jpg"] },
          M: { price: 309000, stock: 0, discount: 5, images: ["/images/dress-alt2.jpeg", "/images/dress-main.jpg"] },
        },
        blue: {
          S: { price: 319000, stock: 2, discount: 0, images: ["/images/dress-alt1.jpg", "/images/dress-main.jpg"] },
          M: { price: 329000, stock: 1, discount: 15, images: ["/blue-m.jpg"] },
          XL: { price: 349000, stock: 12, discount: 10, images: ["/images/dress-alt1.jpg", "/images/dress-alt2.jpeg"] },
        },
      },
      specs: { "جنس پارچه": "ساتن", "نوع آستین": "کوتاه", "طول": "زیر زانو", "مناسب برای": "مهمانی و مراسم", "راهنمای شستشو": "شستشوی ماشینی در آب سرد", "کشور تولید": "ترکیه" },
      category: "dresses",
      tags: ["مجلسی", "جدید"],
      image: "/images/dress-main.jpg",
      price: 299000,
      originalPrice: 350000,
      discount: 15,
      isNew: false,
      isFeatured: true,
      sizes: ["S", "M", "XL"],
    },
    {
      id: "featured1",
      name: "پیراهن مجلسی ساتن قرمز",
      price: 299000,
      originalPrice: 350000,
      discount: 15,
      rating: 4.8,
      reviewCount: 156,
      image: "/images/carousel-homepage-one.jpg",
      category: "dresses",
      isNew: false,
      isFeatured: true,
      colors: { red: { name: "قرمز", stock: 5, discount: 15 }, black: { name: "مشکی", stock: 3, discount: 0 } },
      sizes: ["S", "M", "L", "XL"],
      brand: "Fashion Elite",
      description: "پیراهن مجلسی شیک و زیبا",
    },
    {
      id: "featured2",
      name: "بلوز حریر طرح‌دار",
      price: 180000,
      originalPrice: 220000,
      discount: 18,
      rating: 4.6,
      reviewCount: 89,
      image: "/images/harir.jpeg",
      category: "tops",
      isNew: true,
      isFeatured: true,
      colors: { blue: { name: "آبی", stock: 8, discount: 18 }, white: { name: "سفید", stock: 5, discount: 18 } },
      sizes: ["S", "M", "L"],
      brand: "Silk Touch",
      description: "بلوز حریر با طرح زیبا",
    },
    {
      id: "featured3",
      name: "دامن پلیسه بلند",
      price: 120000,
      originalPrice: 150000,
      discount: 20,
      rating: 4.7,
      reviewCount: 67,
      image: "/images/daman.jpeg",
      category: "skirts",
      isNew: false,
      isFeatured: true,
      colors: { black: { name: "مشکی", stock: 6, discount: 20 }, navy: { name: "سرمه‌ای", stock: 4, discount: 20 } },
      sizes: ["S", "M", "L", "XL"],
      brand: "Elegant Style",
      description: "دامن پلیسه شیک و راحت",
    },
    {
      id: "featured4",
      name: "شلوار کتان جذب",
      price: 85000,
      originalPrice: 110000,
      discount: 23,
      rating: 4.5,
      reviewCount: 43,
      image: "/images/shalva-katan.jpeg",
      category: "pants",
      isNew: true,
      isFeatured: true,
      colors: { beige: { name: "بژ", stock: 7, discount: 23 }, white: { name: "سفید", stock: 5, discount: 23 } },
      sizes: ["S", "M", "L", "XL"],
      brand: "Comfort Wear",
      description: "شلوار کتان راحت و شیک",
    },
  ],
  categories: [
    { id: "all", name: "همه", count: 125, color: "#e91e63" },
    { id: "dresses", name: "پیراهن و لباس مجلسی", count: 45, color: "#f44336" },
    { id: "tops", name: "بلوز و تاپ", count: 30, color: "#ff9800" },
    { id: "skirts", name: "دامن", count: 20, color: "#4caf50" },
    { id: "pants", name: "شلوار", count: 15, color: "#2196f3" },
    { id: "accessories", name: "اکسسوری", count: 15, color: "#9c27b0" },
  ],
  reviews: [
    {
      id: 1,
      productId: "1",
      user: "مریم احمدی",
      rating: 5,
      date: "1403/01/15",
      comment: "پیراهن فوق‌العاده زیبا و با کیفیتی بود. جنس پارچه عالی و دوخت بسیار تمیز. قطعاً دوباره از این فروشگاه خرید خواهم کرد.",
      helpful: 12,
      notHelpful: 1,
      verified: true,
    },
    {
      id: 2,
      productId: "1",
      user: "سارا کریمی",
      rating: 4,
      date: "1403/01/10",
      comment: "محصول خوبی است اما رنگ کمی متفاوت از تصویر بود. در کل راضی هستم.",
      helpful: 8,
      notHelpful: 2,
      verified: true,
    },
    {
      id: 3,
      productId: "1",
      user: "فاطمه رضایی",
      rating: 5,
      date: "1403/01/05",
      comment: "عالی بود! سایز دقیقاً مطابق جدول بود و کیفیت پارچه بسیار خوب. پیشنهاد می‌کنم.",
      helpful: 15,
      notHelpful: 0,
      verified: true,
    },
  ],
  chatUsers: [
    { id: "1", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "2", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "3", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "4", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "5", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "6", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "7", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "8", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
    { id: "9", name: "Ali Ahmagh", avatar: "/images/alilaloii.jpg", isOnline: true },
  ],
};

export const handlers = [
  // Products
  http.get('/products', () => {
    return HttpResponse.json(db.products);
  }),

  http.get('/products/:id', ({ params }) => {
    const product = db.products.find((p) => p.id === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.get('/products', ({ request }) => {
    const url = new URL(request.url);
    const isFeatured = url.searchParams.get('isFeatured');
    const category = url.searchParams.get('category');
    
    let filteredProducts = db.products;
    
    if (isFeatured === 'true') {
      filteredProducts = filteredProducts.filter((p) => p.isFeatured === true);
    }
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }
    
    return HttpResponse.json(filteredProducts);
  }),

  // Categories
  http.get('/categories', () => {
    return HttpResponse.json(db.categories);
  }),

  // Reviews
  http.get('/reviews', ({ request }) => {
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    
    if (productId) {
      const reviews = db.reviews.filter((r) => r.productId === productId);
      return HttpResponse.json(reviews);
    }
    
    return HttpResponse.json(db.reviews);
  }),

  http.post('/reviews', async ({ request }) => {
    const newReview = await request.json() as any;
    const review = {
      id: db.reviews.length + 1,
      ...newReview,
    };
    db.reviews.push(review);
    return HttpResponse.json(review, { status: 201 });
  }),

  http.patch('/reviews/:id', async ({ params, request }) => {
    const id = parseInt(params.id as string);
    const review = db.reviews.find((r) => r.id === id);
    
    if (!review) {
      return new HttpResponse(null, { status: 404 });
    }
    
    const updates = await request.json() as any;
    Object.assign(review, updates);
    
    return HttpResponse.json(review);
  }),

  // Chat Users
  http.get('/chatUsers', () => {
    return HttpResponse.json(db.chatUsers);
  }),
];


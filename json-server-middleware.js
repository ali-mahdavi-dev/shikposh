const express = require('express');
const router = express.Router();

// Middleware برای اعتبارسنجی
const validateReview = (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      error: 'امتیاز باید بین 1 تا 5 باشد',
    });
  }

  if (!comment || comment.trim().length < 10) {
    return res.status(400).json({
      error: 'نظر باید حداقل 10 کاراکتر باشد',
    });
  }

  if (!productId) {
    return res.status(400).json({
      error: 'شناسه محصول الزامی است',
    });
  }

  next();
};

// Middleware برای اعتبارسنجی helpful
const validateHelpful = (req, res, next) => {
  const { type } = req.body;

  if (!type || !['helpful', 'notHelpful'].includes(type)) {
    return res.status(400).json({
      error: 'نوع باید helpful یا notHelpful باشد',
    });
  }

  next();
};

// POST /reviews - ایجاد نظر جدید
router.post('/reviews', validateReview, (req, res) => {
  const { rating, comment, productId } = req.body;

  // شبیه‌سازی تأخیر شبکه
  setTimeout(() => {
    const newReview = {
      id: Date.now().toString(),
      productId,
      userId: 'current-user', // در واقع از auth می‌آید
      user: 'کاربر فعلی',
      rating: parseInt(rating),
      comment: comment.trim(),
      date: new Date().toLocaleDateString('fa-IR'),
      helpful: 0,
      notHelpful: 0,
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json(newReview);
  }, 500);
});

// PATCH /reviews/:id - به‌روزرسانی مفید بودن
router.patch('/reviews/:id', validateHelpful, (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  // شبیه‌سازی تأخیر شبکه
  setTimeout(() => {
    // در واقعیت، این داده از دیتابیس می‌آید
    const mockReview = {
      id: parseInt(id),
      productId: '1',
      userId: 'user1',
      user: 'کاربر نمونه',
      rating: 4,
      comment: 'نظر نمونه',
      date: '1403/01/15',
      helpful: type === 'helpful' ? 1 : 0,
      notHelpful: type === 'notHelpful' ? 1 : 0,
      verified: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: new Date().toISOString(),
    };

    res.json(mockReview);
  }, 300);
});

// GET /reviews/search - جستجوی نظرات
router.get('/reviews/search', (req, res) => {
  const { q, productId, rating, verified } = req.query;

  // شبیه‌سازی جستجو
  setTimeout(() => {
    let reviews = [
      {
        id: 1,
        productId: '1',
        userId: 'user1',
        user: 'مریم احمدی',
        rating: 5,
        comment: 'پیراهن فوق‌العاده زیبا و با کیفیتی بود',
        helpful: 12,
        notHelpful: 1,
        verified: true,
      },
    ];

    // فیلتر بر اساس productId
    if (productId) {
      reviews = reviews.filter((r) => r.productId === productId);
    }

    // فیلتر بر اساس rating
    if (rating) {
      reviews = reviews.filter((r) => r.rating === parseInt(rating));
    }

    // فیلتر بر اساس verified
    if (verified === 'true') {
      reviews = reviews.filter((r) => r.verified);
    }

    // جستجو در متن
    if (q) {
      reviews = reviews.filter(
        (r) =>
          r.comment.toLowerCase().includes(q.toLowerCase()) ||
          r.user.toLowerCase().includes(q.toLowerCase()),
      );
    }

    res.json(reviews);
  }, 200);
});

// GET /reviews/stats/:productId - آمار نظرات
router.get('/reviews/stats/:productId', (req, res) => {
  const { productId } = req.params;

  setTimeout(() => {
    const stats = {
      totalReviews: 15,
      averageRating: 4.2,
      ratingDistribution: {
        5: 8,
        4: 4,
        3: 2,
        2: 1,
        1: 0,
      },
      helpfulPercentage: 85.5,
    };

    res.json(stats);
  }, 150);
});

// GET /products/:id/reviews - نظرات محصول خاص
router.get('/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10, sort = 'newest' } = req.query;

  setTimeout(() => {
    const reviews = [
      {
        id: 1,
        productId: id,
        userId: 'user1',
        user: 'مریم احمدی',
        rating: 5,
        comment: 'پیراهن فوق‌العاده زیبا و با کیفیتی بود. جنس پارچه عالی و دوخت بسیار تمیز.',
        helpful: 12,
        notHelpful: 1,
        verified: true,
        date: '1403/01/15',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        productId: id,
        userId: 'user2',
        user: 'سارا کریمی',
        rating: 4,
        comment: 'محصول خوبی است اما رنگ کمی متفاوت از تصویر بود. در کل راضی هستم.',
        helpful: 8,
        notHelpful: 2,
        verified: true,
        date: '1403/01/10',
        createdAt: '2024-01-10T14:20:00Z',
      },
    ];

    // مرتب‌سازی
    if (sort === 'newest') {
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'highest') {
      reviews.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      reviews.sort((a, b) => a.rating - b.rating);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    res.json({
      data: paginatedReviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: reviews.length,
        totalPages: Math.ceil(reviews.length / limit),
      },
    });
  }, 300);
});

module.exports = router;

const customRoutes = require('./json-server-middleware');

module.exports = {
  port: 3001,
  host: 'localhost',
  routes: {
    '/api/*': '/$1',
  },
  middlewares: [
    // CORS middleware
    (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );

      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    },
    // Custom API routes
    customRoutes,
  ],
  // Custom routes for better API structure
  customRoutes: {
    '/api/products/search': {
      method: 'GET',
      handler: (req, res) => {
        const { q } = req.query;
        const products = require('./db.json').products;

        if (!q) {
          return res.json(products);
        }

        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(q.toLowerCase()) ||
            product.description.toLowerCase().includes(q.toLowerCase()) ||
            product.brand.toLowerCase().includes(q.toLowerCase()),
        );

        res.json(filteredProducts);
      },
    },
    '/api/products/featured': {
      method: 'GET',
      handler: (req, res) => {
        const products = require('./db.json').products;
        const featuredProducts = products.filter((product) => product.isFeatured);
        res.json(featuredProducts);
      },
    },
    '/api/products/category/:category': {
      method: 'GET',
      handler: (req, res) => {
        const { category } = req.params;
        const products = require('./db.json').products;

        if (category === 'all') {
          return res.json(products);
        }

        const filteredProducts = products.filter((product) => product.category === category);
        res.json(filteredProducts);
      },
    },
  },
};

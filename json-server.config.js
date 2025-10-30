const path = require('path');
const fs = require('fs');
const customRoutes = require('./json-server-middleware');

const DB_PATH = process.env.JSON_SERVER_DB
  ? path.resolve(process.env.JSON_SERVER_DB)
  : path.resolve(__dirname, 'db.json');

if (!fs.existsSync(DB_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`[json-server] DB file not found at ${DB_PATH}. Some routes may fail.`);
}

module.exports = {
  port: Number(process.env.JSON_SERVER_PORT || 3001),
  host: process.env.JSON_SERVER_HOST || 'localhost',
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
        const products = (require(DB_PATH).products) || [];

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
        const products = (require(DB_PATH).products) || [];
        const featuredProducts = products.filter((product) => product.isFeatured);
        res.json(featuredProducts);
      },
    },
    '/api/products/category/:category': {
      method: 'GET',
      handler: (req, res) => {
        const { category } = req.params;
        const products = (require(DB_PATH).products) || [];

        if (category === 'all') {
          return res.json(products);
        }

        const filteredProducts = products.filter((product) => product.category === category);
        res.json(filteredProducts);
      },
    },
  },
};

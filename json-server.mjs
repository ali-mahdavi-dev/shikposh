import { readFileSync, watchFile } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createApp } from 'json-server/lib/app.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// مسیر فایل db.json
const DB_PATH = resolve(__dirname, 'db.json');

// خواندن و بارگذاری db.json
const dbData = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
const adapter = new JSONFile(DB_PATH);
const db = new Low(adapter, dbData);
await db.read();

// ایجاد سرور با json-server
const server = createApp(db, {
  static: [],
});

// Watch mode برای تغییرات db.json
if (process.env.NODE_ENV !== 'production') {
  watchFile(DB_PATH, { interval: 1000 }, async (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log(`\n📝 فایل دیتابیس تغییر کرد، در حال بارگذاری مجدد...`);
      await db.read();
      console.log(`✅ دیتابیس بارگذاری شد\n`);
    }
  });
}

// تنظیمات پورت و هاست
const PORT = Number(process.env.JSON_SERVER_PORT || 8080);
const HOST = process.env.JSON_SERVER_HOST || 'localhost';

// راه‌اندازی سرور
server
  .listen(PORT, HOST, () => {
    console.log(`\n🚀 JSON Server در حال اجرا است: http://${HOST}:${PORT}`);
    console.log(`📁 دیتابیس: ${DB_PATH}`);
    console.log(`\n📡 Endpoint های موجود:`);
    console.log(`   GET    /products`);
    console.log(`   GET    /products/:id`);
    console.log(`   GET    /categories`);
    console.log(`   GET    /reviews`);
    console.log(`\n`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ خطا: پورت ${PORT} در حال استفاده است!`);
      console.error(`   لطفاً یکی از کارهای زیر را انجام دهید:`);
      console.error(`   1. پروسه قبلی را متوقف کنید: lsof -ti:${PORT} | xargs kill -9`);
      console.error(
        `   2. یا از پورت دیگری استفاده کنید: JSON_SERVER_PORT=3002 yarn json-server\n`,
      );
      process.exit(1);
    } else {
      console.error(`\n❌ خطا در راه‌اندازی سرور:`, err.message);
      process.exit(1);
    }
  });

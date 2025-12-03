import type { ICacheStrategy } from './cache.strategy';

/**
 * IndexedDB Cache Strategy
 * Persistent cache using IndexedDB
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class IndexedDBCacheStrategy implements ICacheStrategy {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null = null;

  constructor(dbName: string = 'app-cache', storeName: string = 'cache') {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  private async getDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not available'));
        return;
      }

      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async set<T>(key: string, value: T, ttl: number = 5 * 60 * 1000): Promise<void> {
    try {
      const db = await this.getDB();
      const item: CacheItem<T> = {
        data: value,
        timestamp: Date.now(),
        ttl,
      };

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(item, key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.warn('IndexedDB cache set failed:', error);
      // Fallback: do nothing
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const db = await this.getDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const item: CacheItem<T> | undefined = request.result;
          if (!item) {
            resolve(null);
            return;
          }

          // Check if item has expired
          if (Date.now() - item.timestamp > item.ttl) {
            this.delete(key);
            resolve(null);
            return;
          }

          resolve(item.data);
        };
      });
    } catch (error) {
      console.warn('IndexedDB cache get failed:', error);
      return null;
    }
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  async delete(key: string): Promise<boolean> {
    try {
      const db = await this.getDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(true);
      });
    } catch (error) {
      console.warn('IndexedDB cache delete failed:', error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.getDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.warn('IndexedDB cache clear failed:', error);
    }
  }

  async getStats(): Promise<{ total: number; valid: number; expired: number }> {
    try {
      const db = await this.getDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const items: CacheItem<any>[] = request.result || [];
          const now = Date.now();
          let validCount = 0;
          let expiredCount = 0;

          items.forEach((item) => {
            if (now - item.timestamp > item.ttl) {
              expiredCount++;
            } else {
              validCount++;
            }
          });

          resolve({
            total: items.length,
            valid: validCount,
            expired: expiredCount,
          });
        };
      });
    } catch (error) {
      console.warn('IndexedDB cache stats failed:', error);
      return { total: 0, valid: 0, expired: 0 };
    }
  }
}

// Synchronous wrapper for compatibility with ICacheStrategy
export class IndexedDBCacheStrategySync implements ICacheStrategy {
  private strategy: IndexedDBCacheStrategy;

  constructor(dbName?: string, storeName?: string) {
    this.strategy = new IndexedDBCacheStrategy(dbName, storeName);
  }

  get<T>(key: string): T | null {
    // Note: This is a limitation - IndexedDB is async
    // For sync interface, we return null and log a warning
    console.warn('IndexedDB get called synchronously. Use async methods instead.');
    return null;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.strategy.set(key, value, ttl).catch((error) => {
      console.warn('IndexedDB set failed:', error);
    });
  }

  has(key: string): boolean {
    return false; // Can't determine synchronously
  }

  delete(key: string): boolean {
    this.strategy.delete(key).catch((error) => {
      console.warn('IndexedDB delete failed:', error);
    });
    return true;
  }

  clear(): void {
    this.strategy.clear().catch((error) => {
      console.warn('IndexedDB clear failed:', error);
    });
  }

  getStats() {
    return { total: 0, valid: 0, expired: 0 }; // Can't determine synchronously
  }
}


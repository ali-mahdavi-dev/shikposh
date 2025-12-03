/**
 * Storage Adapter Interface
 * Abstract interface for storage implementations
 */
export interface IStorageAdapter {
  /**
   * Get value from storage
   */
  get<T>(key: string): T | null;

  /**
   * Set value in storage
   */
  set<T>(key: string, value: T): void;

  /**
   * Remove value from storage
   */
  remove(key: string): void;

  /**
   * Clear all storage
   */
  clear(): void;

  /**
   * Get all keys
   */
  keys(): string[];
}

/**
 * LocalStorage Adapter
 */
export class LocalStorageAdapter implements IStorageAdapter {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('LocalStorage set failed:', error);
    }
  }

  remove(key: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('LocalStorage remove failed:', error);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.warn('LocalStorage clear failed:', error);
    }
  }

  keys(): string[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      return Object.keys(localStorage);
    } catch {
      return [];
    }
  }
}

/**
 * SessionStorage Adapter
 */
export class SessionStorageAdapter implements IStorageAdapter {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const item = sessionStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('SessionStorage set failed:', error);
    }
  }

  remove(key: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn('SessionStorage remove failed:', error);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn('SessionStorage clear failed:', error);
    }
  }

  keys(): string[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      return Object.keys(sessionStorage);
    } catch {
      return [];
    }
  }
}

/**
 * Memory Storage Adapter (for SSR or testing)
 */
export class MemoryStorageAdapter implements IStorageAdapter {
  private storage = new Map<string, string>();

  get<T>(key: string): T | null {
    try {
      const item = this.storage.get(key);
      if (item === undefined) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.warn('MemoryStorage set failed:', error);
    }
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  keys(): string[] {
    return Array.from(this.storage.keys());
  }
}


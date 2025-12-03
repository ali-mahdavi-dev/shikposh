/**
 * Unit tests for MemoryCacheStrategy
 */

import { MemoryCacheStrategy } from '@/lib/cache/strategies/memory.strategy';

describe('MemoryCacheStrategy', () => {
  let cache: MemoryCacheStrategy;

  beforeEach(() => {
    cache = new MemoryCacheStrategy();
  });

  afterEach(() => {
    cache.clear();
  });

  describe('set and get', () => {
    it('should store and retrieve values', () => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('should return null for non-existent keys', () => {
      expect(cache.get('non-existent')).toBeNull();
    });

    it('should handle different types', () => {
      cache.set('string', 'test');
      cache.set('number', 123);
      cache.set('object', { foo: 'bar' });
      cache.set('array', [1, 2, 3]);

      expect(cache.get('string')).toBe('test');
      expect(cache.get('number')).toBe(123);
      expect(cache.get('object')).toEqual({ foo: 'bar' });
      expect(cache.get('array')).toEqual([1, 2, 3]);
    });
  });

  describe('TTL', () => {
    it('should expire values after TTL', async () => {
      cache.set('key1', 'value1', 100); // 100ms TTL
      expect(cache.get('key1')).toBe('value1');

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(cache.get('key1')).toBeNull();
    });

    it('should not expire values before TTL', async () => {
      cache.set('key1', 'value1', 1000); // 1 second TTL
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(cache.get('key1')).toBe('value1');
    });
  });

  describe('has', () => {
    it('should return true for existing keys', () => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(cache.has('non-existent')).toBe(false);
    });

    it('should return false for expired keys', async () => {
      cache.set('key1', 'value1', 100);
      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(cache.has('key1')).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete existing keys', () => {
      cache.set('key1', 'value1');
      expect(cache.delete('key1')).toBe(true);
      expect(cache.get('key1')).toBeNull();
    });

    it('should return false for non-existent keys', () => {
      expect(cache.delete('non-existent')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all cache', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.clear();
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      const stats = cache.getStats();
      expect(stats.total).toBe(2);
      expect(stats.valid).toBe(2);
      expect(stats.expired).toBe(0);
    });
  });
});


import type { IStorageAdapter } from '../../api/adapters/storage.adapter';
import { SessionStorageAdapter } from '../../api/adapters/storage.adapter';

/**
 * Session Strategy Interface
 */
export interface ISessionStrategy {
  /**
   * Get session data
   */
  getSession<T>(): T | null;

  /**
   * Set session data
   */
  setSession<T>(data: T): void;

  /**
   * Clear session
   */
  clearSession(): void;

  /**
   * Check if session exists
   */
  hasSession(): boolean;
}

/**
 * Session-based Strategy
 * Stores session data in session storage
 */
export class SessionStrategy implements ISessionStrategy {
  private storage: IStorageAdapter;
  private sessionKey: string;

  constructor(storage?: IStorageAdapter, sessionKey: string = 'session') {
    this.storage = storage || new SessionStorageAdapter();
    this.sessionKey = sessionKey;
  }

  getSession<T>(): T | null {
    return this.storage.get<T>(this.sessionKey);
  }

  setSession<T>(data: T): void {
    this.storage.set(this.sessionKey, data);
  }

  clearSession(): void {
    this.storage.remove(this.sessionKey);
  }

  hasSession(): boolean {
    return this.getSession() !== null;
  }
}

/**
 * Default session strategy instance
 */
export const defaultSessionStrategy = new SessionStrategy();


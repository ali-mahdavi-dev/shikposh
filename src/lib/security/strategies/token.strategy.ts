import type { IStorageAdapter } from '../../api/adapters/storage.adapter';
import { LocalStorageAdapter } from '../../api/adapters/storage.adapter';

/**
 * Token Strategy Interface
 */
export interface ITokenStrategy {
  /**
   * Get access token
   */
  getAccessToken(): string | null;

  /**
   * Set access token
   */
  setAccessToken(token: string): void;

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null;

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void;

  /**
   * Clear all tokens
   */
  clearTokens(): void;

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean;
}

/**
 * JWT Token Strategy
 * Stores tokens in storage adapter
 */
export class TokenStrategy implements ITokenStrategy {
  private storage: IStorageAdapter;
  private accessTokenKey: string;
  private refreshTokenKey: string;

  constructor(
    storage?: IStorageAdapter,
    accessTokenKey: string = 'auth_token',
    refreshTokenKey: string = 'auth_refresh_token',
  ) {
    this.storage = storage || new LocalStorageAdapter();
    this.accessTokenKey = accessTokenKey;
    this.refreshTokenKey = refreshTokenKey;
  }

  getAccessToken(): string | null {
    return this.storage.get<string>(this.accessTokenKey);
  }

  setAccessToken(token: string): void {
    this.storage.set(this.accessTokenKey, token);
  }

  getRefreshToken(): string | null {
    return this.storage.get<string>(this.refreshTokenKey);
  }

  setRefreshToken(token: string): void {
    this.storage.set(this.refreshTokenKey, token);
  }

  clearTokens(): void {
    this.storage.remove(this.accessTokenKey);
    this.storage.remove(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

/**
 * Default token strategy instance
 */
export const defaultTokenStrategy = new TokenStrategy();


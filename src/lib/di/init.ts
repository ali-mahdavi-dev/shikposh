/**
 * Dependency Injection Initialization
 * This file must be imported before any tsyringe decorators are used.
 * It ensures reflect-metadata is loaded globally.
 */
import 'reflect-metadata';

// Re-export container initialization
export { registerDependencies, appContainer } from './container';

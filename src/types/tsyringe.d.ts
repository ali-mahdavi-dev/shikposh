declare module 'tsyringe' {
  export interface Constructable<T = any> {
    new (...args: any[]): T;
  }

  export interface DependencyContainer {
    register<T>(token: any, provider: any): void;
    registerSingleton<T>(from: any, to?: any): void;
    resolve<T>(token: any): T;
    isRegistered<T>(token: any): boolean;
  }

  export const container: DependencyContainer;

  export function injectable(): ClassDecorator;
  export function inject(token: any): ParameterDecorator;
}

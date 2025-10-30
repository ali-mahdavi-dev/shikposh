export type BeforeHook<TArgs extends any[]> = (...args: TArgs) => void | Promise<void>;
export type AfterHook<TReturn> = (result: TReturn) => void | Promise<void>;
export type ErrorHook = (error: unknown) => void | Promise<void>;

export interface AspectOptions<TArgs extends any[], TReturn> {
  before?: BeforeHook<TArgs>;
  after?: AfterHook<TReturn>;
  onError?: ErrorHook;
}

export function withAspect<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn> | TReturn,
  options: AspectOptions<TArgs, TReturn>,
) {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      if (options.before) {
        await options.before(args);
      }

      const result = await fn(...args);

      if (options.after) {
        await options.after(result);
      }

      return result;
    } catch (error) {
      if (options.onError) {
        await options.onError(error);
      }
      throw error;
    }
  };
}

export function withTiming<TArgs extends any[], TReturn>(
  label: string,
  fn: (...args: TArgs) => Promise<TReturn> | TReturn,
) {
  return withAspect<TArgs, TReturn>(fn, {
    before: () => {
      if (typeof performance !== 'undefined') {
        performance.mark(`${label}:start`);
      }
    },
    after: () => {
      if (typeof performance !== 'undefined') {
        performance.mark(`${label}:end`);
        const measureName = `${label}:duration`;
        performance.measure(measureName, `${label}:start`, `${label}:end`);
        const entries = performance.getEntriesByName(measureName);
        const last = entries[entries.length - 1];
        if (last) {
          // eslint-disable-next-line no-console
          console.debug(`[AOP] ${label} took ${last.duration.toFixed(2)}ms`);
        }
      }
    },
  });
}



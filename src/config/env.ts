export const env = <T = string>(
  key: keyof ImportMetaEnv,
  defaultValue?: T
): T => {
  const value = import.meta.env[key] as unknown;

  // Return default value if environment variable is not defined
  if (value === undefined || value === null || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }

  // Handle boolean conversion
  if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    return (value.toLowerCase() === 'true') as unknown as T;
  }

  return value as T;
}

/**
 * Type-specific environment variable getters
 */
export const envConfig = {
  getString: (key: keyof ImportMetaEnv, defaultValue?: string): string =>
    env(key, defaultValue),

  getBoolean: (key: keyof ImportMetaEnv, defaultValue?: boolean): boolean =>
    env<boolean>(key, defaultValue),

  getNumber: (key: keyof ImportMetaEnv, defaultValue?: number): number => {
    const value = env(key, defaultValue?.toString());
    const num = Number(value);
    return isNaN(num) ? (defaultValue ?? 0) : num;
  },

  // API-specific environment variables
  apiBaseUrl: (): string => env('VITE_API_BASE_URL'),
  shortUrlBase: (): string => env('VITE_SHORT_URL_BASE'),
  debugMode: (): boolean => env<boolean>('VITE_DEBUG_MODE', true),
}

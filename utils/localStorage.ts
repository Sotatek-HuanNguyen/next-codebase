/* eslint-disable no-empty */
export enum KeyStorage {
  LOCALE = 'locale',
  X_TOKEN = 'x_token',
  AUTH_DATA = 'authData',
  MESSAGE = 'message',
  COLAPSED = 'colapsed',
}

const localStorageHelper = {
  set: (key: KeyStorage, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {}
    return false;
  },

  setObject: (key: KeyStorage, value: unknown): boolean => {
    try {
      const newValue = JSON.stringify(value);
      localStorage.setItem(key, newValue);
      return true;
    } catch (error) {}
    return false;
  },

  get: (key: KeyStorage, defaultValue: string | null = null): string | null => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      }
    } catch (error) {}
    return defaultValue;
  },

  getObject: (key: KeyStorage, defaultValue: unknown = {}): any => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const object = JSON.parse(value);
        return object || defaultValue;
      }
    } catch (error) {}
    return defaultValue;
  },

  remove: (key: KeyStorage) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export default localStorageHelper;

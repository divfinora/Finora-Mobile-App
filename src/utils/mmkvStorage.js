import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

const mmkvStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },

  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },

  removeItem: (key) => {
    storage.remove(key);
    return Promise.resolve();
  },
};

export default mmkvStorage;
import {create} from 'zustand';
import {ThemeMode} from '../types';

interface IThemeStore {
  theme: ThemeMode;
  isSystem: boolean;
  setTheme: (theme: ThemeMode) => void;
  setSystemTheme: (flag: boolean) => void;
}

const useThemeStore = create<IThemeStore>(set => ({
  theme: 'light',
  isSystem: false,
  setTheme: (theme: ThemeMode) => {
    set({theme});
  },
  setSystemTheme: (flag: boolean) => {
    set(state => ({...state, isSystem: flag}));
  },
}));

export default useThemeStore;

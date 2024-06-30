import {create} from 'zustand';

interface ILanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

const useLanguageStore = create<ILanguageStore>(set => ({
  language: 'KO',
  setLanguage: (language: string) => {
    set({language});
  },
}));

export default useLanguageStore;

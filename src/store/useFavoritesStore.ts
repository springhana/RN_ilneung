import {Word} from '@/types';
import {create} from 'zustand';

interface IfavoritesStore {
  favorites: Word[];
  setFavorites: (favorites: Word[]) => void;
}

const useFavoritesStore = create<IfavoritesStore>(set => ({
  favorites: [],
  setFavorites: (favorites: Word[]) => {
    set({favorites});
  },
}));

export default useFavoritesStore;

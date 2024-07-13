import {useState, useEffect} from 'react';
import {storageKeys} from '@/constants/storageKeys';
import {Word} from '@/types';
import {getEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import useFavoritesStore from '@/store/useFavoritesStore';

function useFavoritesStorage() {
  const {favorites, setFavorites} = useFavoritesStore();

  const setFavoritesWord = async (word: Word) => {
    const currentFavorites: Word[] =
      (await getEncryptStorage(storageKeys.FAVORITES)) ?? [];

    if (currentFavorites.some(f => f.word === word.word)) {
      // 이미 즐겨찾기에 있는 경우, 해당 단어를 제거합니다
      const updatedFavorites = currentFavorites.filter(
        f => f.word !== word.word,
      );
      setFavorites(updatedFavorites);
      await setEncryptStorage(storageKeys.FAVORITES, updatedFavorites);
    } else {
      // 즐겨찾기에 없는 경우, 해당 단어를 추가합니다
      const updatedFavorites = [...currentFavorites, word];
      setFavorites(updatedFavorites);
      await setEncryptStorage(storageKeys.FAVORITES, updatedFavorites);
    }
  };

  useEffect(() => {
    (async () => {
      const favorites = (await getEncryptStorage(storageKeys.FAVORITES)) ?? [];

      setFavorites(favorites);
    })();
  }, []);

  return {favorites, setFavoritesWord};
}
export default useFavoritesStorage;

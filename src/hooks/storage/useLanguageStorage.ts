import {useEffect} from 'react';
import {storageKeys} from '@/constants/storageKeys';
import useLanguageStore from '@/store/useLanguageStore';
import {getEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';

function useLanguageStorage() {
  const {language, setLanguage} = useLanguageStore();

  const setMode = async (language: string) => {
    await setEncryptStorage(storageKeys.LANGUAGE, language);
    setLanguage(language);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getEncryptStorage(storageKeys.LANGUAGE)) ?? 'KO';

      setLanguage(mode);
    })();
  }, [setLanguage]);

  return {language, setMode};
}

export default useLanguageStorage;

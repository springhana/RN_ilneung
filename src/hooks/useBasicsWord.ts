import {hiragana, katakana} from '@/data';
import {WordBasics} from '@/types';
import {useState, useEffect, useMemo} from 'react';

function useBasicsWord(source: string) {
  const [isLoading, setIsLoading] = useState(true);

  const basicsWord = useMemo(() => {
    switch (source) {
      case 'hiragana':
        return hiragana;
      case 'katakana':
        return katakana;
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [source]);

  return {basicsWord, isLoading};
}

export default useBasicsWord;

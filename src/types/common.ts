type ThemeMode = 'light' | 'dark';

type Level = 1 | 2 | 3 | 4 | 5;
type Word = {
  word: string;
  meaning: string;
  furigana: string;
  romaji: string;
  level: Level;
};

type WordBasics = {
  hiragana: string;
  romaji: string;
};

export type {ThemeMode, Word, WordBasics};

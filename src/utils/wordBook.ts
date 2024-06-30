import {colors} from '../constants/colors';
import {ThemeMode} from '../types';

const WORDBOOK = (theme: ThemeMode) => {
  return [
    {
      title: '단어집',
      color: colors[theme].SKYBLUE_200,
      source: 'wordbook',
    },
    {
      title: 'N1',
      color: colors[theme].SKYBLUE_700,
      source: 'n1',
    },
    {
      title: 'N2',
      color: colors[theme].RED_300,
      source: 'n2',
    },
    {
      title: 'N3',
      color: colors[theme].PURPLE_200,
      source: 'n3',
    },
    {
      title: 'N4',
      color: colors[theme].YELLOW_300,
      source: 'n4',
    },
    {
      title: 'N5',
      color: colors[theme].GREEN_200,
      source: 'n5',
    },
  ];
};

export {WORDBOOK};

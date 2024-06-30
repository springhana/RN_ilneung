import _all from './db/all.json';
import _n1 from './db/n1.json';
import _n2 from './db/n2.json';
import _n3 from './db/n3.json';
import _n4 from './db/n4.json';
import _n5 from './db/n5.json';
import _hiragana from './db/hiragana.json';
import _katakana from './db/katakana.json';
import {Word, WordBasics} from '../../src/types';

export const all = _all as Word[];
export const n1 = _n1 as Word[];
export const n2 = _n2 as Word[];
export const n3 = _n3 as Word[];
export const n4 = _n4 as Word[];
export const n5 = _n5 as Word[];
export const hiragana = _hiragana as WordBasics[];
export const katakana = _katakana as WordBasics[];

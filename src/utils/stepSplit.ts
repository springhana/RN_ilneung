import {numbers} from '../constants/numbers';
import {Step} from '../hooks/useJlpt';

function stepSplit(length: number, source: string) {
  const arrayLength = Math.round(length / numbers.SPLIT_NUMBER);
  const remainder = length % numbers.SPLIT_NUMBER;
  const array: Step[] = [];

  Array.from({length: arrayLength}).map((_, i) => {
    const firstIndex = i * numbers.SPLIT_NUMBER;
    let newStep: Step = {
      firstIndex: firstIndex,
      lastIndex: firstIndex + numbers.SPLIT_NUMBER - 1,
      step: source,
    };

    if (i === arrayLength - 1) {
      newStep.lastIndex = firstIndex + numbers.SPLIT_NUMBER + remainder - 1;
    }
    array.push(newStep);
  });

  return array;
}

export default stepSplit;

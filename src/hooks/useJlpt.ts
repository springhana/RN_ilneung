import {useState, useEffect, useMemo} from 'react';
import {all, n1, n2, n3, n4, n5} from '../data';
import stepSplit from '../utils/stepSplit';

export type Step = {
  firstIndex: number;
  lastIndex: number;
  step: string;
};

function useJlpt(source: string) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isloading, setIsLoading] = useState(true);

  const jlpt = useMemo(() => {
    switch (source) {
      case 'n1':
        return n1;
      case 'n2':
        return n2;
      case 'n3':
        return n3;
      case 'n4':
        return n4;
      case 'n5':
        return n5;
      case 'all':
        return all;
      default:
        return [];
    }
  }, [source]);

  useEffect(() => {
    setSteps(stepSplit(jlpt.length, source));
    setIsLoading(false);
  }, [source]);

  return {jlpt, steps, isloading};
}

export default useJlpt;

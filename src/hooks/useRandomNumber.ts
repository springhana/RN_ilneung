import {useEffect, useState} from 'react';

function useRandomNumber(
  number: number,
  firstNumber: number,
  lastNumber: number,
  currentIndex?: number,
) {
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const numbers = new Set<number>();

    while (numbers.size < number) {
      const randomNum = Math.floor(
        Math.random() * (firstNumber + 1) + lastNumber,
      );
      numbers.add(randomNum);
    }

    setNumberArray(Array.from(numbers));
    setIsLoading(false);
  }, [currentIndex]);

  return {numberArray, isLoading};
}

export default useRandomNumber;

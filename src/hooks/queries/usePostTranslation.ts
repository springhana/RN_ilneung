import {queryKeys} from '@/constants/queryKeys';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

function usePostTranslation(
  value: string[],
  targetLang: string,
  toggle: boolean,
) {
  return useQuery({
    queryKey: [queryKeys.TRANSLATIONS, ...value, targetLang],
    queryFn: async () => {
      const {data} = await axios.post('http://192.168.68.51:3030/translation', {
        value: value,
        targetLang: targetLang,
      });

      return data;
    },
    enabled: toggle && Boolean(value),
    staleTime: Infinity,
  });
}

export default usePostTranslation;

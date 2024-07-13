import {messages} from '@/constants/messages';
import {storageKeys} from '@/constants/storageKeys';
import useUserInfoStore from '@/store/useUserInfoStore';
import {getEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

function useUserInfoStorage() {
  const {name, introduce, setName, setIntroduce} = useUserInfoStore();
  const navigation = useNavigation();

  const setUserInfo = async (name: string, introduce: string) => {
    if (name.trim().length === 0 || introduce.trim().length === 0) {
      Toast.show({
        type: 'error',
        text1: '이름이나 자기소개를 적어주세요.',
        position: 'top',
        visibilityTime: 1000,
      });

      return;
    } else {
      await setEncryptStorage(storageKeys.USER_INFO, {name, introduce});
      setName(name);
      setIntroduce(introduce);

      Toast.show({
        type: 'success',
        text1: '변경이 되었습니다.',
        position: 'top',
        visibilityTime: 1000,
      });

      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const {name, introduce} = (await getEncryptStorage(
        storageKeys.USER_INFO,
      )) ?? {name: messages.NICKNAME, introduce: messages.INTRODUCE};
      setName(name);
      setIntroduce(introduce);
    })();
  }, [setName, setIntroduce]);

  return {name, introduce, setUserInfo};
}

export default useUserInfoStorage;

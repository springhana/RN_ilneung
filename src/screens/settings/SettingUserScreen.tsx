import BackButton from '@/components/common/BackButton';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import {colors} from '@/constants/colors';
import useUserInfoStorage from '@/hooks/storage/useUserInfoStorage';
import useForm from '@/hooks/useForm';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {validateIntroduce, validateNickName} from '@/utils';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceHeight = Dimensions.get('window').height;

function SettingUserScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const targetNickName = useForm({
    initialValue: {name: ''},
    validate: validateNickName,
  });
  const targetIntroduce = useForm({
    initialValue: {introduce: ''},
    validate: validateIntroduce,
  });

  const {name, introduce, setUserInfo} = useUserInfoStorage();

  useEffect(() => {
    if (name && introduce) {
      targetNickName.getTextInputProps('name').onChangeText(name);
      targetIntroduce.getTextInputProps('introduce').onChangeText(introduce);
    }
  }, [name, introduce]);

  const handlePressUserInfo = (name: string, introduce: string) => {
    setUserInfo(name, introduce);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <BackButton title="내 정보" />
        <View style={styles.userInfoContainer}>
          {/* <View style={styles.userImageContainer}>
          <Image
            source={require('@/assets/user-default.png')}
            style={styles.userImage}
          />
          <View style={styles.icon}>
            <Ionicons
              name="camera-outline"
              size={20}
              color={colors['light'].WHITE}
            />
          </View>
        </View> */}
        </View>
        <InputField
          placeholder={name}
          error={targetNickName.errors.title}
          touched={targetNickName.touched.title}
          inputMode="text"
          blurOnSubmit={false}
          {...targetNickName.getTextInputProps('name')}
        />
        <InputField
          placeholder={introduce}
          error={targetIntroduce.errors.title}
          touched={targetIntroduce.touched.title}
          inputMode="text"
          blurOnSubmit={false}
          {...targetIntroduce.getTextInputProps('introduce')}
        />

        <CustomButton
          onPress={() =>
            handlePressUserInfo(
              targetNickName.values.name,
              targetIntroduce.values.introduce,
            )
          }
          size="fit">
          <Text>저장하기</Text>
        </CustomButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].BLUE_200,
    },
    userInfoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginLeft: 10,
      backgroundColor: colors[theme].BLUE_200,
      padding: deviceHeight > 700 ? 10 : 5,
    },
    userImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      position: 'relative',
    },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    nameText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    icon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: colors['light'].PINK_300,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default SettingUserScreen;

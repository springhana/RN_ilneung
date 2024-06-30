import BackButton from '@/components/common/BackButton';
import InputField from '@/components/common/InputField';
import {colors} from '@/constants/colors';
import useForm from '@/hooks/useForm';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {validateNickName, validateTarget} from '@/utils';
import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceHeight = Dimensions.get('window').height;

function SettingUserScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const nickName = useForm({
    initialValue: {name: ''},
    validate: validateNickName,
  });
  const target = useForm({
    initialValue: {target: ''},
    validate: validateTarget,
  });
  return (
    <View style={styles.container}>
      <BackButton title="내 정보" />
      <View style={styles.userInfoContainer}>
        <View style={styles.userImageContainer}>
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
        </View>
      </View>
      <InputField
        placeholder="닉네임을 입력해주세요."
        error={nickName.errors.title}
        touched={nickName.touched.title}
        inputMode="text"
        blurOnSubmit={false}
        style={styles.input}
        {...nickName.getTextInputProps('name')}
      />
      <InputField
        placeholder="목표를 정해주세요."
        error={target.errors.title}
        touched={target.touched.title}
        inputMode="text"
        blurOnSubmit={false}
        style={styles.input}
        {...target.getTextInputProps('target')}
      />
    </View>
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
    input: {
      backgroundColor: colors[theme].WHITE,
      fontWeight: 'bold',
      color: colors[theme].GRAY_300,
      borderRadius: 20,
      padding: 10,
    },
  });

export default SettingUserScreen;

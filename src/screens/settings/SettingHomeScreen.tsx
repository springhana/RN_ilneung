import StepField from '@/components/common/StepField';
import AppInfoOption from '@/components/setting/AppInfoOption';
import DarkModeOption from '@/components/setting/DarkModeOption';
import LangauageOption from '@/components/setting/LangauageOption';
import useModal from '@/hooks/useModal';
import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Dimensions} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigation/drawer/MainDrawerNavigator';
import {SettingStackParamList} from '@/navigation/stack/SettingStackNavigator';
import {settingNavigations} from '@/constants/navigators';
import {colors} from '@/constants/colors';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

const deviceWidth = Dimensions.get('window').width;

export type Navigation = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const darkModeOption = useModal();
  const languageCheckOption = useModal();
  const appInfo = useModal();

  const navigation = useNavigation<Navigation>();

  const handlePressNavigation = () => {
    navigation.navigate(settingNavigations.SETTING_USER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepField title="내 정보" bold onPress={handlePressNavigation} />
      <StepField title="다크 모드" bold onPress={darkModeOption.show} />
      <StepField title="언어" bold onPress={languageCheckOption.show} />
      <StepField title="앱 정보" bold number="other" onPress={appInfo.show} />

      <View style={styles.appInfo}>
        <Text style={[styles.text, styles.version]}>버전</Text>
        <Text>v.1.0.0</Text>
      </View>

      <DarkModeOption
        isVisible={darkModeOption.isVisible}
        hideOption={darkModeOption.hide}
      />
      <LangauageOption
        isVisible={languageCheckOption.isVisible}
        hideOption={languageCheckOption.hide}
      />
      <AppInfoOption isVisible={appInfo.isVisible} hideOption={appInfo.hide} />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].BLUE_200,
    },
    appInfo: {
      width: deviceWidth * 0.9,
      marginTop: 'auto',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    text: {
      fontWeight: 'bold',
    },
    version: {
      fontWeight: 'bold',
    },
  });

export default SettingHomeScreen;

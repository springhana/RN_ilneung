import StepField from '@/components/common/StepField';
import {colors} from '@/constants/colors';
import {basicsNavigations} from '@/constants/navigators';
import {MainDrawerParamList} from '@/navigation/drawer/MainDrawerNavigator';
import {BasicsStackParamList} from '@/navigation/stack/BasicsStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<BasicsStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function BasicsHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();

  const handlePressNavigation = (title: string, source: string) => {
    navigation.navigate(basicsNavigations.BASICS_WORD, {
      title: title,
      source: source,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <StepField
          title="히라가나"
          onPress={() => handlePressNavigation('히라가나', 'hiragana')}
          icon={
            <MaterialCommunityIcons
              name="syllabary-hiragana"
              size={20}
              color={theme && colors[theme].BLACK}
            />
          }
        />
        <StepField
          title="가타가나"
          number="other"
          onPress={() => handlePressNavigation('가타카나', 'katakana')}
          icon={
            <MaterialCommunityIcons
              name="syllabary-katakana"
              size={20}
              color={theme && colors[theme].BLACK}
            />
          }
        />
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].BLUE_200,
    },
  });

export default BasicsHomeScreen;

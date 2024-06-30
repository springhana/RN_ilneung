import StepField from '@/components/common/StepField';
import {colors} from '@/constants/colors';
import {quizNavigations} from '@/constants/navigators';
import {MainDrawerParamList} from '@/navigation/drawer/MainDrawerNavigator';
import {QuizStackParamList} from '@/navigation/stack/QuizStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {WORDBOOK} from '@/utils';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export type Navigation = CompositeNavigationProp<
  StackNavigationProp<QuizStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function QuizHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const WordBooks = WORDBOOK(theme);
  const navigation = useNavigation<Navigation>();
  const handlePressNavigation = (source: string) => {
    navigation.navigate(quizNavigations.QUIZ_STEP, {
      source: source,
    });
  };

  return (
    <View style={styles.container}>
      {WordBooks.map((book, index) => (
        <View key={index}>
          <StepField
            title={book.title}
            number={WordBooks.length === index + 1 ? 'other' : 'first'}
            onPress={() => handlePressNavigation(book.source)}
          />
        </View>
      ))}
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

export default QuizHomeScreen;

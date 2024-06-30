import BackButton from '@/components/common/BackButton';
import StepField from '@/components/common/StepField';
import {quizNavigations} from '@/constants/navigators';
import useJlpt, {Step} from '@/hooks/useJlpt';
import {QuizStackParamList} from '@/navigation/stack/QuizStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Navigation} from './QuizHomeScreen';
import {ThemeMode} from '@/types';
import {colors} from '@/constants/colors';

type QuizStepScreen = StackScreenProps<
  QuizStackParamList,
  typeof quizNavigations.QUIZ_STEP
>;

function QuizStepScreen({route}: QuizStepScreen) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {source} = route.params;
  const {steps, isloading} = useJlpt(source);

  const navigation = useNavigation<Navigation>();

  const handlePressStep = (step: Step, title: string) => {
    navigation.navigate(quizNavigations.QUIZ_DETAIL, {...step, title});
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <BackButton title={source} />
        <View style={styles.QuizContainer}>
          <View style={styles.words}>
            {!isloading &&
              steps.map((step, index) => (
                <View key={index}>
                  <StepField
                    title={`${index + 1} 단계`}
                    number={index + 1 === steps.length ? 'other' : 'first'}
                    onPress={() =>
                      handlePressStep(step, `${source}/${index + 1} 단계`)
                    }
                  />
                </View>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].BLUE_200,
    },
    QuizContainer: {
      marginHorizontal: 10,
    },
    words: {
      marginHorizontal: 'auto',
    },
  });

export default QuizStepScreen;

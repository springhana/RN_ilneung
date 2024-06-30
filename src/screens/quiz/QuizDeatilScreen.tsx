import BackButton from '@/components/common/BackButton';
import {quizNavigations} from '@/constants/navigators';
import {numbers} from '@/constants/numbers';
import useRandomNumber from '@/hooks/useRandomNumber';
import useJlpt from '@/hooks/useJlpt';
import {QuizStackParamList} from '@/navigation/stack/QuizStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useState} from 'react';
import {Text} from 'react-native';
import AnserQuiz from '@/components/quiz/AnserQuiz';
import {colors} from '@/constants/colors';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

type QuizDeatilScreen = StackScreenProps<
  QuizStackParamList,
  typeof quizNavigations.QUIZ_DETAIL
>;

const deviceHeight = Dimensions.get('window').height;

function QuizDeatilScreen({route}: QuizDeatilScreen) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const {step, firstIndex, lastIndex, title} = route.params;
  const {jlpt, isloading} = useJlpt(step);
  const {numberArray, isLoading: isLoadingRandomNumber} = useRandomNumber(
    numbers.QUIZ_NUMBER,
    firstIndex,
    lastIndex,
  );

  const handleStepChange = () => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title={title} />
      {!isloading && !isLoadingRandomNumber && (
        <>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.textWord]}>
              {jlpt[numberArray[currentStep]].word}
            </Text>
          </View>
          <AnserQuiz
            jlpt={jlpt}
            currentStep={currentStep}
            anserStep={numberArray[currentStep]}
            onPress={handleStepChange}
          />
        </>
      )}

      <View style={styles.NextButton}>
        <Text style={[styles.text, styles.textScore]}>{`${currentStep + 1}/${
          numbers.QUIZ_NUMBER
        }`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: deviceHeight > 700 ? 10 : 5,
      backgroundColor: colors[theme].BLUE_200,
    },
    textContainer: {
      width: '100%',
      height: 200,
      justifyContent: 'center',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
      borderBottomColor: colors[theme].GRAY_200,
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    textWord: {
      fontSize: 34,
    },
    textFurigana: {
      fontSize: 20,
    },
    textScore: {
      fontSize: 18,
    },
    NextButton: {
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 20,
      gap: 2,
    },
    button: {
      width: 120,
      backgroundColor: colors[theme].PINK_300,
      padding: 10,
      borderRadius: 10,
      margin: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default QuizDeatilScreen;

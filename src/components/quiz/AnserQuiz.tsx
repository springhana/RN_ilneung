import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';

import useRandomNumber from '@/hooks/useRandomNumber';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode, Word} from '@/types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '@/screens/quiz/QuizHomeScreen';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AnserQuizProps {
  jlpt: Word[];
  currentStep: number;
  anserStep: number;
  onPress: () => void;
}

function AnserQuiz({jlpt, currentStep, anserStep, onPress}: AnserQuizProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    const numbersArray = new Set<number>();

    while (numbersArray.size < 3) {
      const randomNum = Math.floor(Math.random() * numbers.QUIZ_NUMBER);

      numbersArray.add(randomNum);
    }

    const shuffledArray = [...Array.from(numbersArray), anserStep].sort(
      () => Math.random() - 0.5,
    );
    setNumberArray(shuffledArray);
    setIsLoading(false);
  }, [currentStep]);

  const handlePressAnser = (currentIndex: number, anser: number) => {
    setIsPress(true);

    if (numberArray[currentIndex] === anser) {
      Toast.show({
        type: 'success',
        text1: '정답입니다.',
        position: 'top',
        visibilityTime: 1000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: '오답입니다.',
        position: 'top',
        visibilityTime: 1000,
      });
    }

    setTimeout(() => {
      if (currentStep + 1 === numbers.QUIZ_NUMBER) {
        navigation.goBack();
      } else {
        onPress();
      }
      setIsPress(false);
    }, 1000);
  };

  return (
    <View>
      {!isLoading && (
        <View style={styles.Container}>
          {numberArray.map((item, index) => (
            <View key={index} style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => handlePressAnser(index, anserStep)}
                disabled={isPress}>
                <Text style={[styles.text]}>
                  {jlpt[item].furigana ? jlpt[item].furigana : jlpt[item].word}
                </Text>
                {numberArray[index] === anserStep && isPress && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={colors['light'].WHITE}
                  />
                )}
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    Container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
    },
    buttonContainer: {
      width: '48%',
      height: 'auto',
    },
    button: {
      flexDirection: 'row',
      gap: 3,
      width: '100%',
      backgroundColor: colors[theme].PINK_300,
      padding: 10,
      borderRadius: 10,
      margin: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors['light'].WHITE,
      fontSize: 22,
    },
  });

export default AnserQuiz;

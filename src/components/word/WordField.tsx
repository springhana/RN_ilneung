import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import {ThemeMode, Word} from '../../types';
import {colors} from '../../constants/colors';
import useThemeStore from '../../store/useThemeStore';
import VoiceSvg from '../../assets/voice.svg';
import usePostTranslation from '../../hooks/queries/usePostTranslation';
import useLanguageStore from '@/store/useLanguageStore';
import Octicons from 'react-native-vector-icons/Octicons';

interface WordFieldProps {
  word: Word;
  number?: 'first' | 'other';
  favorites: Word[];
  onFavorites: (word: Word) => void;
}

const deviceWidth = Dimensions.get('window').width;

function WordField({
  word,
  number = 'first',
  favorites,
  onFavorites,
}: WordFieldProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const [toggle, setToggle] = useState(false);
  const refHeight = useRef(new Animated.Value(80)).current;
  const refOpacity = useRef(new Animated.Value(0)).current;
  const {language} = useLanguageStore();

  const {isLoading, isError, data} = usePostTranslation(
    word.meaning?.split(';') ?? [],
    language,
    toggle,
  );

  const handlePressToggle = () => {
    Animated.parallel([
      Animated.timing(refHeight, {
        toValue: toggle ? 80 : 240,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(refOpacity, {
        toValue: toggle ? 0 : 1,
        duration: toggle ? 100 : 300,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setToggle(!toggle);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePressToggle}>
        <Animated.View
          style={[
            styles.word,
            {height: refHeight},
            number === 'other' && {
              borderBottomWidth: 1,
              borderBottomColor: colors[theme].GRAY_200,
            },
          ]}>
          {toggle && (
            <Animated.Text
              style={[styles.wordFurigana, styles.text, {opacity: refOpacity}]}>
              {word.furigana}
            </Animated.Text>
          )}

          <View style={styles.WordContainer}>
            <Text style={[styles.wordText, styles.text]}>{word.word}</Text>
            <Animated.View style={(styles.text, {opacity: refOpacity})}>
              <VoiceSvg
                width={24}
                height={24}
                style={styles.icon}
                fill={colors[theme].BLACK}
              />
            </Animated.View>
          </View>

          <Pressable style={styles.favorites} onPress={() => onFavorites(word)}>
            <Octicons
              name={
                favorites && favorites.some(i => i.word === word.word)
                  ? 'star-fill'
                  : 'star'
              }
              size={24}
            />
          </Pressable>

          {!isLoading && !isError
            ? toggle &&
              data?.map((item: {text: string}, index: number) => (
                <Animated.Text
                  key={index}
                  style={[
                    styles.wordFurigana,
                    styles.text,
                    {opacity: refOpacity},
                  ]}>
                  {item.text}
                </Animated.Text>
              ))
            : toggle && (
                <Animated.Text
                  style={[
                    styles.wordFurigana,
                    styles.text,
                    {opacity: refOpacity},
                  ]}>
                  ...
                </Animated.Text>
              )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    WordContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    word: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: deviceWidth * 0.9,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
      borderBottomColor: colors[theme].GRAY_200,
      overflow: 'hidden',
    },
    wordFurigana: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    wordText: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    icon: {
      fontWeight: 'bold',
      marginLeft: 10,
      color: colors[theme].BLACK,
    },
    text: {
      color: colors[theme].BLACK,
    },
    favorites: {
      position: 'absolute',
      right: 0,
    },
  });

export default WordField;

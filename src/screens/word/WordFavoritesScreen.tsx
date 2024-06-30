import BackButton from '@/components/common/BackButton';
import WordField from '@/components/word/WordField';
import {colors} from '@/constants/colors';
import useFavoritesStorage from '@/hooks/useFavoritesStorage';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {Fragment} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const deviceHeight = Dimensions.get('window').height;

function WordFavoritesScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {favorites, setFavoritesWord} = useFavoritesStorage();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.contianer}>
        <BackButton title={'내 단어집'} />

        <View style={styles.words}>
          {favorites.length > 0 &&
            favorites.map((favorite, index) => (
              <Fragment key={index}>
                <WordField
                  word={favorite}
                  number={index + 1 === favorites.length ? 'other' : 'first'}
                  favorites={favorites}
                  onFavorites={setFavoritesWord}
                />
              </Fragment>
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    contianer: {
      flex: 1,
      padding: deviceHeight > 700 ? 10 : 5,
      backgroundColor: colors[theme].BLUE_200,
    },
    words: {
      marginHorizontal: 'auto',
    },
    item: {
      borderRadius: 5,
      height: 150,
      padding: 50,
      marginLeft: 25,
      marginRight: 25,
    },
  });

export default WordFavoritesScreen;

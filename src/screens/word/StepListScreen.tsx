import {StackScreenProps} from '@react-navigation/stack';
import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {WordStackParamList} from '../../navigation/stack/WordStackNavigator';
import {wordNavigations} from '../../constants/navigators';
import useJlpt from '../../hooks/useJlpt';
import WordField from '../../components/word/WordField';
import BackButton from '../../components/common/BackButton';
import {ThemeMode} from '@/types';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import useFavoritesStorage from '@/hooks/useFavoritesStorage';

type StepListScreen = StackScreenProps<
  WordStackParamList,
  typeof wordNavigations.STEP_LIST
>;

const deviceHeight = Dimensions.get('window').height;

const StepListScreen = ({route}: StepListScreen) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {firstIndex, lastIndex, step, title} = route.params;
  const {jlpt, isloading} = useJlpt(step);
  const {favorites, setFavoritesWord} = useFavoritesStorage();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.contianer}>
        <BackButton title={title} />

        <View style={styles.words}>
          {!isloading &&
            Array.from({length: lastIndex - firstIndex}).map((_, index) => (
              <Fragment key={index}>
                <WordField
                  word={jlpt[index + firstIndex]}
                  number={
                    index + 1 === lastIndex - firstIndex ? 'other' : 'first'
                  }
                  favorites={favorites}
                  onFavorites={setFavoritesWord}
                />
              </Fragment>
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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

export default StepListScreen;

import BackButton from '@/components/common/BackButton';
import {colors} from '@/constants/colors';
import {basicsNavigations} from '@/constants/navigators';
import useBasicsWord from '@/hooks/useBasicsWord';
import {BasicsStackParamList} from '@/navigation/stack/BasicsStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Dimensions,
} from 'react-native';

type BasicsWordScreen = StackScreenProps<
  BasicsStackParamList,
  typeof basicsNavigations.BASICS_WORD
>;

const deviceHeight = Dimensions.get('window').height;

const BasicsWordScreen = ({route}: BasicsWordScreen) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {title, source} = route.params;
  const {basicsWord, isLoading} = useBasicsWord(source);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <BackButton title={title} />

        {!isLoading && (
          <View style={styles.wordContainer}>
            {basicsWord?.map((item, index) => (
              <View key={index} style={styles.word}>
                <View style={styles.textRomajiContainer}>
                  <Text style={[styles.text, styles.romaji]}>
                    {item.romaji}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.hiragana}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: deviceHeight > 700 ? 10 : 5,
      backgroundColor: colors[theme].BLUE_200,
    },
    wordContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    word: {
      width: '20%',
      height: 60,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      backgroundColor: colors[theme].WHITE,
      justifyContent: 'center',
    },
    textRomajiContainer: {
      height: 20,
      justifyContent: 'center',
    },
    textContainer: {
      height: 40,
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
      color: colors[theme].BLACK,
    },
    romaji: {
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].GRAY_300,
    },
  });

export default BasicsWordScreen;

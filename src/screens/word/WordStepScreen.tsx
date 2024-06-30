import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {WordStackParamList} from '../../navigation/stack/WordStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {wordNavigations} from '../../constants/navigators';
import useJlpt, {Step} from '../../hooks/useJlpt';
import {Dimensions} from 'react-native';
import {colors} from '../../constants/colors';
import {ThemeMode} from '../../types';
import useThemeStore from '../../store/useThemeStore';
import {useNavigation} from '@react-navigation/native';

import {Navigation} from './WordHomeScreen';
import BackButton from '../../components/common/BackButton';
import StepField from '../../components/common/StepField';

type WordStepScreen = StackScreenProps<
  WordStackParamList,
  typeof wordNavigations.WORD_STEP
>;

const deviceHeight = Dimensions.get('window').height;

const WordStepScreen = ({route}: WordStepScreen) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {source} = route.params;
  const {steps, isloading} = useJlpt(source);

  const navigation = useNavigation<Navigation>();

  const handlePressStep = (step: Step, title: string) => {
    navigation.navigate(wordNavigations.STEP_LIST, {...step, title});
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <BackButton title={source} />
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
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: colors[theme].BLUE_200,
      padding: deviceHeight > 700 ? 10 : 5,
    },
    words: {
      marginHorizontal: 'auto',
    },
  });

export default WordStepScreen;

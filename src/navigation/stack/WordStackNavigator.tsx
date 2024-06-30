import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {wordNavigations} from '../../constants/navigators';
import WordHomeScreen from '../../screens/word/WordHomeScreen';
import WordStepScreen from '../../screens/word/WordStepScreen';
import StepListScreen from '../../screens/word/StepListScreen';
import {Step} from '../../hooks/useJlpt';
import WordFavoritesScreen from '@/screens/word/WordFavoritesScreen';

export type WordStackParamList = {
  [wordNavigations.WORD_HOME]: undefined;
  [wordNavigations.WORD_STEP]: {source: string};
  [wordNavigations.STEP_LIST]: Step & {title: string};
  [wordNavigations.WORD_FAVORITES]: undefined;
};

const Stack = createStackNavigator<WordStackParamList>();

function WordStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={wordNavigations.WORD_HOME}
        component={WordHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={wordNavigations.WORD_STEP}
        component={WordStepScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={wordNavigations.STEP_LIST}
        component={StepListScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={wordNavigations.WORD_FAVORITES}
        component={WordFavoritesScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default WordStackNavigator;

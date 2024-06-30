import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {quizNavigations} from '../../constants/navigators';
import QuizHomeScreen from '../../screens/quiz/QuizHomeScreen';
import QuizDetailScreen from '@/screens/quiz/QuizDeatilScreen';
import QuizStepScreen from '@/screens/quiz/QuizStepScreen';
import {Step} from '@/hooks/useJlpt';

export type QuizStackParamList = {
  [quizNavigations.QUIZ_HOME]: undefined;
  [quizNavigations.QUIZ_STEP]: {source: string};
  [quizNavigations.QUIZ_DETAIL]: Step & {title: string};
};

const Stack = createStackNavigator<QuizStackParamList>();

function QuizStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={quizNavigations.QUIZ_HOME}
        component={QuizHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={quizNavigations.QUIZ_STEP}
        component={QuizStepScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={quizNavigations.QUIZ_DETAIL}
        component={QuizDetailScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default QuizStackNavigator;

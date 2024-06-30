import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {basicsNavigations} from '../../constants/navigators';
import BasicsHomeScreen from '../../screens/basics/BasicsHomeScreen';
import BasicsWordScreen from '@/screens/basics/BasicsWordScreen';

export type BasicsStackParamList = {
  [basicsNavigations.BASICS_HOME]: undefined;
  [basicsNavigations.BASICS_WORD]: {title: string; source: string};
};

const Stack = createStackNavigator<BasicsStackParamList>();

const BasicsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={basicsNavigations.BASICS_HOME}
        component={BasicsHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={basicsNavigations.BASICS_WORD}
        component={BasicsWordScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BasicsStackNavigator;

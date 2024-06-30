import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomDraweContent from './CustomDraweContent';
import {mainNavigations, wordNavigations} from '../../constants/navigators';
import WordStackNavigator, {
  WordStackParamList,
} from '../stack/WordStackNavigator';
import QuizStackNavigator, {
  QuizStackParamList,
} from '../stack/QuizStackNavigator';
import SettingHomeScreen from '../../screens/settings/SettingHomeScreen';
import SettingStackNavigator, {
  SettingStackParamList,
} from '../stack/SettingStackNavigator';
import CalendarHomeScreen from '../../screens/calender/CalendarHomeScreen';
import {colors} from '../../constants/colors';
import HeaderButton from '../../components/common/HeaderButton';
import useThemeStore from '../../store/useThemeStore';
import {ThemeMode} from '../../types';
import BasicsStackNavigator, {
  BasicsStackParamList,
} from '../stack/BasicsStackNavigator';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<WordStackParamList>;
  [mainNavigations.BASICS]: NavigatorScreenParams<BasicsStackParamList>;
  [mainNavigations.QUIZ]: NavigatorScreenParams<QuizStackParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
};

type Navigation = CompositeNavigationProp<
  StackNavigationProp<WordStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
  theme: ThemeMode,
) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'book';
      break;
    }
    case mainNavigations.BASICS: {
      iconName = 'type-specimen';
      break;
    }
    case mainNavigations.QUIZ: {
      iconName = 'quiz';
      break;
    }
    case mainNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
    case mainNavigations.SETTING: {
      iconName = 'settings';
      break;
    }
  }

  return (
    <MaterialIcons
      color={focused ? colors[theme].GRAY_300 : colors[theme].BLACK}
      name={iconName}
      size={18}
    />
  );
}

function MainDrawerNavigator() {
  const {theme} = useThemeStore();
  const navigation = useNavigation<Navigation>();

  const handlePressHome = () => {
    navigation.navigate(wordNavigations.WORD_HOME);
  };

  return (
    <Drawer.Navigator
      drawerContent={CustomDraweContent}
      initialRouteName={mainNavigations.HOME}
      screenOptions={({route}) => ({
        headerShown: true,
        headerStyle: {
          height: 50,
          backgroundColor: colors[theme].PINK_300,
        },
        headerTintColor: colors['light'].WHITE,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.7,
        },
        drawerLabelStyle: {
          color: colors[theme].BLACK,
        },
        drawerItemStyle: {
          height: 60,
          borderColor: colors[theme].GRAY_200,
          borderTopWidth: 1,
          borderBottomWidth: route.name === 'Setting' ? 1 : 0,
          borderRadius: 0,
          marginVertical: 0,
          justifyContent: 'center',
          color: colors[theme].BLACK,
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused, theme),
        headerRight: () => (
          <HeaderButton
            onPress={handlePressHome}
            icon={
              <Octicons name="home" color={colors['light'].WHITE} size={22} />
            }
          />
        ),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={WordStackNavigator}
        options={{
          title: '단어장',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.BASICS}
        component={BasicsStackNavigator}
        options={{
          title: '히라가나/가타카나',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.QUIZ}
        component={QuizStackNavigator}
        options={{
          title: '퀴즈',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '공부 기록',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{
          title: '설정',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;

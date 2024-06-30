import {useEffect} from 'react';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import SplashScreen from 'react-native-splash-screen';
export default function RootNavigator() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <MainDrawerNavigator />;
}

import {colors} from '@/constants/colors';

import {ReactNode} from 'react';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {PressableProps, StyleSheet, Pressable, ViewStyle} from 'react-native';

interface ICustomButton extends PressableProps {
  children: ReactNode;
  size?: 'full' | 'fit';
}

const buttonSize: {[key: string]: ViewStyle['width']} = {
  full: '100%',
  fit: 200,
};

function CustomButton({children, size = 'full', ...props}: ICustomButton) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const buttonWidth = buttonSize[size];

  return (
    <Pressable style={[styles.button, {width: buttonWidth}]} {...props}>
      {children}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      gap: 3,
      backgroundColor: colors[theme].PINK_300,
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 'auto',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CustomButton;

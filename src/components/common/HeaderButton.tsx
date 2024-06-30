import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {ReactNode} from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
}

function HeaderButton({labelText, icon, ...props}: HeaderButtonProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} {...props}>
      {icon && <View style={styles.icon}>{icon}</View>}
      {labelText && <Text style={styles.text}>{labelText}</Text>}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    icon: {
      padding: 8,
    },
    text: {
      fontSize: 15,
      fontWeight: '500',
      color: colors['light'].WHITE,
    },
  });

export default HeaderButton;

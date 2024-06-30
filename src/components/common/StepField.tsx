import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Pressable,
  PressableProps,
} from 'react-native';
import useThemeStore from '../../store/useThemeStore';
import {ThemeMode} from '../../types';
import {colors} from '../../constants/colors';

interface StepFieldProps extends PressableProps {
  title: string;
  number?: 'first' | 'other';
  icon?: ReactNode;
  bold?: boolean;
}

const deviceWidth = Dimensions.get('window').width;

const StepField = ({
  title,
  number = 'first',
  icon,
  bold = false,
  ...props
}: StepFieldProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={[
        styles.container,
        number === 'other' && {
          borderBottomWidth: 1,
          borderBottomColor: colors[theme].GRAY_200,
        },
      ]}
      {...props}>
      <View style={styles.text}>
        {icon && icon}
        <Text style={[styles.title, bold && {fontWeight: 'bold'}]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      width: deviceWidth * 0.9,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
    },
    text: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
    },
    title: {
      color: colors[theme].BLACK,
    },
  });

export default StepField;

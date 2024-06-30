import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeMode} from '../../types';
import {colors} from '../../constants/colors';
import useThemeStore from '../../store/useThemeStore';

interface CustomIconProps {
  color: string;
}

function CustomIcon({color}: CustomIconProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <View style={[styles.marker, {borderColor: color}]}>
        <View style={[styles.eye, styles.leftEye, {backgroundColor: color}]} />
        <View style={[styles.eye, styles.rightEye, {backgroundColor: color}]} />
        <View style={[styles.mouth, styles.good, {borderLeftColor: color}]} />
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      height: 35,
      width: 32,
      alignItems: 'center',
      transform: [{rotate: '-45deg'}],
    },
    marker: {
      transform: [{rotate: '45deg'}],
      width: 27,
      height: 27,
      borderRadius: 27,
      borderBottomRightRadius: 1,
      borderWidth: 1,
      backgroundColor: colors['light'].WHITE,
    },
    eye: {
      position: 'absolute',
      width: 4,
      height: 4,
      borderRadius: 4,
    },
    leftEye: {
      top: 12,
      left: 5,
    },
    rightEye: {
      top: 5,
      left: 12,
    },
    mouth: {
      transform: [{rotate: '45deg'}],
      borderTopColor: 'rgba(255,255,255 / 0.01)',
      borderBottomColor: 'rgba(255,255,255 / 0.01)',
      width: 12,
      height: 12,
      borderWidth: 1,
      borderRadius: 12,
    },
    good: {
      transform: [{rotate: '225deg'}],
      marginLeft: 5,
      marginTop: 5,
      borderRightColor: 'rgba(255,255,255 / 0.01)',
    },
  });

export default CustomIcon;

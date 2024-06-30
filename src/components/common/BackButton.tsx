import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import useThemeStore from '../../store/useThemeStore';
import {ThemeMode} from '../../types';
import {useNavigation} from '@react-navigation/native';

interface BackButtonProps {
  title: string;
}

const deviceHeight = Dimensions.get('window').height;

function BackButton({title}: BackButtonProps) {
  const {theme} = useThemeStore();
  const style = styling(theme);
  const navigation = useNavigation();

  const handleClickBack = () => navigation.goBack();

  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Pressable onPress={handleClickBack}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color={colors[theme].BLACK}
          />
        </Pressable>
      </View>
      <Text style={style.title}>{title}</Text>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: 'center',
      padding: deviceHeight > 700 ? 10 : 5,
      height: 60,
    },
    iconContainer: {
      position: 'absolute',
      left: deviceHeight > 700 ? 10 : 5,
    },
    title: {
      marginHorizontal: 'auto',
      fontWeight: 'bold',
      fontSize: 26,
      color: colors[theme].BLACK,
    },
  });

export default BackButton;

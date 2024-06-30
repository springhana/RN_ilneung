import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React from 'react';
import {Dimensions, Pressable, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
}

const deviceWidth = Dimensions.get('window').width;

function DateBox({date, selectedDate, onPressDate, isToday}: DateBoxProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
              selectedDate === date && isToday && styles.selectedTodayContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: deviceWidth / 7,
      height: deviceWidth / 7,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
    },
    selectedContainer: {
      backgroundColor: colors[theme].BLACK,
    },
    selectedTodayContainer: {
      backgroundColor: colors[theme].PINK_300,
    },
    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    todayText: {
      color: colors[theme].PINK_300,
      fontWeight: 'bold',
    },
    selectedDateText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    scheduleIndicator: {
      marginTop: 2,
      width: 6,
      height: 6,
      borderRadius: 6,
    },
  });

export default DateBox;

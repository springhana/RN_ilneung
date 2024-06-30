import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Calendar from '@/components/calendar/Calendar';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';
import {colors} from '@/constants/colors';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';
import EventList from '@/components/calendar/EventList';

const data = [
  {address: 'N1', title: 'N1 공부'},
  {address: 'N2', title: 'N2 공부'},
  {address: 'N2', title: 'N2 공부'},
  {address: 'N2', title: 'N2 공부'},
  {address: 'N2', title: 'N2 공부'},
  {address: 'N2', title: 'N2 공부'},
  {address: 'N2', title: 'N2 공부'},
];

function CalendarHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        onChangeMonth={handleUpdateMonth}
        moveToToday={moveToToday}
      />
      <EventList posts={data} />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].BLUE_200,
    },
  });

export default CalendarHomeScreen;

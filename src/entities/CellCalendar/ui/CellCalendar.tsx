import { DateTime } from 'luxon';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  getShortNameWeekDay,
  isWeekends
} from '../../../shared/constant/CalendarConstant';

interface Props {
  date: DateTime;
  onSelectDate: (value: DateTime) => void;
  selected: DateTime;
}

const styles = StyleSheet.create({
  isToday: {
    borderColor: '#22801f'
  },
  card: {
    backgroundColor: '#8e8d8d',
    borderRadius: 10,
    borderColor: 'transparent',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 50,
    marginHorizontal: 5
  },
  big: {
    fontWeight: 'bold',
    fontSize: 19
  },
  medium: {
    fontSize: 16
  }
});

export const CellCalendar = ({ date, onSelectDate, selected }: Props) => {
  const isToday = DateTime.now() === date;
  const isWeekend = isWeekends(date.weekday);
  return (
    <TouchableOpacity style={[styles.card, isToday && styles.isToday]}>
      <Text style={[styles.big, isWeekend && { color: 'red' }]}>
        {getShortNameWeekDay(date.weekday)}
      </Text>
      <View style={{ height: 10 }} />
      <Text style={[styles.medium]}>{date.day}</Text>
    </TouchableOpacity>
  );
};

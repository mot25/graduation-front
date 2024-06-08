import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  dateTimeToJsDate,
  jsDateToDateTime
} from '../../../shared/utils/TimeUtils';

type DateType = 'start' | 'end';

interface Props {
  type: DateType;
  onSelect: (date: DateTime) => void;
  date: DateTime | undefined;
}

const textTitleFromDateType = (dateType: DateType) => {
  if (dateType === 'end') return 'Конец';
  if (dateType === 'start') return 'Начало';
  return 'Начало';
};

const styles = StyleSheet.create({
  date: {
    flex: 1
  }
});

export const SelectDate = ({ type, onSelect, date: _date }: Props) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [date, setDate] = useState<DateTime | undefined>(_date);
  console.log('=>(SelectDate.tsx:28) date', date);

  const onCancel = () => {
    setIsOpenCalendar(false);
  };
  const onConfirm = (date: Date) => {
    setIsOpenCalendar(false);
    setDate(jsDateToDateTime(date));
    onSelect(jsDateToDateTime(date));
  };
  const selectDate = () => {
    setIsOpenCalendar(true);
  };
  const dateTitle = date
    ? date?.toLocaleString(
        {
          weekday: 'long',
          month: 'long',
          day: '2-digit'
        },
        {
          locale: 'RU-ru'
        }
      )
    : textTitleFromDateType(type);
  return (
    <>
      <DatePicker
        modal
        open={isOpenCalendar}
        date={dateTimeToJsDate(date) || dateTimeToJsDate(DateTime.now())}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <TouchableOpacity
        onPress={selectDate}
        style={styles.date}
      >
        <Text>{dateTitle}</Text>
      </TouchableOpacity>
    </>
  );
};

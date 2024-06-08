import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Spacer } from '../../../shared/ui/Spacer';
import {
  dateTimeToJsDate,
  jsDateToDateTime
} from '../../../shared/utils/TimeUtils';
import { SelectDate } from '../../SelectDate';
import TimeIcon from '../assets/icon/TimeIcon.svg';

interface Props {
  date: DateTime;
  onChange: (date: DateTime) => void;
}

const styles = StyleSheet.create({
  root: {},
  wrapperDate: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 6
  },
  date: {
    flex: 1
  }
});

export function CalendarButton({ date, onChange }: Props) {
  const [dates, setDates] = useState<Partial<EventsType.DateEvent>[]>([
    {
      id: Date.now(),
      dateEnd: undefined,
      dateStart: undefined
    }
  ]);
  const addStart = (date: DateTime, id: number) => {
    setDates(prev => {
      return prev.map(prevDate => {
        if (prevDate.id === id) {
          prevDate.dateStart = dateTimeToJsDate(date);
        }
        return prevDate;
      });
    });
  };
  const addEnd = (date: DateTime, id: number) => {
    setDates(prev => {
      return prev.map(prevDate => {
        if (prevDate.id === id) {
          prevDate.dateEnd = dateTimeToJsDate(date);
        }
        return prevDate;
      });
    });
  };

  const addPeriod = () => {
    setDates(prev => [
      ...prev,
      {
        id: Date.now(),
        dateEnd: undefined,
        dateStart: undefined
      }
    ]);
  };

  return (
    <View style={styles.root}>
      {dates.map(date => {
        return (
          <View
            key={date.id}
            style={styles.wrapperDate}
          >
            <SelectDate
              date={
                date.dateStart ? jsDateToDateTime(date.dateStart) : undefined
              }
              onSelect={d => addStart(d, date.id || 0)}
              type={'start'}
            />
            <SelectDate
              date={date.dateEnd ? jsDateToDateTime(date.dateEnd) : undefined}
              onSelect={d => addEnd(d, date.id || 0)}
              type={'end'}
            />
            <TimeIcon
              width={25}
              height={25}
            />
            <Spacer size={10} />
            <TouchableOpacity>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <Spacer size={20} />
      <TouchableOpacity onPress={() => addPeriod()}>
        <Text>Добавить день</Text>
      </TouchableOpacity>
    </View>
  );
}

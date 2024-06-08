import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CellCalendar } from '../../../entities/CellCalendar';
import { monthsInRussian } from '../../../shared/constant/CalendarConstant';
import { getIntervalBetweenTwoDate } from '../../../shared/utils/DateUtils';

interface Props {
  onSelectDate: (value: DateTime) => void;
  selected: DateTime;
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateSection: {
    width: '100%'
  },
  scroll: {}
});

export const HorizontalCalendar = ({ onSelectDate, selected }: Props) => {
  const interval = getIntervalBetweenTwoDate(
    DateTime.now(),
    DateTime.now().plus({ month: 3 })
  );

  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState<number>(
    interval.dateIntervals[0].month
  );

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollUser = e.nativeEvent.contentOffset.x;
    setScrollPosition(scrollUser);
  };

  const selectCurrentMonth = () => {
    const scrollDay = (scrollPosition / 60).toFixed();
    const month = interval.interval.start?.plus({ day: +scrollDay }).month;
    setCurrentMonth(month || 1);
  };

  useEffect(selectCurrentMonth, [scrollPosition]);
  useEffect(() => {
    // console.log('month')
  }, [currentMonth]);
  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>{monthsInRussian(currentMonth)}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={60}
            scrollEventThrottle={16}
            onScroll={handleScroll}
          >
            {interval.dateIntervals.map((date, index) => (
              <CellCalendar
                key={index}
                date={date.date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

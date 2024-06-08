import { DateTime, Interval } from 'luxon';
import { CalendarData } from '../../features/HorizontalCalendar/types';

export const getIntervalBetweenTwoDate = (now: DateTime, twoDate: DateTime) => {
  const interval = Interval.fromDateTimes(now, twoDate);
  const daysInInterval = interval.length('days');
  const dateIntervals: CalendarData[] = [];

  for (let i = 0; i <= daysInInterval; i++) {
    const currentDate = now.plus({ day: i });
    dateIntervals.push({
      date: currentDate,
      year: currentDate.year,
      dayWeek: currentDate.weekday,
      month: currentDate.month,
      day: currentDate.day
    });
  }

  return { interval, dateIntervals };
};

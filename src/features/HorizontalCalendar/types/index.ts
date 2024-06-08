import { DateTime } from 'luxon';

export interface CalendarData {
  date: DateTime;
  year: number;
  dayWeek: number;
  month: number;
  day: number;
}

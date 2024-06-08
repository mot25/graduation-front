import { isDate, isString } from 'lodash';
import { DateTime, DateTimeJSOptions, Interval } from 'luxon';

export const dateTimeToJsDate = (date?: DateTime): Date =>
  date
    ? DateTime.fromISO(date.toString()).toJSDate()
    : DateTime.now().toJSDate();
export const jsDateToDateTime = (date: Date): DateTime =>
  DateTime.fromJSDate(date);

export const SHORT_TIME_FORMAT = 'HH:mm';
export const SHORT_DMY_DATE_FORMAT = 'd MMMM';
export const SHORT_DATE_FORMAT = 'dd.MM.yyyy';
export const SHORT_STRING_DATE_FORMAT = 'd MMMM';
export const SHORT_STRING_DATE_YEAR_FORMAT = 'LLLL yyyy';
export const SHORT_STRING_DMY_FORMAT = 'dd MMM yyyy';
export const CALENDAR_SHORT_STRING_DATE_YEAR_FORMAT = 'MMMM yyyy';
export const STRING_DMY_FORMAT = 'd LLLL yyyy';
export const TIME_STAMP_FORMAT = 'yyyyMMddHHmmss';
export const SHORT_URL_DATE_FORMAT = 'yyyy-MM-dd';
export const FULL_DATE_FORMAT = 'dd.MM.yyyy HH-mm-ss';
export const DELIVERY_FULL_FORMAT = 'В EEE., d MMMM к HH:mm';
export const STRING_DATE_WITH_TIME_FORMAT = 'd MMMM в HH:mm';
export const JOURNAL_FULL_FORMAT = 'dd.MM.yyyy HH:mm';

export function normalizeDateTime(date: string | Date | DateTime): DateTime {
  if (isDate(date)) {
    return DateTime.fromJSDate(date);
  }

  if (isString(date)) {
    return DateTime.fromISO(date);
  }

  return date;
}

export function isToday(date?: Date | string) {
  if (date == null) {
    return false;
  }

  const dateTime = isDate(date)
    ? DateTime.fromJSDate(date)
    : DateTime.fromISO(date);

  const dateMillis = dateTime.startOf('day').toMillis();
  const nowMillis = DateTime.now().startOf('day').toMillis();

  return nowMillis === dateMillis;
}

export function isTomorrow(date?: Date | string) {
  if (date == null) {
    return false;
  }

  const dateTime = isDate(date)
    ? DateTime.fromJSDate(date)
    : DateTime.fromISO(date);

  const dateMillis = dateTime.minus({ days: 1 }).startOf('day').toMillis();
  const nowMillis = DateTime.now().startOf('day').toMillis();

  return nowMillis === dateMillis;
}

export function isYesterday(date?: Date | string) {
  if (date == null) {
    return false;
  }

  const dateTime = isDate(date)
    ? DateTime.fromJSDate(date)
    : DateTime.fromISO(date);

  const dateMillis = dateTime.plus({ days: 1 }).startOf('day').toMillis();
  const nowMillis = DateTime.now().startOf('day').toMillis();

  return nowMillis === dateMillis;
}

interface DateToFormatProps {
  readonly format: string;
  readonly date: Date | string | DateTime;
}

export function dateToFormat({ date, format }: DateToFormatProps): string {
  const dateTime = normalizeDateTime(date);

  return dateTime.toFormat(format, { locale: 'ru-RU' });
}

interface DateFromFormatProps {
  readonly date: string;
  readonly toFormat: string;
  readonly fromFormat: string;
}

export function dateFromFormat({
  fromFormat,
  date,
  toFormat
}: DateFromFormatProps): string {
  return DateTime.fromFormat(date, fromFormat, { locale: 'ru-RU' }).toFormat(
    toFormat
  );
}

interface DateTimeFromFormatProps {
  readonly date: string;
  readonly format: string;
}

export function dateTimeFromFormat({
  format,
  date
}: DateTimeFromFormatProps): DateTime {
  return DateTime.fromFormat(date, format, { locale: 'ru-RU' });
}

export function getTodayDateTime(): DateTime {
  return DateTime.now();
}

export function getTodayJSDateTime(): Date {
  return DateTime.now().toJSDate();
}

export function getTodayDateInShortDateFormat(): string {
  const date = DateTime.now().toJSDate();
  return dateToFormat({ date, format: SHORT_DATE_FORMAT });
}

export function getTodayDateInShortUrlDateFormat(): string {
  const date = DateTime.now().toJSDate();
  return dateToFormat({ date, format: SHORT_URL_DATE_FORMAT });
}

export function getPreviousMonthInShortUrlDateFormat(date: string): string {
  const dateMonthAgo = DateTime.fromISO(date).minus({ days: 30 }).toJSDate();

  return dateToFormat({ date: dateMonthAgo, format: SHORT_URL_DATE_FORMAT });
}

export function getDateShotFormat(date: string): string {
  return DateTime.fromISO(date).toFormat(SHORT_URL_DATE_FORMAT);
}

export function getDatesDifference(startDate: string, endDate: string): number {
  const { days } = DateTime.fromISO(endDate)
    .diff(DateTime.fromISO(startDate), 'days')
    .toObject();

  return days ?? 0;
}

export function getTomorrowDateTime(): DateTime {
  return DateTime.now().plus({ days: 1 });
}

export function getYesterdayDateTime(): DateTime {
  return DateTime.now().minus({ days: 1 });
}

interface GetPeriodProps {
  readonly startDate: DateTime;
  readonly endDate: DateTime;
}

export function getPeriod({ startDate, endDate }: GetPeriodProps) {
  const interval = Interval.fromDateTimes(startDate, endDate);
  const arrayOfDates = [startDate.toISODate()];
  let cursor = interval.start.startOf('day');
  while (cursor <= interval.end) {
    arrayOfDates.push(cursor.toISODate());
    cursor = cursor.plus({ days: 1 });
  }
  return arrayOfDates;
}

export function getStartOfMonthInFormat(format: string): string {
  const startOfMonth = new Date(new Date()?.setDate(1));
  return dateToFormat({ date: startOfMonth, format: format });
}

export function getCurrentYear(): number {
  return getTodayDateTime().year;
}

export function getCurrentMonth(): number {
  return getTodayDateTime().month;
}

export function makeYearsRange(firstYear: number, lastYear: number): string[] {
  const diff = lastYear - firstYear;
  const yearsArray = [];
  for (let i = 0; i <= diff; i++) {
    yearsArray.push(`${firstYear + i}`);
  }
  return yearsArray;
}

interface DateToDateTimeProps {
  readonly date: Date | string;
  readonly fromFormat?: string;
}

export function dateToDateTime({
  date,
  fromFormat
}: DateToDateTimeProps): DateTime {
  if (isDate(date)) {
    return DateTime.fromJSDate(date)?.setLocale('ru-RU');
  }

  if (fromFormat != null) {
    return DateTime.fromFormat(date, fromFormat)?.setLocale('ru-RU');
  }

  return DateTime.fromISO(date)?.setLocale('ru-RU');
}

export function getLocalTimeStamp(opts?: DateTimeJSOptions): string {
  return DateTime.local(opts).toFormat(TIME_STAMP_FORMAT);
}

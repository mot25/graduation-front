export const getShortNameWeekDay = (day: number) =>
  ({
    1: 'Вс',
    2: 'Пн',
    3: 'Вт',
    4: 'Ср',
    5: 'Чт',
    6: 'Пт',
    7: 'Сб'
  }[day] || 'Пн');

export const isWeekends = (day: number) => [1, 7].includes(day);

export const monthsInRussian = (month: number) =>
  ({
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь'
  }[month] || '');

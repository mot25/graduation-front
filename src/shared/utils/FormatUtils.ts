import { toFinite, toNumber } from 'lodash';

export function formatCurrencyNumber(
  value: string | number = 0,
  withSpace = true
): string {
  return toNumber(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, withSpace ? ' ' : '');
}

interface FormatPriceOptionsProps {
  readonly showZero?: boolean;
  readonly zeroAsFree?: boolean;
}

const FORMAT_PRICE_DEFAULT_OPTIONS = { showZero: true, zeroAsFree: false };

export function formatPrice(
  price?: number | string,
  withSpace = true,
  {
    showZero,
    zeroAsFree
  }: FormatPriceOptionsProps = FORMAT_PRICE_DEFAULT_OPTIONS
): string {
  if (!showZero && !price) {
    return '';
  }

  if (zeroAsFree && !price) {
    return 'бесплатно';
  }

  return `${formatCurrencyNumber(toFinite(price) / 100, withSpace)} ₽`;
}

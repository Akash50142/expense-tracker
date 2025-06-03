import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString: string, formatStr: string = 'MMM d, yyyy'): string => {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatMonthYear = (dateString: string): string => {
  return formatDate(dateString, 'MMM yyyy');
};

export const getToday = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getMonthName = (month: number): string => {
  return format(new Date(2000, month - 1, 1), 'MMMM');
};

export const getCurrentMonth = (): string => {
  return format(new Date(), 'yyyy-MM');
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};
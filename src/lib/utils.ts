import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(sentence: string, maxLength: number) {
  if (sentence?.length > maxLength) {
    return sentence.slice(0, maxLength) + '...';
  }
  return sentence;
}

export function formatNumberWithCommas(value: number) {
  return value?.toLocaleString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Define options to format the date
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  // Return the formatted date
  return date.toLocaleDateString('en-GB', options);
}

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
  return value.toLocaleString();
}
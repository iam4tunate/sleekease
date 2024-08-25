import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function truncate(sentence: string, maxLength: number) {
  if (sentence.length > maxLength) {
    return sentence.slice(0, maxLength) + '...';
  }
  return sentence;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

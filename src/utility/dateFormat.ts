import { format as dateFnsFormat } from 'date-fns';

export const dateFormat = (
  maybeDate: Date | undefined,
  format: 'time' | 'date' = 'date',
): string => {
  if (!maybeDate) return '';

  if (format === 'date') {
    return dateFnsFormat(new Date(maybeDate), 'yyyy/MM/dd');
  }

  return dateFnsFormat(new Date(maybeDate), 'HH:mm');
};

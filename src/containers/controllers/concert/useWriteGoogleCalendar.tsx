import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { createConcert } from '../../database/concert/createConcert';

export const eventInfo = {
  summary: 'Google I/O 2015',
  location: '800 Howard St., San Francisco, CA 94103',
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: '2015-05-28T09:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2015-05-28T17:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
  attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
  reminders: {
    useDefault: true,
  },
};

interface Variables {
  title: string;
  date: Date;
  address: string;
  placeId: string;
  prefecture: string | null;
  symphonies: string[];
  orchestra: {
    id: string;
    name: string;
  };
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useWriteGoogleCalendar: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const mutateFn = (variables: Variables) => createConcert(variables);

  return useMutation(mutateFn, {
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};

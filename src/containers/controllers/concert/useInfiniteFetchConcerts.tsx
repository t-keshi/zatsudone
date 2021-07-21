import firebase from 'firebase/app';
import { useState } from 'react';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import { ConcertsResponse, ConcertType } from '../../../types';
import { fetchConcerts } from '../../database/concert/fetchConcerts';
import { Prefecture } from '../../entities/prefectures';
import { QUERY } from '../../entities/query';

type Data = {
  concerts: ConcertsResponse['concerts'];
  lastConcert: firebase.firestore.QueryDocumentSnapshot<ConcertType>;
  isLast: boolean;
};
type OrderBy = 'createdAt' | 'date';
interface Variables {
  orderBy?: OrderBy;
  prefecture?: Prefecture;
}
type UseFetchConcerts = (
  variables?: Variables,
  options?: UseInfiniteQueryOptions<
    Data | void,
    unknown,
    Data | void,
    Data | void,
    [string, OrderBy | undefined, string | undefined]
  >,
) => UseInfiniteQueryResult<Data | void, unknown>;

export const useInfiniteFetchConcerts: UseFetchConcerts = (
  variables,
  options,
) => {
  const [lastVisible, setLastVisible] = useState<
    firebase.firestore.QueryDocumentSnapshot<ConcertType> | undefined
  >(undefined);
  const queryFn = () => fetchConcerts(variables, lastVisible);

  return useInfiniteQuery(
    [QUERY.concerts, variables?.orderBy, variables?.prefecture],
    queryFn,
    {
      ...options,
      getNextPageParam: (lastPage) => !lastPage?.isLast,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (res) => {
        setLastVisible(res.pages[res.pages.length - 1]?.lastConcert);
      },
    },
  );
};

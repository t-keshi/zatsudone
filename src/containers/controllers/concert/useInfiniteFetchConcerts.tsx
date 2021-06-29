import firebase from 'firebase';
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
    Data,
    unknown,
    Data,
    Data,
    [string, OrderBy | undefined, string | undefined]
  >,
) => UseInfiniteQueryResult<Data, unknown>;

export const useInfiniteFetchConcerts: UseFetchConcerts = (
  variables,
  options,
) => {
  const [lastVisible, setLastVisible] = useState<
    firebase.firestore.QueryDocumentSnapshot<ConcertType> | undefined
  >(undefined);
  const [shouldFetchNext, setShouldFetchNest] = useState<boolean>(true);
  const queryFn = () => fetchConcerts(variables, lastVisible);

  console.log(shouldFetchNext);

  return useInfiniteQuery(
    [QUERY.concerts, variables?.orderBy, variables?.prefecture],
    queryFn,
    {
      ...options,
      getPreviousPageParam: () => true,
      getNextPageParam: () => shouldFetchNext,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        setLastVisible(res.pages[res.pages.length - 1].lastConcert);
        if (res.pages[res.pages.length - 1].isLast) {
          setShouldFetchNest(false);
        }
      },
    },
  );
};

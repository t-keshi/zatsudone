/* eslint-disable @typescript-eslint/no-explicit-any */
import { History, Location } from 'history';
import { useMemo } from 'react';
import {
  match as Match,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

interface ReturnType {
  // eslint-disable-next-line @typescript-eslint/ban-types
  match: Match<{}>;
  location: Location<any>;
  history: History<any>;
  params: any;
}

export const useRouter = (): ReturnType => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  return useMemo(
    () => ({
      match,
      location,
      history,
      params,
    }),
    [match, location, history, params],
  );
};

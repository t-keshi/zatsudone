/* eslint-disable @typescript-eslint/no-explicit-any */
import { History, Location } from 'history';
import { useMemo } from 'react';
import {
  match as Match,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

interface ReturnType {
  // eslint-disable-next-line @typescript-eslint/ban-types
  match: Match<{}>;
  location: Location<any>;
  history: History<any>;
}

export const useRouter = (): ReturnType => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(
    () => ({
      match,
      location,
      history,
    }),
    [match, location, history],
  );
};

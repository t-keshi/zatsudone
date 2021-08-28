import produce from 'immer';
import { createReducerContext } from '../../utility/factory/createReducerContext';

type State = { members: string[] };
const initialState: State = { members: [] };
type Remove = {
  type: 'close';
  payload: {
    name: string;
  };
};
type Add = {
  type: 'add';
  payload: {
    name: string;
  };
};
type Action = Add | Remove;

const reducer = produce((draft: State, action: Action): void => {
  switch (action.type) {
    case 'add':
      draft.members = [...draft.members, action.payload.name];

      return;
    default:
      throw Error('');
  }
});

export const [useMembers, MembersProvider] = createReducerContext<
  typeof reducer
>(reducer, initialState);

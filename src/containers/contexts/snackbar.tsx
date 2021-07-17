import { AlertProps } from '@material-ui/lab/Alert';
import produce from 'immer';
import { createReducerContext } from '../../utility/factory/createReducerContext';

interface State {
  isOpen: boolean;
  severity: AlertProps['severity'];
  message: string;
}
const initialState: State = {
  isOpen: false,
  severity: 'success',
  message: '',
};
type Close = {
  type: 'close';
};
type Open = {
  type: 'open';
  payload: {
    severity: AlertProps['severity'];
    message: string;
  };
};
type Action = Close | Open;

const reducer = produce((draft: State, action: Action): void => {
  switch (action.type) {
    case 'close':
      draft.isOpen = false;
      draft.severity = 'success';
      draft.message = '';

      return;
    case 'open':
      draft.isOpen = true;
      draft.severity = action.payload.severity;
      draft.message = action.payload.message;

      return;
    default:
      throw Error('');
  }
});

export const [useSnackbar, SnackbarProvider] = createReducerContext<
  typeof reducer
>(reducer, initialState);

import { jaJP } from '@material-ui/core/locale';
import { createMuiTheme } from '@material-ui/core/styles';
import { colorTheme } from './colorTheme';
import { typographyTheme } from './typographyTheme';

export const theme = createMuiTheme(
  {
    ...colorTheme,
    ...typographyTheme,
    shape: {
      borderRadius: 8,
    },
    props: {
      MuiTextField: {
        variant: 'outlined',
      },
      MuiButton: {
        variant: 'contained',
        color: 'primary',
        disableElevation: true,
      },
      MuiPaper: {
        elevation: 0,
      },
    },
  },
  jaJP,
);

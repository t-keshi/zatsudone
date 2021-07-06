import { jaJP } from '@material-ui/core/locale';
import { createMuiTheme } from '@material-ui/core/styles';
import { breakpointsTheme } from './breakpointTheme';
import { colorTheme } from './colorTheme';
import { typographyTheme } from './typographyTheme';
import { zIndexTheme } from './zIndexTheme';

export const theme = createMuiTheme(
  {
    ...colorTheme,
    ...typographyTheme,
    ...breakpointsTheme,
    ...zIndexTheme,
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

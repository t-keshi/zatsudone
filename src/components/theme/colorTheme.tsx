declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    custom: CustomColor;
  }
  interface PaletteOptions {
    custom?: CustomColorOptions;
  }
  interface CustomColor {
    twitter: string;
    facebook: string;
    google: string;
    favorite: string;
  }
  interface CustomColorOptions {
    twitter?: string;
    facebook?: string;
    google?: string;
    favorite?: string;
  }
}

export const colorTheme = {
  palette: {
    primary: {
      light: '#fff950',
      main: '#f7c602',
      dark: '#bf9600',
      contrastText: '#000000',
    },
    secondary: {
      light: '#a8faff',
      main: '#74c7e7',
      dark: '#3e96b5',
      contrastText: '#000000',
    },
    background: {
      default: '#f6f6f6',
      paper: '#f6f6f6',
    },
    custom: {
      twitter: '#1da1f2',
      facebook: '#4267b2',
      google: '#db4437',
      favorite: '#e0255e',
    },
  },
};

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
      light: '#5749b8',
      main: '#1d2087',
      dark: '#000059',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#fce0cf',
      dark: '#c9ae9e',
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

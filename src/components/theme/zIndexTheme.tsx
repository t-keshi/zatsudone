declare module '@material-ui/core/styles/zIndex' {
  interface ZIndex {
    overlay: number;
  }
}

export const zIndexTheme = {
  zIndex: {
    overlay: 900,
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

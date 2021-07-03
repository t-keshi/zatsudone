import { Button, ButtonProps } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import { FcGoogle } from 'react-icons/fc';

const GOOGLE_COLOR = '#ffffff';

const useStyles = makeStyles((theme) => ({
  button: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: GOOGLE_COLOR,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: darken(GOOGLE_COLOR, theme.palette.action.hoverOpacity),
    },
  },
}));

export const GoogleButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      startIcon={<FcGoogle />}
      size="large"
      //  eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );
};

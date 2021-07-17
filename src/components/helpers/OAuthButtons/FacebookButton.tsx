import { Button, ButtonProps } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Facebook } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.custom.facebook,
    color: theme.palette.common.white,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: darken(
        theme.palette.custom.facebook,
        theme.palette.action.hoverOpacity,
      ),
    },
  },
}));

export const FacebookButton: React.FC<ButtonProps> = ({
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      startIcon={<Facebook />}
      size="large"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );
};

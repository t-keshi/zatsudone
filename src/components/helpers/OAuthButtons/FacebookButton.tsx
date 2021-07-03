import { Button, ButtonProps } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Facebook } from '@material-ui/icons';

const FACEBOOK_COLOR = '#4267b2';

const useStyles = makeStyles((theme) => ({
  button: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: FACEBOOK_COLOR,
    color: theme.palette.common.white,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: darken(
        FACEBOOK_COLOR,
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

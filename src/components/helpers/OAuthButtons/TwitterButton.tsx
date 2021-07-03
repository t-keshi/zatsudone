import { Button, ButtonProps } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Twitter } from '@material-ui/icons';

const TWITTER_COLOR = '#1da1f2';

const useStyles = makeStyles((theme) => ({
  button: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: TWITTER_COLOR,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: darken(TWITTER_COLOR, theme.palette.action.hoverOpacity),
    },
  },
}));

export const TwitterButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      startIcon={<Twitter />}
      size="large"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );
};

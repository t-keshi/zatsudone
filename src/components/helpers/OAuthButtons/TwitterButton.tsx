import { Button, ButtonProps } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Twitter } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.custom.twitter,
    color: theme.palette.common.white,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: darken(
        theme.palette.custom.twitter,
        theme.palette.action.hoverOpacity,
      ),
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

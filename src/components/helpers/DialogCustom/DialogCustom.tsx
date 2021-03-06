import {
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React from 'react';
import { YesOrNoButton } from '../YesOrNoButton/YesOrNoButton';

interface StyleProps {
  minWidth?: DialogProps['maxWidth'];
}
interface BaseProps extends StyleProps {
  open: DialogProps['open'];
  onClose: () => void;
  title: string;
  maxWidth?: DialogProps['maxWidth'];
}

interface DialogCustomProps extends BaseProps {
  variant: 'standard';
  yesLabel: string;
  yesButtonProps: ButtonProps;
  noLabel: string;
  noButtonProps?: ButtonProps;
  buttonWidth?: number;
}

interface DialogCustomHeaderProps extends BaseProps {
  variant: 'customHeader';
  header: React.ReactNode;
  yesLabel: string;
  yesButtonProps: ButtonProps;
  noLabel: string;
  noButtonProps: ButtonProps;
  buttonWidth?: number;
}

interface DialogCustomActionProps extends BaseProps {
  variant: 'customAction';
  actionButton: React.ReactNode;
}

type Props =
  | DialogCustomProps
  | DialogCustomHeaderProps
  | DialogCustomActionProps;

interface DefaultProps {
  variant: 'standard' | 'customHeader' | 'customAction';
  yesLabel: string;
  noLabel: string;
}

const defaultProps: DefaultProps = {
  variant: 'standard',
  yesLabel: '保存',
  noLabel: 'キャンセル',
};

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '100%',
    minWidth: ({ minWidth }: StyleProps) =>
      minWidth ? theme.breakpoints.values[minWidth] : 'auto',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0.5),
    color: theme.palette.grey[500],
  },
}));

export const DialogCustom = ({
  children,
  open,
  onClose,
  title,
  maxWidth,
  minWidth,
  ...rest
}: React.ComponentProps<React.FC<Props>>): React.ReactElement => {
  const classes = useStyles({ minWidth });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
    >
      {rest.variant === 'customHeader' ? (
        rest.header
      ) : (
        <div className={classes.closeButton}>
          <Tooltip title="閉じる">
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {rest.variant === 'customAction' ? (
        rest.actionButton
      ) : (
        <DialogActions>
          <YesOrNoButton
            yesLabel={rest.yesLabel}
            yesButtonProps={{
              ...rest.yesButtonProps,
            }}
            noLabel={rest.noLabel}
            noButtonProps={{ onClick: onClose, ...rest.noButtonProps }}
            width={rest.buttonWidth}
          />
        </DialogActions>
      )}
    </Dialog>
  );
};

DialogCustom.defaultProps = defaultProps;

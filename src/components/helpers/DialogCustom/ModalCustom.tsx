import {
  ButtonProps,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React from 'react';
import { ModalBase } from '../ModalBase/ModalBase';
import { YesOrNoButton } from '../YesOrNoButton/YesOrNoButton';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    marginTop: theme.spacing(-1),
    marginRight: theme.spacing(-1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  yesOrNoButton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface BaseProps {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  modalWidth?: number;
}

interface ModalProps extends BaseProps {
  variant: 'standard';
  yesLabel: string;
  yesButtonProps: ButtonProps;
  noLabel: string;
  noButtonProps: ButtonProps;
  buttonWidth?: number;
}

interface ModalWithoutConfirmProps extends BaseProps {
  variant: 'withoutConfirm';
  confirmButtons: React.ReactNode;
}

interface ModalWithoutHeaderProps extends BaseProps {
  variant: 'withoutHeader';
  header: React.ReactNode;
  yesLabel: string;
  yesButtonProps: ButtonProps;
  noLabel: string;
  noButtonProps: ButtonProps;
  buttonWidth?: number;
}

type Props = ModalProps | ModalWithoutConfirmProps | ModalWithoutHeaderProps;

interface DefaultProps {
  variant: 'standard' | 'withoutHeader' | 'withoutConfirm';
  yesLabel: string;
  noLabel: string;
}

const defaultProps = {
  variant: 'standard',
  yesLabel: '保存',
  noLabel: 'キャンセル',
};

// ! このコンポーネントは使わずDialogCustomを使う
export const ModalCustom = ({
  children,
  isModalOpen,
  closeModal,
  title,
  modalWidth,
  ...rest
}: React.ComponentProps<
  React.FC<Props & DefaultProps>
>): React.ReactElement => {
  const classes = useStyles();

  return (
    <ModalBase
      modalWidth={modalWidth}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    >
      {rest.variant === 'withoutHeader' ? (
        rest.header
      ) : (
        <div className={classes.closeButton}>
          <Tooltip title="閉じる">
            <IconButton onClick={closeModal}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <Typography variant="h6" paragraph>
        {title}
      </Typography>
      {children}
      {rest.variant === 'withoutConfirm' ? (
        rest.confirmButtons
      ) : (
        <div className={classes.yesOrNoButton}>
          <YesOrNoButton
            yesLabel={rest.yesLabel}
            yesButtonProps={rest.yesButtonProps}
            noLabel={rest.noLabel}
            noButtonProps={rest.noButtonProps}
            width={rest.buttonWidth}
          />
        </div>
      )}
    </ModalBase>
  );
};

ModalCustom.defaultProps = defaultProps;

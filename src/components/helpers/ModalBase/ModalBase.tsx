import { Box, Grow, Modal, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface StyleProps {
  modalWidth?: number;
}

interface Props extends StyleProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContents: {
    width: '95%',
    maxWidth: ({ modalWidth }: StyleProps) => modalWidth ?? 'auto',
    outline: 0,
  },
}));

export const ModalBase: React.FC<Props> = ({
  children,
  modalWidth,
  isModalOpen,
  closeModal,
}) => {
  const classes = useStyles({ modalWidth });

  return (
    <Modal
      className={classes.modal}
      open={isModalOpen}
      onClose={closeModal}
      closeAfterTransition
    >
      <Grow in={isModalOpen}>
        <Paper className={classes.modalContents}>
          <Box p={3}>{children}</Box>
        </Paper>
      </Grow>
    </Modal>
  );
};

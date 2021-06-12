import { Box, Modal, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { YesOrNoButton } from '../../../components/helpers/YesOrNoButton/YesOrNoButton';
import { FormTextField } from '../../../components/ui/FormTextField/FormTextField';

interface Props {
  isModalOpen: boolean;
  handleIsModalOpen: (nextValue?: boolean | undefined) => void;
}

const useStyles = makeStyles(() => ({
  modal: { alignItems: 'center', justifyContent: 'center' },
  modalContents: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '95%',
    maxWidth: '800px',
    transform: 'translate(-50%, -50%)',
  },
}));

interface FormValue {
  title: string;
  date: Date;
  startAt: string;
  openAt: string;
  closeAt: string;
}

export const ConcertFormModal: React.VFC<Props> = ({
  isModalOpen,
  handleIsModalOpen,
}) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <Modal
      className={classes.modal}
      open={isModalOpen}
      onClose={() => handleIsModalOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper className={classes.modalContents}>
          <Box p={3}>
            <FormTextField
              control={control}
              name="title"
              label="演奏会名"
              margin="normal"
              fullWidth
              errorMessage={errors.title?.message}
            />
            <Box mt={1} />
            <FormTextField
              control={control}
              name="date"
              type="date"
              label="開催日"
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              margin="normal"
              fullWidth
              errorMessage={errors.title?.message}
            />
            <Box mt={1} />
            <FormTextField
              control={control}
              name="startAt"
              label="開場時間"
              margin="normal"
              fullWidth
              errorMessage={errors.title?.message}
            />
            <Box mt={1} />
            <FormTextField
              control={control}
              name="startAt"
              label="開演時間"
              margin="normal"
              fullWidth
              errorMessage={errors.title?.message}
            />
            <Box mt={3} display="flex" justifyContent="flex-end">
              <YesOrNoButton
                yesLabel="保存"
                yesButtonProps={{ onClick: () => handleIsModalOpen(false) }}
                noLabel="キャンセル"
                noButtonProps={{ onClick: () => handleIsModalOpen(false) }}
              />
            </Box>
          </Box>
        </Paper>
      </form>
    </Modal>
  );
};

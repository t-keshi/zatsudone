import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateOrchestra } from '../../../containers/controllers/orchestra/useCreateOrchestra';
import { DialogCustom } from '../../helpers/DialogCustom/DialogCustom';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

export interface FormValues {
  name: string;
  description: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  name: yup.string().min(1).max(30).required(),
  description: yup.string().min(1).max(300).required(),
});

export const OrchestraFormModal: React.VFC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutate } = useCreateOrchestra();
  const onSubmit = handleSubmit((data: FormValues) => {
    const { name, description } = data;

    return mutate({ name, description });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogCustom
        variant="standard"
        title="楽団の作成"
        open={isModalOpen}
        onClose={closeModal}
        yesButtonProps={{
          onClick: () => {
            void onSubmit();
            closeModal();
          },
        }}
        noButtonProps={{ onClick: closeModal }}
        maxWidth="sm"
      >
        <FormTextField
          control={control}
          name="name"
          label="楽団名"
          margin="normal"
          fullWidth
          errorMessage={errors.name?.message}
        />
        <Box mt={1} />
        <FormTextField
          control={control}
          name="description"
          label="説明文"
          placeholder="例 ） 当楽団は団員数100名を超える、関西でも最大級の規模を誇る吹奏楽団です。年2回の演奏会の開催を目指し、日々練習に励んでいます。"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          errorMessage={errors.name?.message}
        />
      </DialogCustom>
    </form>
  );
};

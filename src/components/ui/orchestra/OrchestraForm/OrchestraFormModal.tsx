import { yupResolver } from '@hookform/resolvers/yup';
import { Box, MenuItem } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useBelongOrchestra } from '../../../../containers/controllers/belong/useBelongOrchestra';
import { useCreateOrchestra } from '../../../../containers/controllers/orchestra/useCreateOrchestra';
import {
  Prefecture,
  PREFECTURES,
} from '../../../../containers/entities/prefectures';
import { yupLocaleJP } from '../../../../utility/yupLocaleJP';
import { DialogCustom } from '../../../helpers/DialogCustom/DialogCustom';
import { FormSelect } from '../../../helpers/FormTextField/FormSelect';
import { FormTextField } from '../../../helpers/FormTextField/FormTextField';

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

export interface FormValues {
  name: string;
  prefecture: Prefecture;
  description: string;
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  name: yup.string().min(1).max(30).required(),
  prefecture: yup.mixed().oneOf(Object.keys(PREFECTURES)).required(),
  description: yup.string().min(1).max(300).required(),
});

export const OrchestraFormDialog: React.VFC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutate: belong } = useBelongOrchestra();
  const { mutate } = useCreateOrchestra({
    onSuccess: (res) => belong({ orchestra: res, toggle: 'add' }),
  });
  const onSubmit = handleSubmit((data: FormValues) => {
    const { name, description, prefecture } = data;
    void mutate({ name, description, prefecture });

    return closeModal();
  });
  const prefectures = Object.keys(PREFECTURES) as Prefecture[];

  return (
    <form onSubmit={onSubmit}>
      <DialogCustom
        variant="standard"
        title="楽団の作成"
        open={isModalOpen}
        onClose={closeModal}
        yesButtonProps={{
          onClick: onSubmit,
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
        <FormSelect<FormValues>
          label="拠点"
          name="prefecture"
          errorMessage={errors.prefecture?.message}
          register={register}
          formControlProps={{ fullWidth: true }}
          selectProps={{
            fullWidth: true,
            onChange: (e) =>
              setValue('prefecture', e.target.value as Prefecture),
          }}
        >
          <MenuItem value="すべて">すべて</MenuItem>
          {prefectures.map((prefecture) => (
            <MenuItem key={prefecture} value={prefecture}>
              {prefecture}
            </MenuItem>
          ))}
        </FormSelect>
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
          errorMessage={errors.description?.message}
        />
      </DialogCustom>
    </form>
  );
};

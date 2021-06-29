import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUploadCoverImage } from '../../../containers/controllers/orchestra/useUploadCoverImage';
import { Overlay } from '../../helpers/Overlay/Overlay';
import { TextEditable } from '../../helpers/TextEditable/TextEditable';

interface FormValues {
  description: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  description: yup.string().required(),
});

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));

export const OrchestraDescriptionForm: React.VFC = () => {
  const classes = useStyles();
  // TODO: api連携
  const { isLoading } = useUploadCoverImage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className={classes.root}>
      <TextEditable
        name="description"
        value="団員142名、毎日練習に励んでいます"
        control={control}
        errorMessage={errors.description?.message}
        onSubmit={onSubmit}
      />
      {isLoading && <Overlay isBlack={false} />}
    </div>
  );
};

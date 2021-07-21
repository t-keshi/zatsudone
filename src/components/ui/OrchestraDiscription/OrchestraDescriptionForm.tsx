import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUpdateOrchestra } from '../../../containers/controllers/orchestra/useUpdateOrchestra';
import { TextEditable } from '../../helpers/TextEditable/TextEditable';

interface Props {
  orchestraId: string;
  description: string;
}

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

export const OrchestraDescriptionForm: React.VFC<Props> = ({
  orchestraId,
  description,
}) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const { mutate } = useUpdateOrchestra();
  const onSubmit = handleSubmit((data) => {
    mutate({ orchestraId, description: data.description });
  });

  return (
    <div className={classes.root}>
      <TextEditable
        name="description"
        defaultValue={description}
        control={control}
        errorMessage={errors.description?.message}
        onSubmit={onSubmit}
      />
    </div>
  );
};

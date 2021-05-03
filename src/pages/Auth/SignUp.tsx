import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TopLayout } from '../../components/layout/TopLayout';
import { FormTextField } from '../../components/ui/FormTextField';
import { useLogIn } from '../../containers/api/auth/useLogin';
import { useRouter } from '../../helpers/hooks/useRouter';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ROUTE_PATHS } from '../../routes/type';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  name: yup.string().max(12).required(),
  email: yup
    .string()
    .email('メールアドレスの形式が正しくありません')
    .required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm,
      '半角英字、数字、記号を組み合わせて 8 文字以上で入力してください',
    )
    .required(),
});

export const Signup: React.VFC = () => {
  const { history } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutate } = useLogIn();
  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);
    mutate(formValues);
  };

  useTitle('SymphonyForum | ログイン');

  return (
    <TopLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Container maxWidth="sm">
            <Paper variant="outlined">
              <Box p={3}>
                <Typography variant="h6" align="center" paragraph>
                  Symphony Forum
                </Typography>
                <FormTextField
                  control={control}
                  name="name"
                  margin="normal"
                  label="名前(ニックネーム可)"
                  fullWidth
                  errorMessage={errors.name?.message}
                />
                <Box mt={1} />
                <FormTextField
                  control={control}
                  type="email"
                  name="email"
                  margin="normal"
                  label="メールアドレス"
                  fullWidth
                  errorMessage={errors.email?.message}
                />
                <Box mt={1} />
                <FormTextField
                  control={control}
                  type="password"
                  name="password"
                  margin="normal"
                  label="パスワード"
                  fullWidth
                  errorMessage={errors.password?.message}
                />
                <Box mt={3} />
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<ChevronLeft />}
                    onClick={() => history.push(ROUTE_PATHS.ログイン)}
                  >
                    ログイン
                  </Button>
                  <Button type="submit">新規登録</Button>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </form>
    </TopLayout>
  );
};

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormTextField } from '../components/helpers/FormTextField/FormTextField';
import { TopLayout } from '../components/layout/TopLayout';
import { useResetPassword } from '../containers/controllers/authentication/useResetPassword';
import { ROUTE_PATHS } from '../routes/type';
import { useRouter } from '../utility/hooks/useRouter';
import { useTitle } from '../utility/hooks/useTitle';
import { yupLocaleJP } from '../utility/yupLocaleJP';

interface FormValues {
  email: string;
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  email: yup.string().email().required(),
});

const useStyles = makeStyles(() => ({
  authWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  },
}));

export const AuthForgetPassword: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const { mutate } = useResetPassword();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => mutate({ email: data.email }));

  useTitle('SymphonyForum | パスワード再発行');

  return (
    <TopLayout>
      <div className={classes.authWrapper}>
        <Container maxWidth="sm">
          <Paper variant="outlined">
            <Box p={3}>
              <Typography variant="h6" align="center" paragraph>
                Symphony Forum
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                ご登録のメールアドレス宛にパスワード再発行メールを送信します。
              </Typography>
              <FormTextField
                control={control}
                name="email"
                margin="normal"
                label="メールアドレス"
                fullWidth
                errorMessage={errors.email?.message}
              />
              <Box mt={3} />
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="text"
                  color="secondary"
                  startIcon={<ChevronLeft />}
                  onClick={() => history.push(ROUTE_PATHS.ログイン)}
                >
                  戻る
                </Button>
                <Button onClick={onSubmit}>送信</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>
    </TopLayout>
  );
};

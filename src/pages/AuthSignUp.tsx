import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonProgress } from '../components/helpers/ButtonProgress/ButtonProgress';
import { DividerWithText } from '../components/helpers/DividerWithText/DividerWithText';
import { FormTextField } from '../components/helpers/FormTextField/FormTextField';
import { FacebookButton } from '../components/helpers/OAuthButtons/FacebookButton';
import { GoogleButton } from '../components/helpers/OAuthButtons/GoogleButton';
import { TwitterButton } from '../components/helpers/OAuthButtons/TwitterButton';
import { TopLayout } from '../components/layout/TopLayout';
import { useSignUp } from '../containers/controllers/authentication/useSignUp';
import { useSocialLogIn } from '../containers/controllers/authentication/useSocialLogIn';
import { useUpdateUserProfile } from '../containers/controllers/user/useUpdateUserProfile';
import { ROUTE_PATHS } from '../routes/type';
import { asyncDelay } from '../utility/asyncDelay';
import { useRouter } from '../utility/hooks/useRouter';
import { useTitle } from '../utility/hooks/useTitle';

interface FormValues {
  displayName: string;
  email: string;
  password: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  displayName: yup.string().min(1).max(12).required(),
  email: yup
    .string()
    .email('メールアドレスの形式が正しくありません')
    .required(),
  password: yup.string().min(4).required(),
});

const useStyles = makeStyles((theme) => ({
  oauthWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(2, 0),
    justifyContent: 'center',
    rowGap: theme.spacing(2),
  },
}));

export const AuthSignup: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync: profileUpdate } = useUpdateUserProfile({ retry: 10 });
  const { mutateAsync, isLoading } = useSignUp();
  const { mutate: socialLogIn } = useSocialLogIn();
  const onSubmit = async (formValues: FormValues) => {
    const { user } = await mutateAsync(formValues);
    // NOTE: cloudFunction の発火を待つ
    await asyncDelay(1000);
    await profileUpdate({
      uid: user?.uid ?? undefined,
      displayName: formValues.displayName,
      newUser: true,
    });
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
                  name="displayName"
                  margin="normal"
                  label="名前(ニックネーム可)"
                  fullWidth
                  errorMessage={errors.displayName?.message}
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
                <Box mb={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<ChevronLeft />}
                    onClick={() => history.push(ROUTE_PATHS.ログイン)}
                  >
                    ログイン
                  </Button>
                  <ButtonProgress isLoading={isLoading} type="submit">
                    新規登録
                  </ButtonProgress>
                </Box>
                <DividerWithText>OR</DividerWithText>
                <div className={classes.oauthWrapper}>
                  <GoogleButton onClick={() => socialLogIn('google')}>
                    Googleアカウントを使用
                  </GoogleButton>
                  <FacebookButton onClick={() => socialLogIn('facebook')}>
                    Facebookアカウントを使用
                  </FacebookButton>
                  <TwitterButton onClick={() => socialLogIn('twitter')}>
                    twitterアカウントを使用
                  </TwitterButton>
                </div>
              </Box>
            </Paper>
          </Container>
        </Box>
      </form>
    </TopLayout>
  );
};

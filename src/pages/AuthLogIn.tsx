import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@material-ui/core';
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
import { ResponsivePaper } from '../components/helpers/ResponsivePaper.tsx/ResponsivePaper';
import { StyledLink } from '../components/helpers/StyledLink/StyledLink';
import { TopLayout } from '../components/layout/TopLayout';
import { useLogIn } from '../containers/controllers/authentication/useLogIn';
import { useSocialLogIn } from '../containers/controllers/authentication/useSocialLogIn';
import { ROUTE_PATHS } from '../routes/type';
import { useRouter } from '../utility/hooks/useRouter';
import { useTitle } from '../utility/hooks/useTitle';

interface FormValues {
  email: string;
  password: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
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

export const AuthLogIn: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useLogIn();
  const { mutate: socialLogIn } = useSocialLogIn();
  const onSubmit = (formValues: FormValues) => {
    mutate(formValues);
  };

  useTitle('SymphonyForum | ログイン');

  return (
    <TopLayout maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ResponsivePaper breakpoint="xs" variant="outlined">
          <Box p={3}>
            <Typography variant="h6" align="center" paragraph>
              Symphony Forum
            </Typography>
            <FormTextField
              control={control}
              name="email"
              type="email"
              margin="normal"
              label="メールアドレス"
              fullWidth
              errorMessage={errors.email?.message}
            />
            <Box mt={1} />
            <FormTextField
              control={control}
              name="password"
              type="password"
              margin="normal"
              label="パスワード"
              fullWidth
              errorMessage={errors.password?.message}
            />
            <StyledLink
              color="textPrimary"
              underline="always"
              to={ROUTE_PATHS.パスワード忘れ}
            >
              パスワードを忘れた方
            </StyledLink>
            <Box mt={3} />
            <Box mb={2} display="flex" justifyContent="space-between">
              <Button
                variant="text"
                color="secondary"
                startIcon={<ChevronLeft />}
                onClick={() => history.push(ROUTE_PATHS.新規登録)}
              >
                新規登録
              </Button>
              <ButtonProgress isLoading={isLoading} type="submit">
                ログイン
              </ButtonProgress>
            </Box>
            <DividerWithText>OR</DividerWithText>
            <div className={classes.oauthWrapper}>
              <GoogleButton onClick={() => socialLogIn('google')}>
                Googleでログイン
              </GoogleButton>
              <FacebookButton onClick={() => socialLogIn('facebook')}>
                Facebookでログイン
              </FacebookButton>
              <TwitterButton onClick={() => socialLogIn('twitter')}>
                twitterでログイン
              </TwitterButton>
            </div>
          </Box>
        </ResponsivePaper>
      </form>
    </TopLayout>
  );
};

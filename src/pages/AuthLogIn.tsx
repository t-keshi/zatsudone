import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import googleLogIn from '../assets/googleLogIn.png';
import { DividerWithText } from '../components/helpers/DividerWithText/DividerWithText';
import { FormTextField } from '../components/helpers/FormTextField/FormTextField';
import { StyledLink } from '../components/helpers/StyledLink/StyledLink';
import { TopLayout } from '../components/layout/TopLayout';
import { useGoogleLogIn } from '../containers/api/authentication/useGoogleLogIn';
import { useLogIn } from '../containers/api/authentication/useLogIn';
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

export const AuthLogIn: React.VFC = () => {
  const { history } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutate } = useLogIn();
  const { mutate: googleMutate } = useGoogleLogIn();
  const onSubmit = (formValues: FormValues) => {
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
                  name="email"
                  margin="normal"
                  label="メールアドレス"
                  fullWidth
                  errorMessage={errors.email?.message}
                />
                <Box mt={1} />
                <FormTextField
                  control={control}
                  name="password"
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
                  <Button type="submit">ログイン</Button>
                </Box>
                <DividerWithText>OR</DividerWithText>
                <Box my={2} display="flex" justifyContent="center">
                  <ButtonBase onClick={() => googleMutate()}>
                    <img src={googleLogIn} alt="googleLogIn" />
                  </ButtonBase>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </form>
    </TopLayout>
  );
};

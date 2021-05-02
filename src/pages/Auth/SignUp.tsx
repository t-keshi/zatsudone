import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { ChevronLeft } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { TopLayout } from '../../components/layout/TopLayout';
import { FormTextField } from '../../components/ui/FormTextField';
import { useRouter } from '../../helpers/hooks/useRouter';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ROUTE_PATHS } from '../../routes/type';

interface FormValue {
  email: string;
  password: string;
}

export const Signup: React.VFC = () => {
  const { history } = useRouter();
  const {
    control,
    formState: { errors },
  } = useForm<FormValue>();

  useTitle('SymphonyForum | ログイン');

  return (
    <TopLayout>
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
                <Button
                  onClick={() => history.push(ROUTE_PATHS.近日中のコンサート)}
                >
                  新規登録
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </TopLayout>
  );
};

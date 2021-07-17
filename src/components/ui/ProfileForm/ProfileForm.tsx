import { Box, Button, IconButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useFetchUserInfo } from '../../../containers/controllers/authentication/useFetchUserInfo';
import { useUpdateUserInfo } from '../../../containers/controllers/authentication/useUpdateUserInfo';
import { useToggle } from '../../../utility/hooks/useToggle';
import { textTruncate } from '../../../utility/textTruncate';
import { LinkCustom } from '../../helpers/LinkCustom/LinkCustom';
import { FacebookIconButton } from '../../helpers/OAuthButtons/FacebookIconButton';
import { TwitterIconButton } from '../../helpers/OAuthButtons/TwitterIconButton';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';
import { TextEditable } from '../../helpers/TextEditable/TextEditable';
import { ProfileFormDialog } from './ProfileFormDialog';

interface FormValues {
  profile: string;
}

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: 'flex',
  },
  userHomePage: {
    marginLeft: theme.spacing(1),
  },
}));

export const ProfileForm: React.VFC<IconButtonProps> = () => {
  const classes = useStyles();
  const { data } = useFetchUserInfo();
  const [isOpen, setIsOpen] = useToggle(false);
  const twitterUserLink = data?.twitterUserLink ?? undefined;
  const facebookUserLink = data?.facebookUserLink ?? undefined;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    updateUserInfo({ profile: formData.profile });
  });

  return (
    <>
      <SubHeading variant="h5" gutterBottom>
        プロフィール基本情報
      </SubHeading>
      <form onSubmit={onSubmit}>
        <TextEditable
          control={control}
          onSubmit={onSubmit}
          name="profile"
          value={data?.profile ?? ''}
          placeholder="例 ） 当楽団は団員数100名を超える、関西でも最大級の規模を誇る吹奏楽団です。年2回の演奏会の開催を目指し、日々練習に励んでいます。"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          errorMessage={errors.profile?.message}
        />
        <Box className={classes.buttonWrapper}>
          <TwitterIconButton
            component="a"
            color={twitterUserLink ? 'primary' : 'default'}
            href={twitterUserLink ?? ''}
            disabled={twitterUserLink === undefined}
            target="_blank"
            rel="noopener"
          />
          <FacebookIconButton
            component="a"
            color={facebookUserLink ? 'primary' : 'default'}
            href={facebookUserLink ?? ''}
            disabled={facebookUserLink === undefined}
            target="_blank"
            rel="noopener"
          />
          <LinkCustom
            className={classes.userHomePage}
            href={data?.userHomePage ?? ''}
          >
            {textTruncate(data?.userHomePage ?? '', 20)}
          </LinkCustom>
        </Box>
        <Button onClick={() => setIsOpen(true)}>リンクを追加</Button>
      </form>
      <ProfileFormDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

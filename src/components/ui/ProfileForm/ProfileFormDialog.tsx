import { Button, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check, Link as LinkIcon } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useSocialConnect } from '../../../containers/controllers/authentication/useSocialConnect';
import { User } from '../../../containers/controllers/user/useFetchUserInfo';
import { useUpdateUserInfo } from '../../../containers/controllers/user/useUpdateUserInfo';
import { QUERY } from '../../../containers/entities/query';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { DialogCustom } from '../../helpers/ModalCustom/DialogCustom';
import { FacebookButton } from '../../helpers/OAuthButtons/FacebookButton';
import { TwitterButton } from '../../helpers/OAuthButtons/TwitterButton';

interface FormValues {
  homePage: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  oauthWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
}));

export const ProfileFormDialog: React.VFC<Props> = ({ open, onClose }) => {
  const classes = useStyles();
  const { mutate: socialConnect } = useSocialConnect();
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const client = useQueryClient();
  const user: User | undefined = client.getQueryData([QUERY.user]);
  const twitterUserName = user?.twitterUserLink;
  const facebookUserName = user?.facebookUserLink;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    updateUserInfo({ userHomePage: data.homePage });
  });

  return (
    <form onSubmit={onSubmit}>
      <DialogCustom
        open={open}
        onClose={onClose}
        variant="customAction"
        title="リンクを追加"
        actionButton={<></>}
        maxWidth="sm"
      >
        <div className={classes.oauthWrapper}>
          <TwitterButton
            onClick={() => socialConnect('twitter')}
            endIcon={twitterUserName && <Check />}
          >
            twitter
          </TwitterButton>
          <FacebookButton
            onClick={() => socialConnect('facebook')}
            endIcon={facebookUserName && <Check />}
          >
            Facebook
          </FacebookButton>
          <FormTextField
            className={classes.textField}
            control={control}
            name="homePage"
            label="ホームページ"
            placeholder="例 ) https://www.google.com"
            errorMessage={errors.homePage?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.buttonWrapper}>
            <Button type="submit" onClick={onSubmit}>
              保存
            </Button>
          </div>
        </div>
      </DialogCustom>
    </form>
  );
};

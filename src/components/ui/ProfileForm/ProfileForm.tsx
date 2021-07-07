import { Box, Button, IconButton, IconButtonProps } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import React from 'react';
import { useFetchUserInfo } from '../../../containers/controllers/authentication/useFetchUserInfo';
import { useToggle } from '../../../utility/hooks/useToggle';
import { FacebookIconButton } from '../../helpers/OAuthButtons/FacebookIconButton';
import { TwitterIconButton } from '../../helpers/OAuthButtons/TwitterIconButton';
import { ProfileFormDialog } from './ProfileFormDialog';

export const ProfileForm: React.VFC<IconButtonProps> = () => {
  const { data } = useFetchUserInfo();
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <>
      <Box display="flex" style={{ columnGap: '16px' }}>
        <TwitterIconButton
          component="a"
          color={data?.twitterUserLink ? 'primary' : 'default'}
          href={data?.twitterUserLink ?? ''}
          disabled={data?.twitterUserLink === undefined}
          target="_blank"
          rel="noopener"
        />
        <FacebookIconButton
          component="a"
          color={data?.facebookUserLink ? 'primary' : 'default'}
          href={data?.facebookUserLink ?? ''}
          disabled={data?.facebookUserLink === undefined}
          target="_blank"
          rel="noopener"
        />
        <IconButton component="a">
          <LinkIcon />
        </IconButton>
      </Box>
      <Button onClick={() => setIsOpen(true)}>リンクを追加</Button>
      <ProfileFormDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

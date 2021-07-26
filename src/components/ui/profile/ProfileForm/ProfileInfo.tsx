import { Box, IconButtonProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useFetchUserInfo } from '../../../../containers/controllers/user/useFetchUserInfo';
import { textTruncate } from '../../../../utility/textTruncate';
import { LinkCustom } from '../../../helpers/LinkCustom/LinkCustom';
import { FacebookIconButton } from '../../../helpers/OAuthButtons/FacebookIconButton';
import { TwitterIconButton } from '../../../helpers/OAuthButtons/TwitterIconButton';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: 'flex',
    marginLeft: theme.spacing(-1),
  },
  homePage: {
    marginLeft: theme.spacing(1),
  },
}));

export const ProfileInfo: React.VFC<IconButtonProps> = () => {
  const classes = useStyles();
  const { data } = useFetchUserInfo();
  const twitterUserLink = data?.twitterUserLink ?? undefined;
  const facebookUserLink = data?.facebookUserLink ?? undefined;

  return (
    <>
      <Typography variant="body1" gutterBottom>
        {data?.profile}
      </Typography>
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
        <LinkCustom className={classes.homePage} href={data?.homePage ?? ''}>
          {textTruncate(data?.homePage ?? '', 20)}
        </LinkCustom>
      </Box>
    </>
  );
};

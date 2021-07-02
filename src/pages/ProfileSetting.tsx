import React from 'react';
import { DialogCustom } from '../components/helpers/ModalCustom/DialogCustom';
import { Layout } from '../components/layout/Layout';
import { useTitle } from '../utility/hooks/useTitle';

export const ProfileSetting: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール設定');

  return (
    <Layout noPadding>
      {/* <ProfileForm /> */}
      <DialogCustom
        variant="standard"
        title="ok?"
        open
        onClose={() => console.log('hey')}
        yesButtonProps={{ onClick: () => console.log('eh') }}
        noButtonProps={{ onClick: () => console.log('eh') }}
      >
        hey
      </DialogCustom>
    </Layout>
  );
};

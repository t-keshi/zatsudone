import { Add, InsertDriveFile } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { NoItemMessage } from '../components/helpers/NoItemMessage/NoItemMessage';
import { Layout } from '../components/layout/Layout';
import { OrchestraFormModal } from '../components/ui/OrchestraForm/OrchestraFormModal';
import { useFetchUserInfo } from '../containers/controllers/user/useFetchUserInfo';
import { QUERY } from '../containers/entities/query';
import { ROUTE_PATHS } from '../routes/type';
import { useTitle } from '../utility/hooks/useTitle';
import { useToggle } from '../utility/hooks/useToggle';

export const OrchestraManagement: React.VFC = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading } = useFetchUserInfo({
    onSuccess: (res) =>
      queryClient.refetchQueries([QUERY.orchestra, res.managementOrchestraId]),
  });
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  useTitle('SymphonyForum | 楽団運営');

  useEffect(() => {
    if (!isLoading && userInfo?.managementOrchestraId !== undefined) {
      history.push(
        `${ROUTE_PATHS.楽団運営詳細.split('/')[1]}/${
          userInfo.managementOrchestraId
        }`,
      );
    }
  }, [history, isLoading, userInfo?.managementOrchestraId]);

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader
          pageTitle="楽団運営"
          pageTitleOverline="ORCHESTRA MANAGEMENT"
        />
      </ContainerSpacer>
      <>
        <NoItemMessage
          heading="運営している楽団がありません"
          message="楽団を作成してください"
          icon={<InsertDriveFile />}
          actionLabel="楽団作成"
          actionButtonProps={{
            onClick: () => handleIsModalOpen(true),
            startIcon: <Add />,
          }}
        />
        <OrchestraFormModal
          isModalOpen={isModalOpen}
          closeModal={() => handleIsModalOpen(false)}
        />
      </>
    </Layout>
  );
};

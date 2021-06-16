import React from 'react';
import { useForm } from 'react-hook-form';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';
import { OrchestraFormInfoItem } from './OrchestralFormInfoItem';

export const OrchestraFormInfo: React.VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    membersCount: number;
    conductor: string;
    subConductor: string;
    homepage: string;
  }>();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubHeading variant="h5" gutterBottom>
        楽団詳細情報
      </SubHeading>
      <OrchestraFormInfoItem
        control={control}
        label="団員数"
        name="membersCount"
        value="142名"
        errorMessage={errors.membersCount?.message}
      />
      <OrchestraFormInfoItem
        control={control}
        label="指揮"
        name="conductor"
        value="142名"
        errorMessage={errors.conductor?.message}
      />
      <OrchestraFormInfoItem
        control={control}
        label="副指揮"
        name="subConductor"
        value="142名"
        errorMessage={errors.subConductor?.message}
      />
      <OrchestraFormInfoItem
        control={control}
        label="公式ホームページ"
        name="subConductor"
        value="https://google.com"
        errorMessage={errors.homepage?.message}
      />
    </form>
  );
};

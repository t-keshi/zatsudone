import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Orchestra } from '../../../../containers/controllers/orchestra/useFetchOrchestras';
import { OrchestraListItem } from './OrchestraListItem';

interface Props {
  orchestras: Orchestra[] | undefined;
}

export const OrchestraList: React.VFC<Props> = ({ orchestras }) => {
  if (orchestras === undefined) {
    return (
      <>
        <Box mt={4} />
        <OrchestraListItem orchestra={undefined} />
      </>
    );
  }

  return (
    <>
      {orchestras.map((orchestra, index) => (
        <Fragment key={orchestra.id}>
          <Box my={2}>{index !== 0 && <Divider />}</Box>
          <OrchestraListItem orchestra={orchestra} />
        </Fragment>
      ))}
    </>
  );
};

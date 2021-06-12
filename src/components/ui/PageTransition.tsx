import { Slide } from '@material-ui/core';
import React from 'react';

interface Props {
  hasPageTransition: boolean;
}

export const PageTransition: React.FC<Props> = ({
  children,
  hasPageTransition,
}) => {
  if (hasPageTransition) {
    return (
      <Slide direction="up" in mountOnEnter unmountOnExit>
        <div>{children}</div>
      </Slide>
    );
  }

  return <>{children}</>;
};

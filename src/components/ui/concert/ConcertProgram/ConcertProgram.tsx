import React from 'react';
import { RichTextRenderer } from '../../../helpers/RichText/RichTextRenderer';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

export const ConcertProgram: React.VFC = () => (
  <div>
    <SubHeading variant="h5" paragraph>
      プログラム
    </SubHeading>
    <RichTextRenderer />
  </div>
);

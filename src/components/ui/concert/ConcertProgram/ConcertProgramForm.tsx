import React from 'react';
import { RichTextEditor } from '../../../helpers/RichText/RichTextEditor';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

export const ConcertProgramForm: React.VFC = () => (
  <div>
    <SubHeading variant="h5" paragraph>
      プログラム
    </SubHeading>
    <RichTextEditor />
  </div>
);

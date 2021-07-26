import React from 'react';
import { Descendant } from 'slate';
import { RichTextRenderer } from '../../../helpers/RichText/RichTextRenderer';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface Props {
  programs: string;
}

export const ConcertProgram: React.VFC<Props> = ({ programs }) => (
  <div>
    <SubHeading variant="h5" paragraph>
      プログラム
    </SubHeading>
    <RichTextRenderer richText={JSON.parse(programs) as Descendant[]} />
  </div>
);

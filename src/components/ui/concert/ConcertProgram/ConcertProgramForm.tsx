import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descendant } from 'slate';
import { useUpdateConcert } from '../../../../containers/controllers/concert/useUpdateConcert';
import { RichTextEditor } from '../../../helpers/RichText/RichTextEditor';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface Props {
  programs: string;
}

export const ConcertProgramForm: React.VFC<Props> = ({ programs }) => {
  const { mutate } = useUpdateConcert();
  const params: { concertId: string } = useParams();
  const [richText, setRichText] = useState<Descendant[]>(
    JSON.parse(programs) as Descendant[],
  );
  const onSubmit = () => {
    mutate({ id: params.concertId, programs: JSON.stringify(richText) });
  };

  return (
    <div>
      <SubHeading variant="h5" paragraph>
        プログラム
      </SubHeading>
      <RichTextEditor richText={richText} setRichText={setRichText} />
      <Button onClick={onSubmit}>保存</Button>
    </div>
  );
};

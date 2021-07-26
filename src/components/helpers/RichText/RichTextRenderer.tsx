/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { RichTextElement } from './RichTextElement';
import { RichTextLeaf } from './RichTextLeaf';

interface Props {
  richText: Descendant[];
}

export const RichTextRenderer: React.VFC<Props> = ({ richText }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(
    (props) => <RichTextElement {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <RichTextLeaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={richText}
      onChange={(newValue) => console.log(newValue)}
    >
      <Editable
        readOnly
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </Slate>
  );
};

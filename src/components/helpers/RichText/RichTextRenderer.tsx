/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { initialValue } from './initialValue';
import { RichTextElement } from './RichTextElement';
import { RichTextLeaf } from './RichTextLeaf';

export const RichTextRenderer: React.VFC = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(
    (props) => <RichTextElement {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <RichTextLeaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        readOnly
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </Slate>
  );
};

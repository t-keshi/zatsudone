/* eslint-disable react/jsx-props-no-spreading */
import { Button, Toolbar } from '@material-ui/core';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  List,
  LooksOne,
  LooksTwo,
} from '@material-ui/icons';
import React, { useCallback, useMemo, useState } from 'react';
// TypeScript users only add this code
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { BlockButton } from './BlockButton';
import { initialValue } from './initialValue';
import { MarkButton } from './MarkButton';
import { RichTextElement } from './RichTextElement';
import { RichTextLeaf } from './RichTextLeaf';

export const RichTextEditor: React.VFC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback(
    (props) => <RichTextElement {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <RichTextLeaf {...props} />, []);
  const onSubmit = () => {
    const content = JSON.stringify(value);
    console.log(content);
  };

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar>
          <MarkButton format="bold">
            <FormatBold />
          </MarkButton>
          <MarkButton format="underline">
            <FormatUnderlined />
          </MarkButton>
          <MarkButton format="italic">
            <FormatItalic />
          </MarkButton>
          <BlockButton format="h1">
            <LooksOne />
          </BlockButton>
          <BlockButton format="h2">
            <LooksTwo />
          </BlockButton>
          <BlockButton format="ul">
            <List />
          </BlockButton>
        </Toolbar>
        <Editable renderLeaf={renderLeaf} renderElement={renderElement} />
      </Slate>
      <Button onClick={onSubmit}>保存</Button>
    </>
  );
};

/* eslint-disable react/jsx-props-no-spreading */
import { Toolbar } from '@material-ui/core';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  List,
  LooksOne,
  LooksTwo,
} from '@material-ui/icons';
import React, { useCallback, useMemo } from 'react';
// TypeScript users only add this code
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { BlockButton } from './BlockButton';
import { MarkButton } from './MarkButton';
import { RichTextElement } from './RichTextElement';
import { RichTextLeaf } from './RichTextLeaf';

interface Props {
  richText: Descendant[];
  setRichText: React.Dispatch<React.SetStateAction<Descendant[]>>;
}

export const RichTextEditor: React.VFC<Props> = ({ richText, setRichText }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(
    (props) => <RichTextElement {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <RichTextLeaf {...props} />, []);

  return (
    <>
      <Slate
        editor={editor}
        value={richText}
        onChange={(newValue) => setRichText(newValue)}
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
    </>
  );
};

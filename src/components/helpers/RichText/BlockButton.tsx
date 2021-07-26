import { IconButton } from '@material-ui/core';
import React from 'react';
import { BaseEditor, Editor, Element, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { CustomText } from './slate';

const LIST_TYPES = ['ul'];

interface Props {
  format: keyof Omit<CustomText, 'text'>;
}

const isBlockActive = (
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>,
) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });

  return !!match;
};

const toggleBlock = (
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>,
) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n)
        ? LIST_TYPES.includes(n.type)
        : false,
    split: true,
  });
  const newProperties: Partial<Element> = {
    // eslint-disable-next-line no-nested-ternary
    type: isActive ? 'paragraph' : isList ? 'li' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const BlockButton: React.FC<Props> = ({ children, format }) => {
  const editor = useSlate();

  return (
    <IconButton
      color={isBlockActive(editor, format) ? 'primary' : 'default'}
      onClick={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </IconButton>
  );
};

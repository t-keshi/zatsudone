import { IconButton } from '@material-ui/core';
import React from 'react';
import { BaseEditor, Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { CustomText } from './slate';

interface Props {
  format: keyof Omit<CustomText, 'text'>;
}

const isMarkActive = (
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>,
) => {
  const marks: Omit<CustomText, 'text'> | null = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

const toggleMark = (
  editor: BaseEditor & ReactEditor,
  format: keyof Omit<CustomText, 'text'>,
) => {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const MarkButton: React.FC<Props> = ({ children, format }) => {
  const editor = useSlate();

  return (
    <IconButton
      color={isMarkActive(editor, format) ? 'primary' : 'default'}
      onClick={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </IconButton>
  );
};

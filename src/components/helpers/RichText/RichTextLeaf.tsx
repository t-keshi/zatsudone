import React from 'react';
import { RenderLeafProps } from 'slate-react';

const Bold: React.FC<{ bold?: boolean }> = ({ children, bold }) => {
  if (bold) {
    return <strong>{children}</strong>;
  }

  return <>{children}</>;
};

const Underline: React.FC<{ underline?: boolean }> = ({
  children,
  underline,
}) => {
  if (underline) {
    return <u>{children}</u>;
  }

  return <>{children}</>;
};

const Italic: React.FC<{ italic?: boolean }> = ({ children, italic }) => {
  if (italic) {
    return <em>{children}</em>;
  }

  return <>{children}</>;
};

export const RichTextLeaf: React.VFC<RenderLeafProps> = ({
  attributes,
  children,
  leaf,
}) => (
  <Bold bold={leaf.bold}>
    <Underline underline={leaf.underline}>
      <Italic italic={leaf.italic}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <span {...attributes}>{children}</span>
      </Italic>
    </Underline>
  </Bold>
);

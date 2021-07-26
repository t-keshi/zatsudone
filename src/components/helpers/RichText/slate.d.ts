import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type CustomElement = {
  type:
    | 'paragraph'
    | 'link'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'h1'
    | 'h2'
    | 'li'
    | 'ul';
  url?: string;
  children: CustomText[];
};

export type CustomText = {
  text: string;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  h1?: boolean;
  h2?: boolean;
  li?: boolean;
  ul?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

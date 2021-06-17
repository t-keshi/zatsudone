/* eslint-disable no-template-curly-in-string */

type Message<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TValidationProperty extends Record<string, unknown> = {}
> = string | ((arg: TValidationProperty) => string);

interface MixedLocale {
  default: Message;
  required: Message;
  oneOf: Message;
  notOneOf: Message;
  defined: Message;
}
interface StringLocale {
  length: Message<{ length: number }>;
  min: Message<{ min: number }>;
  max: Message<{ max: number }>;
  matches: Message;
  email: Message;
  url: Message;
  uuid: Message;
  trim: Message;
  lowercase: Message;
  uppercase: Message;
}
interface NumberLocale {
  min: Message<{ min: number }>;
  max: Message<{ max: number }>;
  lessThan: Message<{ less: number }>;
  moreThan: Message<{ more: number }>;
  notEqual: Message<{ notEqual: number }>;
  positive: Message;
  negative: Message;
  integer: Message;
}
interface DateLocale {
  min: Message<{ min: number }>;
  max: Message<{ max: number }>;
}
interface Locale {
  mixed: MixedLocale;
  string: StringLocale;
  number: NumberLocale;
  date: DateLocale;
}

export const yupLocaleJP: Locale = {
  mixed: {
    default: '正しい値を入力してください',
    required: '値を入力してください',
    oneOf: '${values}のいずれかを入力してください',
    notOneOf: '${values}以外のものを入力してください',
    defined: '値を入力してください',
  },
  string: {
    length: ({ length }) => `${length}文字で入力してください`,
    min: ({ min }) => `${min}文字以上で入力してください`,
    max: ({ max }) => `${max}文字以下で入力してください`,
    matches: `正しい形式で入力してください`,
    email: '正しいメールアドレスを入力してください',
    url: '正しいURLを入力してください',
    uuid: '正しいUUIDを入力してください',
    trim: '前後の空白を取り除いてください',
    lowercase: '小文字のみ入力してください',
    uppercase: '大文字のみ入力してください',
  },
  number: {
    min: ({ min }) => `${min}以上で入力してください`,
    max: ({ max }) => `${max}以下で入力してください`,
    lessThan: ({ less }) => `${less}未満で入力してください`,
    moreThan: ({ more }) => `${more}より大きい数を入力してください`,
    notEqual: ({ notEqual }) => `${notEqual}以外の数にしてください`,
    positive: '正の数を入力してください',
    negative: '負の数を入力してください',
    integer: '整数を入力してください',
  },
  date: {
    min: ({ min }) => `${min}以降の日付を入力してください`,
    max: ({ max }) => `${max}以前の日付を入力してください`,
  },
};

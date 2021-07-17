// eslint-disable-next-line @typescript-eslint/ban-types
export const pickBy = <TObj extends {}>(object: TObj): Partial<TObj> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in object) {
    if (object[key]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      obj[key] = object[key];
    }
  }

  return obj as Partial<TObj>;
};

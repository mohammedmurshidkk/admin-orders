export const replaceEmptyWithHyphens = (value?: string) => {
  if (!value) return '-';

  return value;
};

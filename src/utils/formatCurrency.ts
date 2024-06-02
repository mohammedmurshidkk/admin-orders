export const formatCurrency = (value: string | number) => {
  const parseValue = parseFloat(value.toString());

  return parseValue.toLocaleString();
};

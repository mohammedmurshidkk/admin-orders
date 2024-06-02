export const SIZE = 10;
export const INITIAL_PAGE = 1;

export const getTotalPage = (totalCount: string | number = 0, itemsPerPage: number = SIZE) => {
  return Math.ceil(parseFloat(totalCount.toString()) / itemsPerPage);
};

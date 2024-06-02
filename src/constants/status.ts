import { STATUS } from '../enums/status';

export const statusList = Object.entries(STATUS).map((status) => {
  const label = status[0].charAt(0).toUpperCase() + status[1].slice(1);

  return {
    label,
    value: status[1],
  };
});

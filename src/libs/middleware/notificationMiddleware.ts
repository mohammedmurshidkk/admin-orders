import { isFulfilled, isRejected, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notificationMiddleware: Middleware = (store) => (next) => (action: any) => {
  const { type } = action;
  const { getState } = store;

  next(action);

  if (isFulfilled(action)) {
    const getType = type?.split('/');
    const currentState = getState()[getType[0]];
    const successMessage = currentState?.successMessage;

    if (successMessage) {
      toast.success(successMessage);
    }
  }

  if (isRejected(action)) {
    const getType = type?.split('/');
    const currentState = getState()[getType[0]];
    const errorMessage = currentState?.errorMessage;

    if (errorMessage) {
      toast.error(errorMessage);
    }
  }

  return next(action);
};

export default notificationMiddleware;

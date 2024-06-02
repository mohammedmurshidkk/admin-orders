import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type InitialState<T> = {
  loading: boolean;
  updateSuccess: boolean;
  updating: boolean;
  entity: T;
  entities: T[];
  errorMessage?: null | string;
  successMessage?: null | string;
  totalCount?: string | number;
};

export type ExtendedSerializedError = SerializedError & {
  response?: {
    data: { message: string };
    status?: number;
  };
};

const commonErrorProperties: (keyof SerializedError)[] = ['name', 'message', 'stack', 'code'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeAxiosError = (value: any): AxiosError | SerializedError => {
  if (typeof value === 'object' && value !== null) {
    if (value.isAxiosError) {
      return value;
    } else {
      const simpleError: SerializedError = {};

      for (const property of commonErrorProperties) {
        if (typeof value[property] === 'string') {
          simpleError[property] = value[property];
        }
      }

      return simpleError;
    }
  }
  return { message: String(value) };
};

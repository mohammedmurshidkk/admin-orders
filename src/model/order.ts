import { STATUS } from '../enums/status';

export interface FetchOrdersParam {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
}

export interface OrderBody {
  id?: number;
  line_items?: { id?: number; quantity?: number }[];
}

export interface Shipping {
  first_name: string;
  last_name: string;
  city: string;
}

export interface LineItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: string;
  image: { id: number; src: string };
}

export interface Order {
  id?: number;
  number: string;
  shipping: Shipping | null;
  date_created: string;
  total: string;
  status: STATUS;
  line_items?: Array<LineItem>;
}

export const defaultValues: Order = {
  number: '',
  shipping: null,
  date_created: '',
  total: '',
  status: STATUS.PENDING,
  line_items: [],
};

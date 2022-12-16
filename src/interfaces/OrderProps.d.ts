import { ItemProps } from './ItemProps.d';

export interface OrderProps {
  cart: ItemProps[];
  createdAt: string;
  total: number;
  comments: string;
}
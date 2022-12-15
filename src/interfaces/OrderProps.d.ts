import { ItemProps } from './ItemProps.d';

// export interface OrderProps {
//   id: string | number;
//   pedido: ItemProps[];
//   day: any;
// }
export interface OrderProps {
  cart: ItemProps[];
  createdAt: string;
  total: number
}
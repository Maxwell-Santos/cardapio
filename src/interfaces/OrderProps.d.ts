import { ItemProps } from './ItemProps.d';

export interface OrderProps {
  id: string | number;
  pedido: ItemProps[];
  day: any;
}
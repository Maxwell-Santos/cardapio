import { SectionProps } from './SectionProps.d';
import { ItemProps } from './ItemProps.d';
export interface CartContextProps {
  data: [];
  cart: any;
  setCart: Dispatch<SetStateAction<ItemProps[]>>;
  addToCart: (sectionId: number, productId: string) => void;
  cleanCart: () => void;
  removeFromCart: (id: string) => void;

  findSection: (sectionId:number) => SectionProps;
  findItem: (products: any, productId: string) => ItemProps;
  getTotal: () => number;
  reduction: (id: string) => void;
  increase: (id: string) => void;
}
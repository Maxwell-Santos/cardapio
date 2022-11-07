import { SectionProps } from './SectionProps.d';
import { ItemProps } from './ItemProps.d';
export interface CartContextProps {
  data: [];
  cart: any;
  setCart: Dispatch<SetStateAction<ItemProps[]>>;
  AddToCart: (sectionId: number, productId: string) => void;
  RemoveFromCart: (id: string) => void;

  findSection: (sectionId:number) => SectionProps;
  findItem: (products: any, productId: string) => ItemProps;
  
}
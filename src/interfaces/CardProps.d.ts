export interface CardProps {
  sectionId: number;
  item:{
    id: string,
    name: string,
    price: number,
    info?: string,
    img?: string,
    count: number,
  }
}
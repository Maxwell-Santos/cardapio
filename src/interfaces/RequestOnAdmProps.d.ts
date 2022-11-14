export interface RequestOnAdmProps {
  order: any;
  index: number;
  orderDelivered: (indexItemDelivered:number) => any;
}
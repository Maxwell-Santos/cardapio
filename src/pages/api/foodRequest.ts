import { ItemProps } from './../../interfaces/ItemProps.d';
import { NextApiRequest, NextApiResponse } from 'next'
import { format } from 'date-fns';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const bodyFoodRequest = req.body.cart
  const t = req.body.total
  console.log(bodyFoodRequest, "TOTAL:",t)
  const dataFormat = format(new Date(), "HH':'mm 'de' dd/MM/yyyy")
  class Pedido{
    pedido: ItemProps;
    id: number;
    day: any;

    constructor(pedido: any, id: any){
      this.pedido = pedido,
      this.id = id,
      this.day = dataFormat
    }
  }

  const pedido = new Pedido(bodyFoodRequest, 1)

  res.status(200).json({ data: pedido, total: t })
}
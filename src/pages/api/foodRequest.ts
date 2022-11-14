import { ItemProps } from './../../interfaces/ItemProps.d';
import { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const bodyFoodRequest = req.body
  const data = new Date()
  
  class Pedido{
    pedido: ItemProps;
    id: number;
    day: any

    constructor(pedido: any, id: any){
      this.pedido = pedido,
      this.id = id
      this.day = data
    }
  }

  const pedido = new Pedido(bodyFoodRequest, 1)
  // fs.appendFile('MyRequestList.json', c, (err: any) => {
  //   if (err) throw err
  //   console.log("criou com sucesso")
  // })


  res.status(200).json({ data: pedido })
}
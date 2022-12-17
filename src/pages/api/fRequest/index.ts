import { NextApiRequest, NextApiResponse } from 'next'
import foodRequestModel from '../../../models/foodRequestSchema'
import connection from '../../../services/dbConnect'

connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { cart, total, comments } = req.body

  switch (method) {
    case 'POST':
      try {
        const newFoodRequest = await foodRequestModel.create({
          cart,
          total,
          comments
        })
        return res.json({ success: true, data: newFoodRequest }

        )
      } catch (err) {
        res.status(500).json({ success: false, err })
        console.error("Deu bom não:", err)
      }
      break;
      
    case 'GET':
      try {
        const requests = await foodRequestModel.find({})
        res.status(200).json({ success: true, data: requests })

      } catch (err) {
        res.status(500).json({ success: false, err })
        console.error("Deu bom não:", err)
      }
      break;

    default:
      console.log("Esse método não foi aceito")
      res.status(405).json({ success: false, msg: "Método não permitido"  })

      break;
  }
}
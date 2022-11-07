import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { CardProps } from "../../interfaces/CardProps"
import { CartContextProps } from "../../interfaces/CartContextProps"

export function Card({sectionId, item}: CardProps) {

  const { AddToCart } = useContext<CartContextProps>(CartContext)

  return (
    <div
      className="w-full p-4 rounded-md bg-item-card flex my-2" 
    >
      <Link href={`/itemInfo/${sectionId}?id=${item.id}`}>
        <div className="flex flex-col">
          <h2
          className="text-subtitle"
          >
          {item.name}
          </h2>
          <p>
            {item.info}
          </p>
          <span
          className="text-item-price"
          >
            R${item.price},00
          </span>
        </div>
      </Link>
    </div>
  )
}

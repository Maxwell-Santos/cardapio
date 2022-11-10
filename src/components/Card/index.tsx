import Link from "next/link"
import { useContext, useMemo, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { CardProps } from "../../interfaces/CardProps"
import { ItemProps } from "../../interfaces/ItemProps"

export function Card({ sectionId, item }: CardProps) {

  const [existsItem, setExisistItem] = useState(false)
  const { cart } = useContext(CartContext)

  useMemo(() => {
    cart.map((itemInCart: ItemProps) => {

      if (item.id === itemInCart.id) {
        setExisistItem(true)
      }
    })
  }, [item])
  return (
    <Link href={`/itemInfo/${sectionId}?id=${item.id}`}
    className={`${existsItem && "pointer-events-none"}`}
    >
      <div
        className={`w-full p-4 rounded-md flex my-2 transition-all duration-400
      ${existsItem ? "bg-[#ffd6c4]" : "bg-item-card hover:shadow-lg"}
      `}
      >
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
      </div>
    </Link>
  )
}

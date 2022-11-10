import Image from "next/image"
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
        className={`w-full rounded-md flex gap-5 my-2 transition-all overflow-hidden border-black h-28 
      ${existsItem ? "bg-disable" : "bg-item-card shadow-sm"}
      `}
      >
        <div
        className="w-[7rem] h-full"
        >
          <img 
          src={item.img || item.name}
          alt={`imagem ${item.name}`}
          />
        </div>
        
        <div className="flex flex-col flex-1 justify-center p-1">
          <h2
            className="text-subtitle"
          >
            {item.name}
          </h2>
          <p className="opacity-80 line-clamp-2 leading-snug">
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

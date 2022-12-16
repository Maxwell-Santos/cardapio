import Link from "next/link"
import { useContext, useMemo, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { CardProps } from "../../interfaces/CardProps"
import { ItemProps } from "../../interfaces/ItemProps"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { CartContextProps } from "../../interfaces/CartContextProps"

export function Card({ sectionId, item }: CardProps) {

  const [existsItem, setExistsItem] = useState(false)
  const { cart, addToCart, increase, reduction } = useContext<CartContextProps>(CartContext)

  useMemo(() => {
    cart.map((itemInCart: ItemProps) => {
      if (item.id === itemInCart.id) {
        setExistsItem(true)
      }
    })
  }, [item])

  return (

    <div className={`w-full flex-1 rounded-md flex my-2 transition-all border-black h-28 
    ${existsItem ? "bg-disable" : "bg-item-card shadow-sm md:hover:shadow-lg"}`}>

      <Link href={`/itemInfo/${sectionId}?id=${item.id}`} className="flex-1">

        <div className="flex h-full gap-5">

          <div className="w-[7rem] md:w-[10rem] h-full">
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

            <p className={`${existsItem ? "hidden" : "block opacity-80 line-clamp-2 leading-snug"}`}>
              {item.info}
            </p>

            <span className="text-item-price">
              R${item.price},00
            </span>
          </div>
        </div>

      </Link>

      <div className="flex items-center px-3 mr-3 text-icon z-10">
        {
          !existsItem ? (
            <div
              className="cursor-pointer group relative"
              onClick={() => {
                addToCart(Number(sectionId), String(item.id))
                setExistsItem(true)
              }}
            >
              <AddRoundedIcon />

              <span
                className="absolute -top-4 right-0 text-sm whitespace-nowrap p-1 px-2 rounded-md shadow-md opacity-0 group-hover:-top-7 group-hover:opacity-100 transition-all"
              >
                Adicionar ao carrinho
              </span>
            </div>

          ) : (
            <div className="flex items-center justify-center gap-2 text-lg">

              <button
                className={`p-2 text-icon text-2xl cursor-pointer`}
                onClick={() => {
                  if (item.count === 1) {
                    setExistsItem(false)
                  }
                  reduction(item.id)
                }}

              >-</button>

              <div className="text-center">
                <span>{item.count}</span>
              </div>

              <button
                className={`p-2 text-icon text-2xl cursor-pointer`}
                onClick={() => { increase(item.id) }}
              >+</button>
            </div>
          )
        }
      </div>
    </div>

  )
}
